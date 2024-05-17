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
        quantity: quantity + 1, // Increase quantity by local quantity state
      });
      router.refresh();
      router.push(`/cart?reload=${Date.now()}`);
    } catch (error) {
      toast.error("Failed to increase quantity in your Cart");
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
    <li className="relative flex py-4 border rounded-lg my-4 justify-between items-center border-primary px-4">
      <div className="absolute top-2 right-2">
        <IconButton onClick={() => removeItem(cartId)} icon={<X size={15} />} />
      </div>
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-32 sm:w-32 cursor-pointer">
        <Image
          onClick={onProductClick}
          fill
          src={data.images[0].url}
          alt={data.name}
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-col ml-4 sm:ml-6">
        <p
          onClick={onProductClick}
          className="text-lg cursor-pointer font-semibold text-black hover:text-primary"
        >
          {data.name}
        </p>
        <div className="flex items-center mt-2">
          {data.colors && data.colors[0].value != "#111" && (
            <div
              key={data?.colors[0]?.name}
              className="w-4 h-4 rounded-full mr-2 border-2 border-black"
              style={{ backgroundColor: data.colors[0].value }}
            ></div>
          )}
          <h1 className="border font-bold px-4 py-2 mt-2">
            {" "}
            <span className="font-medium">Size :</span> {size}
          </h1>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {quantity > 1 && (
            <IconButton onClick={onMinusClick} icon={<MinusIcon size={15} />} />
          )}
          <span className="mx-2">{quantity}</span>
          <IconButton onClick={onPlusClick} icon={<PlusIcon size={15} />} />
        </div>
        <Currency value={price} discountedValue={data?.discountedPrice} />
      </div>
    </li>
  );
};

export default CartItem;
