"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "@/app/(store)/_components/ProductCard/ProductCard";
import { Product } from "@/types";
import { Dialog, Transition } from "@headlessui/react"; // Importing Dialog and Transition components
import { Fragment } from "react";
import { PlusIcon } from "lucide-react";

interface CategoryPageClientProps {
  products: Product[];
  userId: string | undefined;
  categoryName: string;
}

const CategoryPageClient: React.FC<CategoryPageClientProps> = ({
  products,
  userId,
  categoryName,
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to control dialog visibility

  // Extract unique color names
  // Extract unique color names
  const colorOptions = useMemo(() => {
    const allColors = products.flatMap((p) => [
      ...p.colors.filter((c) => c.name !== "None"),
      ...p.colorNames.filter((colorName) => colorName.name !== "None")
    ]);
  
    const uniqueColors = Array.from(new Set(allColors.map((c) => c.name))).map(
      (name) => allColors.find((c) => c.name === name)!
    );
  
    return uniqueColors;
  }, [products]);
  
  // Extract unique size names
  const sizeOptions = useMemo(() => {
    const allSizes = products.flatMap((p) => p.sizes);
    const uniqueSizes = Array.from(new Set(allSizes.map((s) => s.name))).map(
      (name) => allSizes.find((s) => s.name === name)!
    );
    return uniqueSizes;
  }, [products]);

  const minPrice = useMemo(
    () =>
      Math.min(
        ...products.map((p) =>
          p.sizes[0].discountedprice
            ? parseFloat(p.sizes[0].discountedprice)
            : parseFloat(p.sizes[0].price)
        )
      ),
    [products]
  );

  const maxPrice = useMemo(
    () =>
      Math.max(
        ...products.map((p) =>
          p.sizes[0].discountedprice
            ? parseFloat(p.sizes[0].discountedprice)
            : parseFloat(p.sizes[0].price)
        )
      ),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesColor = selectedColors.length
        ? product.colors.some((c) =>
            selectedColors.includes(c.name)
          ) ||
          product.colorNames.some((colorName) =>
            selectedColors.includes(colorName.name)
          )
        : true;

      const matchesSize = selectedSizes.length
        ? product.sizes.some((s) => selectedSizes.includes(s.name))
        : true;

      const matchesPrice = product.sizes.some((s) => {
        const price = s.discountedprice
          ? parseFloat(s.discountedprice)
          : parseFloat(s.price);
        return price >= priceRange[0] && price <= priceRange[1];
      });

      return matchesColor && matchesSize && matchesPrice;
    });
  }, [products, selectedColors, selectedSizes, priceRange]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const aDiscountedPrice = a.sizes[0].discountedprice
        ? parseFloat(a.sizes[0].discountedprice)
        : parseFloat(a.sizes[0].price);
      const bDiscountedPrice = b.sizes[0].discountedprice
        ? parseFloat(b.sizes[0].discountedprice)
        : parseFloat(b.sizes[0].price);

      return sortOrder === "asc"
        ? aDiscountedPrice - bDiscountedPrice
        : bDiscountedPrice - aDiscountedPrice;
    });
  }, [filteredProducts, sortOrder]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Button for Mobile */}
        <button
          className="lg:hidden bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-lg font-semibold px-4 py-3 rounded-full flex items-center justify-center w-fit mb-4 shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          onClick={() => setIsFilterOpen(true)}
        >
          Filters
          <PlusIcon className="w-6 h-6 ml-2 text-white" />
        </button>

        {/* Filters Column for Desktop */}
        <div className="w-full lg:w-1/4 bg-gray-50 p-6 rounded-lg h-fit shadow-md hidden lg:block">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
            Filters
          </h2>

          {/* Filter by Color */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-700">Colors</h3>
            <hr className="my-4 border-gray-300" />
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  className={`rounded-lg text-sm px-3 py-2 font-medium border transition-all duration-200 ${
                    selectedColors.includes(color.name)
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    setSelectedColors((prev) =>
                      prev.includes(color.name)
                        ? prev.filter((c) => c !== color.name)
                        : [...prev, color.name]
                    )
                  }
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Filter by Size */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-700">Sizes</h3>
            <hr className="my-4 border-gray-300" />
            <div className="flex flex-wrap gap-3">
              {sizeOptions.map((size) => (
                <button
                  key={size.name}
                  className={`rounded-lg text-sm px-3 py-2 font-medium border transition-all duration-200 ${
                    selectedSizes.includes(size.name)
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    setSelectedSizes((prev) =>
                      prev.includes(size.name)
                        ? prev.filter((s) => s !== size.name)
                        : [...prev, size.name]
                    )
                  }
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Filter by Price */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-700">Prices</h3>
            <hr className="my-4 border-gray-300" />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseFloat(e.target.value)])
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
              style={{
                background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${
                  ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100
                }%, #d1d5db ${
                  ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100
                }%, #d1d5db 100%)`,
              }}
            />
            <div className="mt-4 text-sm text-gray-600">
              <span>{`Min: ${priceRange[0].toFixed(
                2
              )} - Max: ${priceRange[1].toFixed(2)}`}</span>
            </div>
          </div>
        </div>

        {/* Filter Dialog for Mobile */}
        <Transition appear show={isFilterOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={() => setIsFilterOpen(false)}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
              </Transition.Child>

              {/* Trick to center the modal content */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
                    Filters
                  </h2>

                  {/* Filter by Color */}
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-gray-700">
                      Colors
                    </h3>
                    <hr className="my-4 border-gray-300" />
                    <div className="flex flex-wrap gap-3">
                      {colorOptions.map((color) => (
                        <button
                          key={color.name}
                          className={`rounded-lg text-sm px-3 py-2 font-medium border transition-all duration-200 ${
                            selectedColors.includes(color.name)
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                          onClick={() =>
                            setSelectedColors((prev) =>
                              prev.includes(color.name)
                                ? prev.filter((c) => c !== color.name)
                                : [...prev, color.name]
                            )
                          }
                        >
                          {color.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filter by Size */}
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-gray-700">
                      Sizes
                    </h3>
                    <hr className="my-4 border-gray-300" />
                    <div className="flex flex-wrap gap-3">
                      {sizeOptions.map((size) => (
                        <button
                          key={size.name}
                          className={`rounded-lg text-sm px-3 py-2 font-medium border transition-all duration-200 ${
                            selectedSizes.includes(size.name)
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                          onClick={() =>
                            setSelectedSizes((prev) =>
                              prev.includes(size.name)
                                ? prev.filter((s) => s !== size.name)
                                : [...prev, size.name]
                            )
                          }
                        >
                          {size.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filter by Price */}
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-gray-700">
                      Prices
                    </h3>
                    <hr className="my-4 border-gray-300" />
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          parseFloat(e.target.value),
                        ])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{
                        background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${
                          ((priceRange[1] - minPrice) / (maxPrice - minPrice)) *
                          100
                        }%, #d1d5db ${
                          ((priceRange[1] - minPrice) / (maxPrice - minPrice)) *
                          100
                        }%, #d1d5db 100%)`,
                      }}
                    />
                    <div className="mt-4 text-sm text-gray-600">
                      <span>{`Min: ${priceRange[0].toFixed(
                        2
                      )} - Max: ${priceRange[1].toFixed(2)}`}</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-md"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        {/* Products Column */}
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h2 className="text-2xl font-bold text-primary uppercase mb-2 sm:mb-0">
              {categoryName}
            </h2>

            <div className="flex flex-row gap-2 w-full sm:w-auto">
              <button
                className={`text-xs p-2 rounded-md w-fit sm:w-auto ${
                  sortOrder === "asc"
                    ? "bg-primary text-white"
                    : "bg-white border border-gray-300"
                }`}
                onClick={() => setSortOrder("asc")}
              >
                Price: Low to High
              </button>
              <button
                className={`text-xs p-2 rounded-md w-fit sm:w-auto ${
                  sortOrder === "desc"
                    ? "bg-primary text-white"
                    : "bg-white border border-gray-300"
                }`}
                onClick={() => setSortOrder("desc")}
              >
                Price: High to Low
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} data={product} userId={userId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPageClient;
