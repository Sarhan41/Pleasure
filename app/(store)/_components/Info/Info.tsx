"use client";

import { MouseEventHandler, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Currency from "@/components/Store/Currency";
import { Product, Size } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Check, MinusIcon, PlusIcon } from "lucide-react";

interface InfoProps {
  data: Product;
  userId: string;
}

const Info: React.FC<InfoProps> = ({ data, userId }) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false); // State to manage dialog open/close
  const router = useRouter();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    try {
      const response = await axios.get("/api/dashboard/cartItems");
      const cartItems = response.data;
      const foundItem = cartItems.find(
        (item: { productId: string; userId: string }) =>
          item.productId === data.id && item.userId === userId
      );

      if (!foundItem) {
        await axios.post("/api/dashboard/cartItems", {
          id: data.id,
          quantity: quantity,
          userId,
        });
        toast.success("Added to cart");
      } else {
        const cartId = foundItem.id; // Update existingItem state
        await axios.patch(`/api/dashboard/cartItems/${cartId}`, {
          quantity: foundItem.quantity + quantity, // Increase quantity by by local quantity state
        });
        toast.success("Item's quantity increased in cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding to cart");
    }
  };

  const handleSizeSelection = (size: Size) => {
    setSelectedSize(size);
    if (selectedSize === size) setSelectedSize(null);
  };

  const handleSizeChartOpen = () => {
    setIsSizeChartOpen(true);
  };

  const handleSizeChartClose = () => {
    setIsSizeChartOpen(false);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 border-b-2 pb-4">
        {data.name}
      </h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency
            value={data?.price || 0}
            discountedValue={data?.discountedPrice}
          />
        </p>
      </div>
      <div className="flex flex-col my-8 gap-y-6">
        <div className="flex gap-4 flex-col">
          <h3 className="font-semibold text-black"> Available sizes:</h3>
          <div className="flex gap-4">
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
        <div>
          <h3
            onClick={handleSizeChartOpen}
            className="font-semibold text-primary"
          >
            Size Chart
          </h3>
          <Dialog open={isSizeChartOpen} onOpenChange={handleSizeChartClose}>
            <DialogOverlay className="fixed inset-0 flex items-center justify-center bg-black opacity-50">
              <DialogContent className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
                <div>hello</div>
                <DialogClose asChild>
                  <button className="absolute top-4 right-4">
                    <Cross2Icon className="h-4 w-4" />
                  </button>
                </DialogClose>
                {/* Your size chart content goes here */}
              </DialogContent>
            </DialogOverlay>
          </Dialog>
        </div>
        <div className="flex flex-col gap-x-4">
          <h3 className="font-semibold text-black">Qty:</h3>
          <div className="flex items-center border border-gray-300 rounded-md w-fit p-2">
            <button
              onClick={decrementQuantity}
              className="flex justify-center items-center w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
              {quantity === 1 ? "" : <MinusIcon className="h-4 w-4" />}
            </button>
            <span className="text-gray-900 font-semibold mx-4">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="flex justify-center items-center w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          {/* Color handling */}

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
                      className="h-10 w-10 rounded-full border border-gray-600 cursor-pointer"
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
          {/* Shopping cart icon */}
        </Button>
      </div>
    </div>
  );
};

export default Info;
