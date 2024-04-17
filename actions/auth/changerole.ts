"use server"

import { db } from "@/lib/db";
import { User } from "@prisma/client";
import toast from "react-hot-toast";

interface dataProps {
    id: string | "";
    name: string | "";
    role: string ;

}

export const changeUserRole = async ({ id, name, role }: dataProps) => {
    try {
      const updatedUser = await db.user.updateMany({
        where: {
          id: id,
        },
        data: {
          role: role === "ADMIN" ? "USER" : "ADMIN",
        },
      });
      // Return the updated user object
      return updatedUser;
    } catch (error) {
      // Handle errors
      console.log("[User_PATCH]", error);
      throw new Error("Error changing role");
    }
};
