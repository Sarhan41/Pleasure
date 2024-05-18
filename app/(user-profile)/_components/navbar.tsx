"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/Auth/AuthUi/UserButton";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex flex-wrap justify-between items-center p-4 rounded-xl shadow-sm">
      <div className="flex flex-wrap gap-2">
        <Button
          asChild
          variant={pathname === "/my-profile" ? "default" : "outline"}
        >
          <Link href="/my-profile">Info</Link>
        </Button>

        <Button
          asChild
          variant={pathname.includes("/address") ? "default" : "outline"}
        >
          <Link href={`/my-profile/address?reload=${Date.now()}`}>Address</Link>
        </Button>
        <Button
          asChild
          variant={pathname.includes("/orders") ? "default" : "outline"}
        >
          <Link href={`/my-profile/orders?reload=${Date.now()}`}>Orders</Link>
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
