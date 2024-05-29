"use client";

import { MouseEventHandler, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Currency from "@/components/Store/Currency";
import { Size } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import {
  Check,
  Heart,
  MinusIcon,
  PlusIcon,
  Share2Icon,
  Link,
} from "lucide-react";
import IconButton from "@/components/Store/IconButton";
import { FaWhatsapp } from "react-icons/fa";
import SizeChart from "./SizeChart";
import { Product as ProductType } from "@/types";

interface InfoProps {
  data: ProductType;
  userId?: string;
}

const Info: React.FC<InfoProps> = ({ data, userId }) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    data.colors[0].name
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isSharePopupOpen1, setIsSharePopupOpen1] = useState(false);
  const [isSharePopupOpen2, setIsSharePopupOpen2] = useState(false);
  const router = useRouter();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    try {
      const response = await axios.get("/api/dashboard/cartItems");
      const cartItems = response.data;

      if (!userId) {
        return toast.error("Please login to add to cart");
      }

      const foundItem = cartItems.find(
        (item: {
          productId: string;
          userId: string;
          sizeName: string;
          color: string;
        }) =>
          item.productId === data.id &&
          item.userId === userId &&
          item.sizeName === selectedSize?.name &&
          item.color === selectedColor
      );

      if (selectedSize === null) {
        toast.error("Please select a size");
        setSizeError(true);
        return;
      }

      if (!foundItem) {
        await axios.post("/api/dashboard/cartItems", {
          id: data.id,
          quantity: quantity,
          userId,
          sizeName: selectedSize?.name,
          price: selectedSize?.price,
          color: selectedColor,
        });
        toast.success("Added to cart");
      } else {
        const cartId = foundItem.id;
        await axios.patch(`/api/dashboard/cartItems/${cartId}`, {
          quantity: foundItem.quantity + quantity,
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
    setSizeError(false);
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

  const onAddToWishList: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.stopPropagation();
    try {
      const response = await axios.get("/api/dashboard/wishlist");
      const wishlistItems = response.data;

      if (!userId) {
        return toast.error("Please login to add to wishlist");
      }

      const existing = wishlistItems.find(
        (item: { productId: string; userId: string }) =>
          item.productId === data.id && item.userId === userId
      );

      if (existing) {
        return toast.error("Item already exists in wishlist");
      } else {
        await axios.post("/api/dashboard/wishlist", { id: data.id, userId });
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding to wishlist");
    }
  };

  const handleShareButtonClick1 = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSharePopupOpen1(!isSharePopupOpen1);
    setIsSharePopupOpen2(false);
  };

  const handleShareButtonClick2 = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSharePopupOpen2(!isSharePopupOpen2);
    setIsSharePopupOpen1(false);
  };

  const handleShareViaWhatsApp = () => {
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        toast.success("Link copied to clipboard");
      },
      () => {
        toast.error("Failed to copy link");
      }
    );
    setIsSharePopupOpen1(false);
    setIsSharePopupOpen2(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 border-b-2 pb-4">
        {data.name.includes("100")
          ? `${data.name.split("100")[0]}100%${data.name.split("100")[1]}`
          : data.name}
      </h1>

      <div className="mt-3 flex items-end gap-4 justify-between">
        <div className="font-semibold">
          <p className="text-2xl text-gray-900">
            ₹
            {!selectedSize ? (
              data.sizes[0].price
            ) : selectedSize.discountedprice ? (
              <>
                {selectedSize.discountedprice}
                <span className="line-through ml-4 text-gray-500">
                  {selectedSize.price}
                </span>
              </>
            ) : (
              selectedSize.price
            )}
          </p>
        </div>
        {selectedSize && (
          <span className="text-base text-gray-900 flex gap-2">
            SKU:
            <h4>{selectedSize?.SKUvalue}</h4>
          </span>
        )}
      </div>
      <div className="flex flex-col my-4 gap-y-4">
        <div className="flex gap-4 flex-col">
          <h3 className="font-semibold text-black"> Available sizes:</h3>
          <div className="flex gap-4">
            {data?.sizes?.map((size) => (
              <div key={size.name} className="flex flex-col">
                <span
                  key={size.name}
                  className={`text-black ${
                    selectedSize != size && "hover:bg-primary"
                  }  hover:text-white hover:cursor-pointer font-semibold border-2 border-gray-500 rounded-md p-2 ${
                    selectedSize === size ? "bg-gray-600 text-white" : ""
                  } ${sizeError && "border-red-700"} `}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size.name}
                </span>
                {selectedSize === size && (
                  <h3 className="text-gray-900">
                    {Number(size.quantity) < 5
                      ? `${size.quantity} left`
                      : Number(size.quantity) < 10
                      ? "Only a few left!"
                      : null}
                  </h3>
                )}
              </div>
            ))}
          </div>
          {sizeError && (
            <span className="text-red-900">Please select a size</span>
          )}
        </div>
        <div>
          <h3
            onClick={handleSizeChartOpen}
            className="font-semibold text-primary cursor-pointer w-fit"
          >
            Size Chart
          </h3>
          <Dialog open={isSizeChartOpen} onOpenChange={handleSizeChartClose}>
            <DialogOverlay className="fixed inset-0 flex items-center justify-center bg-black opacity-50">
              <DialogContent className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
                <SizeChart />
                <DialogClose asChild>
                  <button className="absolute top-4 right-4">
                    <Cross2Icon className="h-4 w-4" />
                  </button>
                </DialogClose>
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
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="mx-4">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="flex justify-center items-center w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          {data?.colors?.map((color) => {
            const handleClick = () => {
              const productName = color.toLink?.replace(/ /g, "-");
              router.push(`/product/${productName}`);
              setSelectedColor(color?.value);
            };
            if (color.value != "#111") {
              return (
                <div key={color.name}>
                  <h3 className="font-semibold text-black ">Colors:</h3>
                  {color.toLink ? (
                    <div onClick={handleClick}>
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
                      <div className="absolute inset-0 flex items-center justify-center text-gray-600 bottom-0 left-0 h-3 w-3 bg-white border border-gray-900">
                        <Check size={24} />
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-x-3 relative">
        <div className="border-primary border-2 rounded-full">
          <IconButton
            onClick={handleShareButtonClick1}
            icon={<Share2Icon size={20} className="text-gray-600" />}
          />
        </div>
        {isSharePopupOpen1 && (
          <div className="absolute bg-white border border-gray-300 rounded-md p-2 mt-2 shadow-lg z-50">
            <button
              onClick={handleShareViaWhatsApp}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md w-full"
            >
              <FaWhatsapp size={20} className="text-green-500" />
              <span>Share via WhatsApp</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md w-full"
            >
              <Link size={20} className="text-gray-600" />
              <span>Copy Link</span>
            </button>
          </div>
        )}
        <div className="border-primary border-2 rounded-full">
          <IconButton
            onClick={onAddToWishList}
            icon={<Heart size={20} className="text-gray-600" />}
          />
        </div>
        <div>
          <Button
            onClick={onAddToCart}
            className="flex items-center gap-x-2 w-60"
          >
            Add To Cart
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-black border-b-2 border-primary w-fit p-2 mb-4">
          Description
        </h3>
        <p className="text-gray-600">
          {data.description?.split(".").join(".\n") || "No description"}
        </p>
      </div>
      <div className="mt-10 flex items-center gap-x-6  py-7shadow-2xl shadow-gray-600 w-full justify-center relative">
        <div className="border-primary border-2 rounded-full">
          <IconButton
            onClick={handleShareButtonClick2}
            icon={<Share2Icon size={20} className="text-gray-600" />}
          />
        </div>
        {isSharePopupOpen2 && (
          <div className="absolute bg-white border border-gray-300 rounded-md p-2 mt-2 shadow-lg z-50">
            <button
              onClick={handleShareViaWhatsApp}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md w-full"
            >
              <FaWhatsapp size={20} className="text-green-500" />
              <span>Share via WhatsApp</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md w-full"
            >
              <Link size={20} className="text-gray-600" />
              <span>Copy Link</span>
            </button>
          </div>
        )}
        <div className="border-primary border-2 rounded-full">
          <IconButton
            onClick={onAddToWishList}
            icon={<Heart size={20} className="text-gray-600" />}
          />
        </div>
        <div>
          <Button
            onClick={onAddToCart}
            className="flex items-center gap-x-2 w-60"
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
