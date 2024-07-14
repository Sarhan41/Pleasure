"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

// Extend the schema to include confirmPassword with matching validation
const NewPasswordValidationSchema = NewPasswordSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

export const newPassword = async (
  values: { password: string; confirmPassword: string },
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  // Validate the input fields
  const validationResult = NewPasswordValidationSchema.safeParse(values);
  if (!validationResult.success) {
    return { error: validationResult.error.errors[0].message };
  }

  const { password } = validationResult.data;

  // Validate the token
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  // Check if the token has expired
  if (new Date(existingToken.expires) < new Date()) {
    return { error: "Token has expired!" };
  }

  // Fetch the user by email associated with the token
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the user's password and delete the used token
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};
