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


  return (
  <div>

    {children}
  </div>
  );
}
