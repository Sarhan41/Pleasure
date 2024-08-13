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
  ShoppingCartIcon,
} from "lucide-react";
import IconButton from "@/components/Store/IconButton";
import { FaWhatsapp } from "react-icons/fa";
import SizeChart from "../SizeChart";
import { Product as ProductType } from "@/types";
import Description from "../ExtraDetails/Description";
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

  const router = useRouter();

  const categoryName = data.category.name;

  const handleColorSelection = (colorValue: string) => {
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
    if (selectedSize === null || 0) {
      toast.error("Please select a size");
      setSizeError(true);
      return;
    }
    if (
      data.colors.some((color) => color.value !== "#111") &&
      (selectedColors.length === 0 ||
        selectedColors.length < maxSelectableColors)
    ) {
      toast.error(`Please select ${maxSelectableColors} colors`);
      return;
    }

    try {
      await axios.post("/api/dashboard/cartItems/pack", {
        productId: data.id,
        quantity,
        userId,
        sizeName: selectedSize.name,
        price: selectedSize.price,
        SKUvalue: selectedSize.SKUvalue,
        discountedPrice: selectedSize.discountedprice,
        category: data.category.name,
        colors: Array.isArray(selectedColors)
          ? selectedColors.map((color) => ({
              value: color,
              name: data.colors.find((c) => c.value === color)?.name || color,
            }))
          : [],
      });
      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Error adding to cart");
    }
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

  const handleSizeSelection = (size: Size) => {
    setSelectedSize(size);
    if (selectedSize === size) setSelectedSize(null);
    setSizeError(false);
  };

  const sizeSku = selectedSize?.SKUvalue;

  // Extracted PriceDisplay component

  return (
    <div>
      {/* =============================================
            Div For Closing Share Popup
          =============================================
      */}
      Info Pack
      {(isSharePopupOpen1 || isSharePopupOpen2) && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
          onClick={() => {
            setIsSharePopupOpen1(false);
            setIsSharePopupOpen2(false);
          }}
        />
      )}
      {/* =============================================
        Name Of The Product
         ==============================================
      */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 border-b-2 pb-4">
        {data.subname && data.subname.length > 0
          ? data.subname.includes("100")
            ? data.subname.replace("100", "100%")
            : data.subname
          : data.name.includes("100")
          ? data.name.replace("100", "100%")
          : data.name}
      </h1>
      {/* =============================================
           Div For Price And SKU
          =============================================
      */}
      <div className="mt-3 flex items-end gap-4 justify-between">
        {/* =============================================
            Price
          =============================================
      */}
        <div className="font-medium bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4 rounded-lg">
          <div className="text-xl md:text-2xl text-gray-900 flex items-center">
            {!selectedSize ? (
              data.sizes[0].discountedprice ? (
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="flex items-center">
                    <MotionSpan
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-gray-500 text-sm md:text-lg line-through mr-2"
                    >
                      ₹{data.sizes[0].price}
                    </MotionSpan>
                    <MotionSpan
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="text-black ml-1 text-xl md:text-3xl"
                    >
                      ₹{data.sizes[0].discountedprice}
                    </MotionSpan>
                  </div>
                  <div className="flex items-center md:ml-2 md:mt-0 mt-2">
                    <MotionSpan
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                      className="md:ml-2 text-sm md:text-lg text-pink-700"
                    >
                      (
                      {calculateDiscountPercentage(
                        data.sizes[0].price,
                        data.sizes[0].discountedprice
                      )}
                      % OFF)
                    </MotionSpan>
                    {data.name.toLowerCase().includes("pack of") && (
                      <MotionSpan
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                        className="ml-2 text-xs md:text-sm text-gray-600 uppercase"
                      >
                        {data.name.match(/pack of \d+/i)}
                      </MotionSpan>
                    )}
                  </div>
                </div>
              ) : (
                <MotionSpan
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-gray-500 text-sm md:text-lg line-through mr-2"
                >
                  ₹{data.sizes[0].price}
                </MotionSpan>
              )
            ) : data.sizes[0].discountedprice ? (
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex items-center">
                  <MotionSpan
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-500 text-sm md:text-lg line-through mr-2"
                  >
                    ₹{selectedSize.price}
                  </MotionSpan>
                  <MotionSpan
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-black ml-1 text-xl md:text-3xl"
                  >
                    ₹{selectedSize.discountedprice}
                  </MotionSpan>
                </div>
                <div className="flex items-center md:ml-2 md:mt-0 mt-2">
                  <MotionSpan
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="md:ml-2 text-sm md:text-lg text-pink-700"
                  >
                    (
                    {calculateDiscountPercentage(
                      selectedSize.price,
                      selectedSize.discountedprice
                    )}
                    % OFF)
                  </MotionSpan>
                  {data.name.toLowerCase().includes("pack of") && (
                    <MotionSpan
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                      className="ml-2 text-xs md:text-sm text-gray-600 uppercase"
                    >
                      {data.name.match(/pack of \d+/i)}
                    </MotionSpan>
                  )}
                </div>
              </div>
            ) : (
              <MotionSpan
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-gray-500 text-sm md:text-lg line-through mr-2"
              >
                ₹{selectedSize.price}
              </MotionSpan>
            )}
          </div>
        </div>

        {/* =================================================================
            SKUValue
            =================================================================
         */}
      </div>
      <div className="flex flex-col my-4 gap-y-4">
        {/* =============================================
             Div For Available Sizes
             =============================================

        */}

        <div className="flex gap-4 flex-col">
          <h3 className="font-semibold text-base md:text-lg text-black">
            {" "}
            Available sizes:
          </h3>

          <div className="flex gap-4">
            {data?.sizes
              ?.sort((a, b) =>
                Number(a.quantity) === 0 ? 1 : Number(b.quantity) === 0 ? -1 : 0
              )
              .map((size) => (
                <div key={size.name} className="flex flex-col relative">
                  <span
                    key={size.name}
                    className={`text-xs md:text-base text-black ${
                      selectedSize !== size && "hover:bg-primary"
                    } hover:text-white hover:cursor-pointer font-semibold border-2 border-gray-500 rounded-md p-1 md:p-2 ${
                      selectedSize === size ? "bg-gray-600 text-white" : ""
                    } ${sizeError && "border-red-700"} ${
                      Number(size.quantity) === 0
                        ? "border-gray-400 text-gray-400 cursor-not-allowed relative"
                        : ""
                    }`}
                    onClick={() =>
                      Number(size.quantity) > 0 && handleSizeSelection(size)
                    }
                  >
                    {size.name}
                  </span>
                  {Number(size.quantity) === 0 && (
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                      <svg
                        className="absolute w-full h-full text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    </div>
                  )}
                  {selectedSize === size && Number(size.quantity) > 0 && (
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

        {/*   =============================================
              Div For Size Chart
              ============================================= 
        
        */}

        <div>
          <h3
            onClick={handleSizeChartOpen}
            className="font-semibold text-sm md:text-base text-primary cursor-pointer w-fit hover:underline"
          >
            Size Chart
          </h3>
          <Dialog open={isSizeChartOpen} onOpenChange={handleSizeChartClose}>
            <DialogOverlay className="absolute inset-0 flex items-center min-h-screen min-w-screen justify-center bg-black opacity-50">
              <DialogContent className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
                <SizeChart categoryName={categoryName} />
                <DialogClose asChild>
                  <button className="absolute top-4 right-4">
                    <Cross2Icon className="h-4 w-4" />
                  </button>
                </DialogClose>
              </DialogContent>
            </DialogOverlay>
          </Dialog>
        </div>

        {/* =============================================
            Div For Quantity 
            =============================================

        */}

        <div className="flex flex-col gap-x-4">
          <h3 className="font-semibold text-base md:text-lg text-black">
            Qty:
          </h3>

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

        {/* Colors */}
        <div className="mt-6 flex flex-col gap-y-4">
          {data?.colors?.some((color) => color.value !== "#111") && (
            <h3 className="font-semibold text-base md:text-lg text-black">
              Colors:
            </h3>
          )}
          <div className="flex flex-row gap-x-4 mt-2">
            {data?.colors?.map((color) => {
              const handleClick = () => {
                if (color.toLink) {
                  const productName = color.toLink?.replace(/ /g, "-");
                  window.open(`/product/${productName}`, "_blank");
                }
                handleColorSelection(color.value);
              };
              if (color.value !== "#111") {
                return (
                  <div key={color.name} onClick={handleClick}>
                    <div
                      className="h-6 w-6 md:h-8 md:w-8 rounded-full border border-gray-900 relative"
                      style={{ backgroundColor: color.value }}
                    >
                      {selectedColors.includes(color.value) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Colors Name if Visible */}

        {data?.isColorNameVisible && (
          <div className=" flex flex-col -mt-8 gap-y-4">
            <h3 className="font-semibold text-base md:text-lg text-black">
              Colors:
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.colorNames
                .filter((color) => color.name.toLowerCase() !== "none") // Filter out "none"
                .map((color, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 border rounded-lg text-sm font-medium"
                    // style={{ borderColor: color.value, color: color.value }} // Assuming color has a hex property
                  >
                    {color.name}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Selected Colors */}
        {selectedColors.length > 0 && (
          <div className="mt-4 flex flex-col gap-y-4">
            <h3 className="font-semibold text-base md:text-lg text-black">
              Selected Colors:
            </h3>

            <div className="flex flex-row gap-x-2 flex-wrap mt-2">
              {selectedColors.map((color, index) => (
                <div key={index} className="relative">
                  <div
                    className="h-6 w-6 md:h-8 md:w-8 rounded-full border border-gray-900"
                    style={{ backgroundColor: color }}
                  />

                  <span
                    onClick={() => {
                      const newSelectedColors = [...selectedColors];
                      newSelectedColors.splice(index, 1);
                      setSelectedColors(newSelectedColors);
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full cursor-pointer text-xs md:text-sm"
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* =============================================
          Div For Add To Cart And Add To Wishlist and Share 1
          =============================================
       */}
      <div className="flex items-center mt-6 gap-x-3 relative">
        <div className="border-primary border-2 rounded-full">
          <IconButton
            onClick={handleShareButtonClick1}
            icon={<Share2Icon size={20} className="text-gray-600" />}
          />
        </div>
        {isSharePopupOpen1 && (
          <div className="absolute bg-white border border-gray-300 rounded-md p-2 mt-2 bottom-12 shadow-lg z-50">
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
              <Link area-label="Link" size={20} className="text-gray-600" />
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
            className="flex items-center gap-x-2 w-40 md:w-60"
          >
            Add To Cart
          </Button>
        </div>
      </div>
      {/* =============================================
           Div For Description
         =============================================
      */}
      <div className="mt-8">
        <MainExtraDetails
          description={data.description}
          additionalInfo={data.additionalInfo}
          SKU={sizeSku}
        />
      </div>
      {/* 
          // ! Reviews Divs Will Be Added Here
*/}
      {/* =============================================
          Div For Add To Cart And Add To Wishlist and Share 2
          =============================================
      */}
      <div className="mt-10 flex items-center gap-x-6  py-7shadow-2xl shadow-gray-600 w-full justify-center relative">
        <div className="border-primary border-2 rounded-full">
          <IconButton
            onClick={handleShareButtonClick2}
            icon={<Share2Icon size={20} className="text-gray-600" />}
          />
        </div>
        {isSharePopupOpen2 && (
          <div className="absolute bg-white border border-gray-300 rounded-md bottom-12 p-2 mt-2 shadow-lg z-50">
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
              <Link area-label="Link" size={20} className="text-gray-600" />
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
        <div className="border-primary border-2 rounded-full">
          <IconButton
            onClick={onAddToCart}
            icon={<ShoppingCartIcon size={20} className="text-gray-600" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
