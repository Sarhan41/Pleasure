"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

import { CartItemWithColors, Product } from "@/types";
import { useRouter } from "next/navigation";
import Currency from "@/components/Store/Currency";
import IconButton from "@/components/Store/IconButton";
import axios from "axios";
import Link from "next/link";

interface CartItemProps {
  data: CartItemWithColors & { product: Product };
  cartId: string;
}

const CartItem: React.FC<CartItemProps> = ({ data, cartId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const removeItem = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/dashboard/cartItems/${cartId}`);
      toast.success("Item removed from Cart");
      router.refresh();
      router.push(`/cart?reload=${Date.now()}`);
    } catch (error) {
      toast.error("Failed to remove item from Cart");
    } finally {
      setLoading(false);
    }
  };

  const onPlusClick = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/dashboard/cartItems/${cartId}`, {
        quantity: data.quantity + 1,
      });
      router.refresh();
      router.push(`/cart?reload=${Date.now()}`);
    } catch (error) {
      toast.error("Failed to increase quantity in your Cart");
    } finally {
      setLoading(false);
    }
  };

  const onMinusClick = async () => {
    if (data.quantity <= 1) return;
    setLoading(true);
    try {
      await axios.patch(`/api/dashboard/cartItems/${cartId}`, {
        quantity: data.quantity - 1,
      });
      router.refresh();
      router.push(`/cart?reload=${Date.now()}`);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to decrease quantity in your Cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-15 z-50">
          <ClipLoader size={50} color={"#FFC0CB"} loading={loading} />
        </div>
      )}

      <li className="relative flex flex-row py-2 border rounded-lg my-2 justify-between items-center border-primary px-2 space-x-2">
        <div className="absolute cursor-pointer h-fit w-fit top-1 right-1">
          <X
            height={3}
            width={3}
            className="h-4 w-4 p-1  rounded-full flex items-center justify-center bg-white border shadow-md  hover:scale-110 transition"
            onClick={() => removeItem(data.id)}
          />
        </div>
        <div className="relative h-20 w-16 sm:h-24 items-center flex  sm:w-20 rounded-md overflow-hidden cursor-pointer">
          <Link
            prefetch={true}
            href={`/product/${data.product.name.replace(/\s+/g, "-")}`}
          >
            <Image
              height={80}
              width={60}
              src={data.product.images[0].url}
              alt={""}
              className="object-cover object-top rounded-md"
            />
          </Link>
        </div>

        <div className="flex flex-1 flex-col ml-2 sm:ml-3">
          <Link
            prefetch={true}
            href={`/product/${data.product.name.replace(/\s+/g, "-")}`}
            className="text-[10px] sm:text-sm cursor-pointer font-medium text-black hover:text-primary"
          >
            {data.product.subname && data.product.subname.length > 0
              ? data.product.subname.includes("100")
                ? data.product.subname.replace("100", "100%")
                : data.product.subname
              : data.product.name.includes("100")
              ? data.product.name.replace("100", "100%")
              : data.product.name}
          </Link>
          <div className="flex flex-row items-start sm:items-center mt-1 sm:mt-2 space-x-2">
            {data.color.length > 0 && (
              <div className="flex flex-row items-start sm:items-center mt-1 sm:mt-2 space-x-2">
                <div className="flex items-center space-x-1">
                  <h1 className="font-light px-1 sm:flex py-0.5 text-[10px] sm:text-xs">
                    <span className="font-medium hidden mr-1 sm:flex">
                      Colors:
                    </span>
                    {/* {data.color.map((color) => color.name).join(", ")} */}
                  </h1>
                  <div className="flex space-x-1">
                    {data.color.map((color, idx) => (
                      <span
                        key={idx}
                        style={{ backgroundColor: color.value }}
                        className="block h-3 w-3 rounded-sm border border-gray-600"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center  space-x-1">
              <h1 className=" font-light px-1 sm:flex py-0.5 text-[10px] sm:text-xs">
                <span className="font-medium hidden mr-1 sm:flex">Size:</span>{" "}
                {data.sizeName}
              </h1>
              <h1 className="font-light px-1 py-0.5 sm:flex text-[10px] sm:text-xs">
                <span className="font-medium mr-1 hidden sm:flex">
                  Category:
                </span>{" "}
                {data.category}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {data.quantity > 1 && (
              <IconButton
                onClick={onMinusClick}
                icon={<MinusIcon size={12} />}
              />
            )}
            <span className="mx-1 text-xs ">{data.quantity}</span>
            <IconButton onClick={onPlusClick} icon={<PlusIcon size={12} />} />
          </div>
          <div className="font-semibold text-right text-sm">
            ₹
            {data.discountedPrice ? (
              <>
                {data.discountedPrice}
                <span className="line-through ml-2 text-gray-500 text-xs">
                  {data.price}
                </span>
              </>
            ) : (
              data.price
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default CartItem;
