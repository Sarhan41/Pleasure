"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { MinusIcon, PlusIcon, X } from "lucide-react";

import { Product } from "@/types";
import { useRouter } from "next/navigation";
import Currency from "@/components/Store/Currency";
import IconButton from "@/components/Store/IconButton";
import axios from "axios";
import { CartItems } from "@prisma/client";

interface CartItemProps {
  data: Product;
  quantity: number;
  cartId: string;
  size: string;
  price: number;
}

const CartItem: React.FC<CartItemProps> = ({
  data,
  quantity,
  cartId,
  size,
  price,
}) => {
  const router = useRouter();
  // console.log("CARTITEM.TSX 13", data);

  const removeItem = async (id: string) => {
    try {
      await axios.delete(`/api/dashboard/cartItems/${cartId}`);
      toast.success("Item removed from Cart");
      router.refresh();
      router.push(`/cart?reload=${Date.now()}`);
    } catch (error) {
      toast.error("Failed to remove item from Cart");
    }
  };
  const onProductClick = () => {
    router.push(`/product/${data.name}`);
  };

  const onPlusClick = async () => {
    try {
      await axios.patch(`/api/dashboard/cartItems/${cartId}`, {
        quantity: quantity + 1, // Increase quantity by by local quantity state
      });
      router.refresh();
      router.push(`/cart?reload=${Date.now()}`);
    } catch (error) {
      toast.error("Failed to Increase Quantity in your Cart");
    }
  };

  const onMinusClick = async () => {
    try {
      if (quantity > 1) {
        await axios.patch(`/api/dashboard/cartItems/${cartId}`, {
          quantity: quantity - 1,
        });
        router.refresh();
        router.push(`/cart?reload=${Date.now()}`);
      }
    } catch (error) {
      toast.error("Failed to decrease quantity in your Cart");
    }
  };


  return (
    <li className="flex py-6 border-b ">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 cursor-pointer">
        <Image
          onClick={onProductClick}
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
            <p className="text-lg flex  gap-4 cursor-pointer font-semibold text-black h-fit w-fit z-10">
              {quantity === 1 ? (
                ""
              ) : (
                <IconButton
                  onClick={onMinusClick}
                  icon={<MinusIcon size={15} />}
                />
              )}

              {quantity}
              <IconButton onClick={onPlusClick} icon={<PlusIcon size={15} />} />
            </p>
          </div>

          <div className="mt-1 flex text-sm ">
            {data.colors && ( // Check if color exists before rendering
              <div>
                <div
                  key={data?.colors[0]?.name}
                  className="w-4 h-4 rounded-full mr-1 border-2 border-black"
                  style={{ backgroundColor: data.colors[0].value }}
                ></div>
              </div>
            )}
            {size}
          </div>
          <Currency value={price} discountedValue={data?.discountedPrice} />
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
