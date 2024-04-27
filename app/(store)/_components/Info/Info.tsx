"use client";

import React, { MouseEventHandler } from "react";
import Currency from "@/components/Store/Currency";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
  };

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
              <span key={size.name} className="text-black hover:bg-primary hover:text-white hover:cursor-pointer font-semibold border-2 border-gray-500 rounded-md p-2">
                {size.value}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4 ">
          <h3 className="font-semibold text-black">Color:</h3>

          {data?.colors?.map((color) => (
            <>
              {color.toLink ? (
                <Link href={color.toLink} key={color.name}>
                  <div
                    key={color.name}
                    className="h-10 w-10 rounded-full border border-gray-600"
                    style={{ backgroundColor: color.value }}
                  ></div>
                </Link>
              ) : (
                <div
                  key={color.name}
                  className="h-10 w-10 rounded-full border border-gray-600"
                  style={{ backgroundColor: color.value }}
                ></div>
              )}
            </>
          ))}
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
