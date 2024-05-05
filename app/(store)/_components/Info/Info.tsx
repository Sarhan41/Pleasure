"use client";

import React, { MouseEventHandler, useState } from "react";
import Currency from "@/components/Store/Currency";
import { Button } from "@/components/ui/button";
import { Product, Size } from "@/types";
import { Check, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
  };

  const handleSizeSelection = (size: Size) => {
    setSelectedSize(size);
    if (selectedSize === size) setSelectedSize(null);
  };

  const url = process.env.NEXT_PUBLIC_APP_URL;
  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 ">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between ">
        <p className="text-2xl text-gray-900 ">
          <Currency value={data?.price || 0} /> {/* Added fallback value */}
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4 ">
          <h3 className="font-semibold text-black">Size:</h3>
          <div className="flex gap-4 ">
            {data?.sizes?.map((size) => (
              <div key={size.id} className="flex flex-col">
                <span
                  key={size.name}
                  className={`text-black ${
                    selectedSize != size && "hover:bg-primary"
                  }  hover:text-white hover:cursor-pointer font-semibold border-2 border-gray-500 rounded-md p-2 ${
                    selectedSize === size ? "bg-gray-600 text-white" : ""
                  }`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size.value}
                </span>
                {selectedSize === size && (
                  <h3 className="text-gray-900">
                    {size.quantity < 5
                      ? `${size.quantity} left`
                      : size.quantity < 10
                      ? "Only a few left!"
                      : null}
                  </h3>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4 ">
          <h3 className="font-semibold text-black">Color:</h3>

          {data?.colors?.map((color) => {
            const handleClick = () => {
              const productName = color.toLink?.replace(/ /g, "-");
              router.push(`/product/${productName}`);
            };
            return (
              <>
                {color.toLink ? (
                  <div onClick={handleClick} key={color.name}>
                    <div
                      key={color.name}
                      className="h-10 w-10 rounded-full border border-gray-600"
                      style={{ backgroundColor: color.value }}
                    ></div>
                  </div>
                ) : (
                  <div
                    key={color.name}
                    className="h-10 w-10 rounded-full border border-gray-900 relative"
                    style={{ backgroundColor: color.value }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600  bottom-0 left-0 h-3 w-3 bg-white border border-gray-900">
                      <Check size={24} />
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
