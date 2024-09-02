"use client";

import Image from "next/image";
import Link from "next/link";
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
  const router = useRouter();

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
    <li className="flex py-6 border-b">
      <div className="relative h-20 w-16 sm:h-24 items-center flex sm:w-20 rounded-md overflow-hidden cursor-pointer">
        <Link href={`/product/${data.name.replace(/\s+/g, "-")}`} passHref>
          <Image
            height={80}
            width={60}
            src={data.images[0].url}
            alt={data.name}
            className="object-cover object-top rounded-md"
          />
        </Link>
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-8">
          <div className="flex justify-between">
            <Link href={`/product/${data.name.replace(/\s+/g, "-")}`} passHref>
              <p className="text-lg cursor-pointer font-semibold text-black">
                {data.name}
              </p>
            </Link>
          </div>
          <div className="mt-1 flex text-sm">
            {data.colors && data.colors[0].value !== "#111" && (
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
            {data.sizes && (
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
