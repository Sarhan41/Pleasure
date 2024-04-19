"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { StoreIcon } from "lucide-react";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.name}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav>
      <div className="mx-6 flex items-center space-x-4 lg:space-x-6 max-sm:hidden">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-black",
              route.active ? "text-black" : "text-neutral-500"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className="sm:hidden ml-4">
        {/* Dropdown Menu */}
        <DropdownMenu >
          <DropdownMenuTrigger>
            {/* This could be a hamburger icon */}
            <HamburgerMenuIcon className="w-5 h-5 text-primary text-center" />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8}>
            <DropdownMenuLabel className="mb-4 border-b">
              <div className="flex gap-2"  >

              Menu <StoreIcon className="h-4 w-4"  />
              </div>
              </DropdownMenuLabel>
              
            {routes.map((route) => (
              <Link key={route.href} href={route.href}>
                <DropdownMenuItem
                  className={cn(
                    "text-sm font-medium transition-colors ",
                    route.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {route.label}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default MainNav;
