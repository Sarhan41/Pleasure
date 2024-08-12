"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

import Button from "./Button";
import { Color, Size } from "@/types";
import IconButton from "@/components/Store/IconButton";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
  selectedColors: string[];
  selectedSizes: string[];
  priceRange: [number, number];
  minPrice: number;
  maxPrice: number;
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>;
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  sizes,
  colors,
  selectedColors,
  selectedSizes,
  priceRange,
  minPrice,
  maxPrice,
  setSelectedColors,
  setSelectedSizes,
  setPriceRange,
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
    <section className="mb-4">

      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Filters
        <Plus size={20} />
      </Button>
      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        <div className="fixed inset-0 z-50 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 shadow-xl">
            <div className="flex items-center justify-between px-4 mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <IconButton icon={<X size={20} />} onClick={onClose} />
            </div>
            <div className="flex flex-col gap-y-6 px-4">
              {/* Filter by Color */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-700">Colors</h3>
                <hr className="my-4 border-gray-300" />
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
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
                  {sizes.map((size) => (
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
            <div className="px-4 mt-auto">
              <Button onClick={onClose} className="w-full mt-4">
                Apply Filters
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
    </>
  );
};

export default MobileFilters;
