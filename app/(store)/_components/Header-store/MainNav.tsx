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

// Utility function to get the first three words and format with category
const getFormattedProductName = (productName: string, categoryName: string) => {
  const words = productName.split(" ").slice(0, 3).join(" ");
  return `${words} ${categoryName}`;
};

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const categoryOrder = ["Panties", "Sport Bra", "Camisole", "Shorts", "Pyjama"];

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
        <div className="hidden lg:flex space-x-4">
          <div className="flex space-x-4">
            {sortedData.map((category) => (
              <div
                key={category.id}
                className="relative group"
                onMouseEnter={() => handleCategoryHover(category.name)}
                onMouseLeave={() => handleCategoryHover("")}
              >
                <Link
                  className={cn(
                    "transition-colors duration-300 hover:text-pink-300 font-medium uppercase",
                    pathname === `/category/${category.name}`
                      ? "text-pink-300"
                      : "text-white",
                    isCategoryHovered(category.name) && "text-pink-300"
                  )}
                  href={`/category/${category.name.replace(/\s+/g, "-")}`}
                  passHref
                >
                  {category.name}
                </Link>
                {isCategoryHovered(category.name) && (
                  <div className="absolute top-full w-[70vw] z-50 left-0 right-0 bg-white text-gray-800 rounded-xl shadow-2xl py-4 px-8">
                    <div className="relative">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pb-24">
                      {category?.products?.map((product, index) => (
                        <React.Fragment key={product.id}>
                          <Link
                            href={`/product/${product.name.replace(/\s+/g, "-")}`}
                            className="hover:text-pink-500 transition-colors duration-300 overflow-hidden whitespace-nowrap overflow-ellipsis flex items-center space-x-2"
                            passHref
                            onClick={() => setHoveredCategory("")}
                          >
                            <ChevronRightIcon className="w-4 h-4 text-pink-500" />
                            <span className="font-semibold">
                              {getFormattedProductName(product.name, category.name)}
                            </span>
                          </Link>
                          {(index + 1) % 3 === 0 && (
                            <div className="col-span-3 border-b my-2"></div>
                          )}
                        </React.Fragment>
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
          <DropdownMenuContent sideOffset={8} className="text-white">
            <DropdownMenuLabel className="mb-4 border-b text-white">
              <div className="flex items-center space-x-2">
                <span className="text-white">Menu</span>
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
                      ? "text-white"
                      : "text-white"
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
