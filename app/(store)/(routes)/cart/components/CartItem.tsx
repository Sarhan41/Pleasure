"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import { Product } from "@/types";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/store/use-cart";
import Currency from "@/components/Store/Currency";
import IconButton from "@/components/Store/IconButton";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const router = useRouter();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onProductClick = () => {
    router.push(`/product/${data.id}`);
  };

  return (
    <li className="flex py-6 border-b ">
      <div
        onClick={onProductClick}
        className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 cursor-pointer"
      >
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9  sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-8">
          <div className="flex justify-between">
            <p
              onClick={onProductClick}
              className="text-lg  cursor-pointer font-semibold text-black"
            >
              {data.name}
            </p>
          </div>

          <div className="mt-1 flex text-sm ">
            {data.color && ( // Check if color exists before rendering
              <p className="text-gray-500">{data.color.name}</p>
            )}
            {data.size && ( // Check if size exists before rendering
              <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4 ">
                {data.size.name}
              </p>
            )}
          </div>
          <Currency value={data.price} />
        </div>
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
