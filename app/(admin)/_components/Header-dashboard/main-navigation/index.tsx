"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { StoreIcon } from "lucide-react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const NavLinks = [
    {
      href: `/dashboard`,
      label: "Overview",
      active: pathname === "/dashboard",
    },
    {
      href: `/dashboard/billboards`,
      label: "Billboards",
      active: pathname === "/dashboard/billboards",
    },
    {
      href: `/dashboard/categories`,
      label: "Categories",
      active: pathname === `/dashboard/categories`,
    },
    {
      href: `/dashboard/products`,
      label: "Products",
      active: pathname === `/dashboard/products`,
    },
    {
      href: `/dashboard/orders`,
      label: "Orders",
      active: pathname === `/dashboard/orders`,
    },
    {
      href: `/dashboard/users`,
      label: "Users",
      active: pathname === `/dashboard/users`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6 ", className)}>
      {/* Toggle Button for Extra Small Devices */}

      <div className="sm:hidden">
        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            {/* This could be a hamburger icon */}
            <HamburgerMenuIcon className="w-6 h-6 text-primary" />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8}>
            <DropdownMenuLabel className="mb-4 border-b">
              <div className="flex gap-2">
                Menu <StoreIcon className="h-4 w-4" />
              </div>
            </DropdownMenuLabel>

            {NavLinks.map((route) => (
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

      {/* Navigation Links */}
      <div className="hidden sm:flex space-x-2 md:space-x-4 lg:space-x-6 items-center">
        {NavLinks.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
