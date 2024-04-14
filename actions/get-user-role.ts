import { auth } from "@/auth";

export async function GetUserRole() {
  const session = await auth();
  const hello = JSON.stringify(session);
  // console.log(hello);

  // Parse the JSON string back into an object
  const sessionObject = JSON.parse(hello);

  // Access the role property
  const role = sessionObject.user.role;
// console.log(role);
  return role;
}
