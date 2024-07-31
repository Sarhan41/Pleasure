"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/Auth/AuthUi/UserButton";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl shadow-sm">
      <div className="flex flex-wrap gap-2">
        <Button
          asChild
          variant={pathname === "/my-profile" ? "default" : "outline"}
          className="min-w-[80px] md:min-w-[100px] lg:min-w-[120px]"
        >
          <Link href="/my-profile">Info</Link>
        </Button>

        <Button
          asChild
          variant={pathname.includes("/address") ? "default" : "outline"}
          className="min-w-[80px] md:min-w-[100px] lg:min-w-[120px]"
        >
          <Link href={`/my-profile/address?reload=${Date.now()}`}>Address</Link>
        </Button>
        <Button
          asChild
          variant={pathname.includes("/orders") ? "default" : "outline"}
          className="min-w-[80px] md:min-w-[100px] lg:min-w-[120px]"
        >
          <Link href={`/my-profile/orders?reload=${Date.now()}`}>Orders</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/my-profile/settings" ? "default" : "outline"}
          className="min-w-[80px] md:min-w-[100px] lg:min-w-[120px]"
        >
          <a href={`/my-profile/settings?reload=${Date.now()}`}>Settings</a>
        </Button>
      </div>
      <div>
        <UserButton />
      </div>
    </nav>
  );
};
