"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import { Product } from "@/types";
import { useRouter } from "next/navigation";
import Currency from "@/components/Store/Currency";
import IconButton from "@/components/Store/IconButton";
import axios from "axios";

interface CartItemProps {
  data: Product;
  quantity: number;
  cartId: string;
}

const CartItem: React.FC<CartItemProps> = ({ data, quantity, cartId }) => {
  const router = useRouter();
  // console.log("CARTITEM.TSX 13", data);

  const removeItem = async (id: string) => {
    try {
      await axios.delete(`/api/dashboard/cartItems/${cartId}`);
      toast.success("Item removed from wishlist");
      router.refresh();
      router.push(`/cart?reload=${Date.now()}`);
    } catch (error) {
      toast.error("Failed to remove item from Cart");
    }
  };
  const onProductClick = () => {
    router.push(`/product/${data.name}`);
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
            <p
              onClick={onProductClick}
              className="text-lg  cursor-pointer font-semibold text-black"
            >
              {quantity} piece
            </p>
          </div>

          <div className="mt-1 flex text-sm ">
            {data.color && ( // Check if color exists before rendering
              <p
                className="rounded-full h-5 w-5 "
                style={{ backgroundColor: data.color.name }}
              ></p>
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
          <IconButton
            onClick={() => removeItem(cartId)}
            icon={<X size={15} />}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
