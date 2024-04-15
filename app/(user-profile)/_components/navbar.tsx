"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/Auth/AuthUi/UserButton";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] max-sm:w-[400px] max-xs:w-[250px] mt-10 shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === "/my-profile" ? "default" : "outline"}
        >
          <Link href="/my-profile">Info</Link>
        </Button>
     
     
        <Button
          asChild
          variant={pathname === "/my-profile/settings" ? "default" : "outline"}
        >
          <Link href="/my-profile/settings">Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};