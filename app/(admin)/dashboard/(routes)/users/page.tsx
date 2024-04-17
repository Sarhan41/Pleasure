import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserColumn } from "./components/columns";
import { UsersClient } from "./components/client";

const UsersPage = async () => {
  const user = await currentUser();
  const role = await currentRole();

  if (!user) {
    redirect("/login");
  }

  if (role !== "ADMIN") {
    redirect("/my-profile");
  }

  const users = await db.user.findMany({});

  const formattedUsers: UserColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name || "",
    role: item.role,
    email: item.email || "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={formattedUsers} />
      </div>
      <div></div>
    </div>
  );
};

export default UsersPage;
