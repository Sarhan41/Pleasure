import { ThemeToggle } from "@/components/Dashboard/ThemeToggle";
import { MainNav } from "./main-navigation";
import { UserButton } from "@/components/Auth/AuthUi/UserButton";
import { StoreIcon } from "lucide-react";
import Link from "next/link";

const HeaderDashboard = () => {
  return (
    <header>
      <div className="border-b">
        <div className="flex h-16 items-center px-4 ">
          <div className="hidden md:flex">
            <Link href="/dashboard">
              <StoreIcon className="h-5 w-5" />
            </Link>
          </div>
          <MainNav className="mx-6" />
          <div className="ml-auto gap-4 flex items-center ">
            <ThemeToggle />
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
