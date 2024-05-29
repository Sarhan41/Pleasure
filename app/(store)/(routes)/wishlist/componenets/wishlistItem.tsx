"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import { Product } from "@/types";
import { useRouter } from "next/navigation";
import Currency from "@/components/Store/Currency";
import IconButton from "@/components/Store/IconButton";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface WishListItemProps {
  wishlistId: string;
  data: Product;
}

const WishListItem: React.FC<WishListItemProps> = ({ data, wishlistId }) => {
  console.log(wishlistId);
  const router = useRouter();

  const onProductClick = () => {
    router.push(`/product/${data.name}`);
  };

  const removeItem = async (id: string) => {
    try {
      await axios.delete(`/api/dashboard/wishlist/${wishlistId}`);
      toast.success("Item removed from wishlist");
      router.refresh();
      router.push(`/wishlist?reload=${Date.now()}`);
    } catch (error) {
      toast.error("Failed to remove item from wishlist");
    }
  };

  return (
    <li className="flex py-6 border-b ">
      <div
        onClick={onProductClick}
        className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 cursor-pointer"
      >
        <Image
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
          width={200}
          height={200}
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9  sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-8">
          <div className="flex justify-between">
            <p
              onClick={onProductClick}
              className="text-lg cursor-pointer font-semibold text-black"
            >
              {data.name}
            </p>
          </div>
          <div className="mt-1 flex text-sm ">
            {data.colors && data.colors[0].value !== "#111" && ( // Check if color exists before rendering
              <div>
                {data.colors.map((color) => (
                  <div
                    key={color.name}
                    className="w-4 h-4 rounded-full mr-1"
                    style={{ backgroundColor: color.value }}
                  ></div>
                ))}
              </div>
            )}
            {data.sizes && ( // Check if size exists before rendering
              <div className="flex">
                {data.sizes.map((size) => (
                  <div key={size.name} className="ml-2 flex">
                    {size.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="font-semibold">
            <p className="text-2xl text-gray-900">
              ₹
              {data.sizes[0].discountedprice ? (
                <>
                  {data.sizes[0].discountedprice}
                  <span className="line-through ml-4 text-gray-500">
                    {data.sizes[0].price}
                  </span>
                </>
              ) : (
                data.sizes[0].price
              )}
            </p>
          </div>
        </div>
        <div className="absolute z-10 right-0 top-0">
          <IconButton
            onClick={() => removeItem(wishlistId)}
            icon={<X size={15} />}
          />
        </div>
      </div>
    </li>
  );
};

export default WishListItem;
