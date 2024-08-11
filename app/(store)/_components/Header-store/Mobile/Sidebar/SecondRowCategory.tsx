import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SecondRowCategoryProps {
  handleCategoryClick: (categoryName: string) => void;
  expandedCategory: string | null;
  getFormattedProductName: (
    productName: string,
    categoryName: string
  ) => string;
  toggleSidebar: () => void;
  categories: {
    id: string;
    name: string;
    products: { id: string; name: string; subname: string | null }[];
  }[];
}

const SecondRowCategory = ({
  handleCategoryClick,
  expandedCategory,
  getFormattedProductName,
  toggleSidebar,
  categories,
}: SecondRowCategoryProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {categories.map((category) => (
        <div key={category.id} className="mb-2">
          <div className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-primary-100 transition-colors duration-200">
            <Link
              aria-label="Link"
              href={`/collections/${category.name.replace(/\s+/g, "-")}`}
              onClick={toggleSidebar}
            >
              <div className="flex items-center gap-2 ">
                {category.name}
              </div>
            </Link>
            <button
              className=""
              onClick={() => handleCategoryClick(category.name)}
            >
              {expandedCategory === category.name ? (
                <ChevronDownIcon size={20} className="text-primary" />
              ) : (
                <ChevronRightIcon size={20} className="text-primary" />
              )}
            </button>
          </div>

          {expandedCategory === category.name && (
            <div className="pl-8 mt-2 max-h-60 overflow-y-auto">
              {category.products.slice(0, 8).map((product, index) => (
                <React.Fragment key={product.id}>
                  <div className="flex">
                    <Link
                      aria-label="Link"
                      href={`/product/${product.name.replace(/\s+/g, "-")}`}
                      className="block px-3 py-1 text-base font-medium text-gray-600 rounded-md hover:bg-primary-100 transition-colors duration-200"
                      onClick={toggleSidebar}
                    >
                      <div className="flex gap-2">
                        <ChevronRightIcon className="w-4 h-4 text-primary" />
                        {/* Display subname if available, otherwise use getFormattedProductName */}
                        {product.subname
                          ? product.subname
                          : getFormattedProductName(
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
  );
};

export default SecondRowCategory;
