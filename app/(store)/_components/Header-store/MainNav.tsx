import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ChevronRightIcon, StoreIcon } from "lucide-react";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  // console.log("MAIN NAV 21", data);

  // Define the order of categories
  const categoryOrder = ["Panties", "Sport Bra", "Sleep", "Shorts", "Pyjama"];

  // Sort the categories based on the defined order
  const sortedData = data.sort((a, b) => {
    return categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name);
  });

  const pathname = usePathname();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleCategoryHover = (categoryName: string) => {
    setHoveredCategory(categoryName);
  };

  const isCategoryHovered = (categoryName: string) => {
    return hoveredCategory === categoryName;
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 text-white">
      <div className="flex items-center space-x-4 lg:space-x-8">
        <div className="hidden lg:flex space-x-4 ">
          <div className="flex space-x-4">
            {sortedData.map((category, index) => (
              <div
                key={category.id}
                className="relative group"
                onMouseEnter={() => handleCategoryHover(category.name)}
                onMouseLeave={() => handleCategoryHover("")}
              >
                <Link
                  className={cn(
                    "transition-colors duration-300 hover:text-primary font-medium uppercase ",
                    pathname === `/category/${category.name}`
                      ? "text-primary"
                      : "text-white",
                    isCategoryHovered(category.name) && "text-primary"
                  )}
                  href={`/category/${category.name.replace(/\s+/g, "-")}`}
                  passHref
                >
                  {category.name}
                </Link>
                {isCategoryHovered(category.name) && (
                  <div className="absolute top-full w-[70vw] h-[50vh] z-50 left-0 right-0 bg-white text-gray-800 rounded-md shadow-2xl py-4 px-8">
                    <div className="grid grid-cols-3 gap-4">
                      {category?.products?.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.name.replace(/\s+/g, "-")}`}
                          className="hover:text-primary transition-colors duration-300 overflow-hidden whitespace-nowrap overflow-ellipsis"
                          passHref
                          onClick={() => setHoveredCategory("")}
                        >
                          {/* {product.name.split(" ").pop()} */}
                          {product.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HamburgerMenuIcon className="w-6 h-6 text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8}>
            <DropdownMenuLabel className="mb-4 border-b text-white">
              <div className="flex items-center space-x-2">
                <span className="text-black">Menu</span>
                <StoreIcon className="w-4 h-4" />
              </div>
            </DropdownMenuLabel>
            {sortedData.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.name.replace(/\s+/g, "-")}`}
                passHref
              >
                <DropdownMenuItem
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    pathname === `/category/${category.name}`
                      ? "text-black"
                      : "text-gray-800"
                  )}
                >
                  {category.name}
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
