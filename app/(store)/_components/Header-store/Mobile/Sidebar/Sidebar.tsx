import React, { useState } from "react";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import FirstRowUser  from "./FirstRowUser";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  categories: {
    id: string;
    name: string;
    products: { id: string; name: string }[];
  }[];
  userId: string | null | undefined;
  userName: string | null | undefined;
}

// Utility function to get the first three words and format with category
const getFormattedProductName = (productName: string, categoryName: string) => {
  const words = productName.split(" ").slice(0, 3).join(" ");
  return `${words} ${categoryName}`;
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  categories,
  userId,
  userName,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    setExpandedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
  };

  return (
    <Transition
      appear={true}
      show={isOpen}
      className={`fixed inset-0 z-50 flex`}
      enter="transition ease-out duration-300"
      enterFrom="transform -translate-x-full"
      enterTo="transform translate-x-0"
      leave="transition ease-in duration-300"
      leaveFrom="transform translate-x-0"
      leaveTo="transform -translate-x-full"
    >
      <div className="fixed inset-0 z-50 flex">
        <div className="relative flex flex-col w-64 bg-white shadow-xl h-screen z-50">
          <FirstRowUser
            userName={userName}
            toggleSidebar={toggleSidebar}
            userId={userId}
          />
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Categories
              </h2>
              {categories.map((category) => (
                <div key={category.id} className="mb-2">
                  <button
                    className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-primary-100 transition-colors duration-200"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="flex items-center gap-2 text-primary-600">
                      {category.name}
                    </div>
                    {expandedCategory === category.name ? (
                      <ChevronDownIcon size={20} className="text-primary-600" />
                    ) : (
                      <ChevronRightIcon
                        size={20}
                        className="text-primary-600"
                      />
                    )}
                  </button>
                  {expandedCategory === category.name && (
                    <div className="pl-8 mt-2 max-h-60 overflow-y-auto">
                      {category.products.slice(0, 3).map((product, index) => (
                        <React.Fragment key={product.id}>
                          <div className="flex">
                            <Link
                              href={`/product/${product.name.replace(
                                /\s+/g,
                                "-"
                              )}`}
                              className="block px-3 py-1 text-base font-medium text-gray-600 rounded-md hover:bg-primary-100 transition-colors duration-200"
                              onClick={toggleSidebar}
                            >
                              <div className="flex gap-2">
                                <ChevronRightIcon className="w-4 h-4 text-primary" />
                                {getFormattedProductName(
                                  product.name,
                                  category.name
                                )}
                              </div>
                            </Link>
                            {(index + 1) % 3 === 0 && (
                              <div className="border-b border-gray-200 my-2"></div>
                            )}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Sidebar;
