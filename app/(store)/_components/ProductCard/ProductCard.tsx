"use client";

import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { Expand, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/store/use-preview-modal";
import IconButton from "@/components/Store/IconButton";
import { Product as ProductType } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { calculateDiscountPercentage } from "@/lib/calculateDiscountedPrice";

interface ProductCardProps {
  data: ProductType;
  userId?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ data, userId }) => {
  const [existingItem, setExistingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(data.sizes[0]);
  const previewModal = usePreviewModal();
  const router = useRouter();

  // Div CLick
  const handleClick = () => {
    const productName = data?.name.replace(/\s+/g, "-");
    if (!isModalOpen) {
      router.push(`/product/${productName}`);
    }
  };

  // Preview Modal Open
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data, userId);
  };

  //Add to cart After selecting size from product card
  // @ts-ignore
  const handleSizeSelect = async (size) => {
    setSelectedSize(size);
    setIsModalOpen(false);

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
          item.sizeName === selectedSize?.name
        // &&
        // item.color === selectedColor
      );

      if (selectedSize === null) {
        toast.error("Please select a size");
        return;
      }

      if (!foundItem) {
        await axios.post("/api/dashboard/cartItems", {
          id: data.id,
          quantity: 1,
          userId,
          sizeName: selectedSize?.name,
          price: selectedSize?.price,
          SKUvalue: selectedSize?.SKUvalue,
          discountedPrice: selectedSize?.discountedprice,
          category: data.category?.name,
          // color: selectedColor,
        });
        toast.success("Added to cart");
      } else {
        const cartId = foundItem.id;
        await axios.patch(`/api/dashboard/cartItems/${cartId}`, {
          quantity: foundItem.quantity + 1,
        });
        toast.success("Item's quantity increased in cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding to cart");
    } finally {
      setIsModalOpen(false);
    }
  };

  //Add to wishlist
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
        await axios.post("/api/dashboard/wishlist", {
          productId: data.id,
          userId,
        });
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding to wishlist");
    }
  };

  // Hover effect on image setting
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  const discountedPercentage = calculateDiscountPercentage(
    data.sizes[0].price,
    data.sizes[0].discountedprice
  );

  return (
    // Parent Div
    <div className="relative overflow-hidden bg-white h-auto w-[260px] sm:w-[320px] group cursor-pointer rounded-2xl border border-gray-200 shadow-md p-3 space-y-2 transition-transform transform hover:scale-105">
      {/* // Image Div and Three Icon and Discount Div */}
      <div
        className="h-[280px] sm:h-[320px] w-full rounded-lg bg-gray-100 relative overflow-hidden"
        onClick={handleClick}
      >
        {parseFloat(discountedPercentage) > 0 && (
          <div
            className={`absolute top-2 right-2 z-20 text-white text-xs font-semibold px-2 py-1 rounded-lg ${
              parseFloat(discountedPercentage) < 45
                ? "bg-primary"
                : parseFloat(discountedPercentage) > 50
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {discountedPercentage}% OFF
          </div>
        )}

        <Image
          alt=""
          src={`${
            hovered && data?.images[1]?.url
              ? data?.images[1]?.url
              : data?.images[0]?.url
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          fill
          className="object-cover rounded-lg transition-transform transform group-hover:scale-105"
        />
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute w-full px-4 bottom-4">
          <div className="flex gap-4 justify-center">
            <button
              onClick={onPreview}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
            >
              <Expand size={20} className="text-gray-600" />
            </button>
            <button
              onClick={onAddToWishList}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
            >
              <Heart size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      {/* // Product Name and Category Div */}
      <div
        className="flex flex-col items-start space-y-1"
        onClick={handleClick}
      >
        <p className="font-semibold text-xs sm:text-xs text-gray-600">
          {data.name.includes("100")
            ? `${data.name.split("100")[0]}100%${data.name.split("100")[1]}`
            : data.name}
        </p>
        <p className="text-xs text-gray-500">{data.category?.name}</p>
      </div>
      {/* // Price and Add to Cart Div */}
      <div className="flex justify-between items-center w-full mt-auto">
        <div
          className="font-semibold text-sm text-gray-900"
          onClick={handleClick}
        >
          ₹
          {selectedSize.discountedprice ? (
            <>
              {selectedSize.discountedprice}
              <span className="line-through ml-2 text-gray-500 text-xs">
                {selectedSize.price}
              </span>
            </>
          ) : (
            selectedSize.price
          )}
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="   rounded-full bg-blue-600 transition hover:bg-primary "
        >
          Add To Cart
        </Button>
      </div>
      {/* // Modal for Size Selection */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-end transition-opacity duration-300">
          <div className="bg-white rounded-t-lg p-4 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Select a Size</h2>
            <div className="flex justify-around">
              {data.sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => handleSizeSelect(size)}
                  className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${
                    selectedSize.name === size.name
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
