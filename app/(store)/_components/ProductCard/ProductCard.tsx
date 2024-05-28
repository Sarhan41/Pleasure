"use client";

import Image from "next/image";
import { MouseEventHandler, useState, useEffect } from "react";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import usePreviewModal from "@/hooks/store/use-preview-modal";
import IconButton from "@/components/Store/IconButton";
import Currency from "@/components/Store/Currency";
import { Product as ProductType } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import { Size } from "@prisma/client";

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

  const handleClick = () => {
    const productName = data?.name.replace(/\s+/g, "-");
    router.push(`/product/${productName}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data, userId);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };
  // @ts-ignore
  const handleSizeSelect = async (size) => {
    setSelectedSize(size);
    setIsModalOpen(false);

    try {
      const response = await axios.get("/api/dashboard/cartItems");
      const cartItems = response.data;
      const foundItem = cartItems.find(
        (item: { productId: string; sizeId: string; userId: string }) =>
          item.productId === data.id &&
          item.sizeId === size.id &&
          item.userId === userId
      );

      if (!userId) {
        return toast.error("Please login to add to cart");
      }

      if (!foundItem) {
        await axios.post("/api/dashboard/cartItems", {
          productId: data.id,
          sizeId: size.id,
          userId,
        });
        toast.success("Added to cart");
      } else {
        setExistingItem(foundItem);
        const cartId = foundItem.id; // Update existingItem state
        await axios.patch(`/api/dashboard/cartItems/${cartId}`, {
          quantity: foundItem.quantity + 1, // Increase quantity by 1
        });
        toast.success("Item's quantity increased in cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding to cart");
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

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="relative bg-white h-[813px] w-fit group cursor-pointer rounded-xl border-2 border-primary p-3 space-y-4"
      >
        <div className="h-[600px] w-[400px] rounded-xl bg-gray-100 relative">
          <Image
            alt="Image"
            src={`${
              hovered && data?.images[1]?.url
                ? data?.images[1]?.url
                : data?.images[0]?.url
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            fill
            className="aspect-square object-cover rounded-md"
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              <IconButton
                onClick={onPreview}
                icon={<Expand size={20} className="text-gray-600" />}
              />
              <IconButton
                onClick={onAddToCart}
                icon={<ShoppingCart size={20} className="text-gray-600" />}
              />
              <IconButton
                onClick={onAddToWishList}
                icon={<Heart size={20} className="text-gray-600" />}
              />
            </div>
          </div>
        </div>
        <div className="w-[300px] flex flex-wrap flex-col ">
          <p className="font-semibold text-base flex-wrap flex">
            {data.name.includes("100")
              ? `${data.name.split("100")[0]}100%${data.name.split("100")[1]}`
              : data.name}
          </p>
          <p className="text-sm text-gray-500"> {data.category?.name}</p>
        </div>
        <Currency value={selectedSize.price} />
        {isModalOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-end transition-opacity duration-300">
            <div className="bg-white rounded-t-lg p-4 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Select a Size</h2>
              <div className="flex justify-around">
                {data.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => handleSizeSelect(size)}
                    className={`rounded-full h-12 w-12 flex items-center justify-center border-2 ${
                      selectedSize.name === size.name
                        ? "border-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 w-full bg-primary text-white py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
