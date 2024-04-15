import { currentRole } from "@/lib/auth";
import HeaderDashboard from "./_components/Header-dashboard";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const dashboardLayout = async ({ children }: ProtectedLayoutProps) => {
  const UserRole = await currentRole();

  if (UserRole === "USER") {
    redirect("/my-profile");
  }

  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
      <HeaderDashboard />
      {children}
    </div>
  );
};

export default dashboardLayout;
