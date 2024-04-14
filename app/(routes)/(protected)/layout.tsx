import { auth } from "@/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Customize Your Store With this Admin Dashboard",
};


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    // const session = auth();
    // if (!session) {
    //   redirect("/login");
    // }
    // // console.log(session);

    // // const isAdmin = session.user?.role === "ADMIN";

  return (
  <div>

    {children}
  </div>
  );
}
