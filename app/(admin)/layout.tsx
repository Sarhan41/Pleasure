import { currentRole } from "@/lib/auth";
import HeaderDashboard from "./_components/Header-dashboard";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/app/(admin)/dashboard/providers/theme-provider";
import { ToastProvider } from "./dashboard/providers/toast-provider";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const dashboardLayout = async ({ children }: ProtectedLayoutProps) => {
  const UserRole = await currentRole();

  if (UserRole === "USER") {
    redirect("/my-profile");
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <section className="h-full w-full ">
        <ToastProvider />
      <HeaderDashboard />
      {children}
    </section>
    </ThemeProvider>
  );
};

export default dashboardLayout;
