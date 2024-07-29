"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
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
import SizeChart from "../SizeChart";
import { Product as ProductType } from "@/types";
import { MotionSpan } from "@/constant/MotionElements";
import { calculateDiscountPercentage } from "@/lib/calculateDiscountedPrice";
import MainExtraDetails from "../ExtraDetails/MainDetails";

interface InfoProps {
  data: ProductType;
  userId?: string;
}

const Info: React.FC<InfoProps> = ({ data, userId }) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  const packMatch = data.name.match(/\(pack of (\d+)\)/i);
  const maxSelectableColors = packMatch ? parseInt(packMatch[1], 10) : 1;

  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [quantity, setQuantity] = useState(1);

  const [sizeError, setSizeError] = useState(false);

  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  const [isSharePopupOpen1, setIsSharePopupOpen1] = useState(false);

  const [isSharePopupOpen2, setIsSharePopupOpen2] = useState(false);
  const [isSelectedColorHidden, setIsSelectedColorHidden] = useState(false);

  const router = useRouter();

  const categoryName = data.category.name;

  useEffect(() => {
    if (data?.colors?.length === 1) {
      setSelectedColors([data.colors[0].value]);
      setIsSelectedColorHidden(true);
    }
  }, [data?.colors]);

  const handleColorSelection = (colorValue: string) => {
    if (selectedColors.includes(colorValue)) {
      toast.error("Color already selected.");
      return;
    }
    if (selectedColors.length < maxSelectableColors) {
      setSelectedColors([...selectedColors, colorValue]);
    } else {
      toast.error(
        `You can select up to ${maxSelectableColors} colors for this product.`
      );
    }
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();

    if (!userId) {
      return toast.error("Please login to add to cart");
    }

    if (data.name.toLowerCase().includes("pack of")) {
      router.push(`/product/${data.name.replace(/ /g, "-")}`);
      return;
    }

    if (selectedSize === null) {
      toast.error("Please select a size");
      setSizeError(true);
      return;
    }

    try {
      const response = await axios.get("/api/dashboard/cartItems");
      const cartItems = response.data;

      const foundItem = cartItems.find(
        (item: {
          id: string;
          productId: string;
          userId: string;
          sizeName: string;
          color?: { value: string; name: string }[]; // Made color optional
          quantity: number;
        }) =>
          item.productId === data.id &&
          item.userId === userId &&
          item.sizeName === selectedSize.name &&
          item.color &&
          item.color.some((colorObj) => selectedColors.includes(colorObj.value))
      );

      if (!foundItem) {
        const newItem = {
          productId: data.id,
          quantity,
          userId,
          sizeName: selectedSize.name,
          price: selectedSize.price,
          SKUvalue: selectedSize.SKUvalue,
          discountedPrice: selectedSize.discountedprice,
          category: data.category.name,
          color: selectedColors.map((color) => ({
            value: color,
            name: data.colors.find((c) => c.value === color)?.name || color,
          })),
        };

        await axios.post("/api/dashboard/cartItems/single", newItem);
        toast.success("Added to cart");
      } else {
        const cartId = foundItem.id;
        await axios.patch(`/api/dashboard/cartItems/${cartId}`, {
          quantity: foundItem.quantity + quantity,
        });
        toast.success("Item's quantity increased in cart");
      }
    } catch (error) {
      console.error(error);
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

  const sizeSku = selectedSize?.SKUvalue;

  // Extracted PriceDisplay component

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 border-b-2 pb-4">
        {data.subname?.replace("100", "100%") ||
          data.name.replace("100", "100%")}
      </h1>
      <div className="mt-3 flex items-end gap-4 justify-between">
        <div className="font-medium bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4 rounded-lg">
          <div className="text-xl md:text-2xl text-gray-900 flex flex-wrap gap-2 sm:gap-4">
            {data.sizes.map((size, index) => (
              <div key={size.name} className="flex flex-col items-start">
                <span
                  className={`text-sm md:text-base text-black font-semibold border-2 border-gray-500 rounded-md p-2 cursor-pointer ${
                    selectedSize?.name === size.name
                      ? "bg-gray-600 text-white"
                      : "hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size.name}
                </span>
                {sizeError && selectedSize === null && (
                  <span className="text-red-700">Please select a size</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col my-4 sm:my-8 gap-x-4">
            <div className="flex items-center border border-gray-300 rounded-md w-fit p-1 md:p-2">
              <button
                onClick={decrementQuantity}
                className="flex justify-center items-center w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="mx-2 md:mx-4">{quantity}</span>

              <button
                onClick={incrementQuantity}
                className="flex justify-center items-center w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex gap-2 items-center">
            <Button onClick={onAddToCart}>Add to Cart</Button>
            <Button onClick={onAddToWishList}>
              <Heart className="mr-2" /> Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
