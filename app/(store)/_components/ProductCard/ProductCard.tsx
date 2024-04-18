"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import useCart from "@/hooks/store/use-cart";
import usePreviewModal from "@/hooks/store/use-preview-modal";
import IconButton from "@/components/Store/IconButton";
import Currency from "@/components/Store/Currency";
import { Product as ProductType } from "@/types";

interface ProductCard {
  data: ProductType;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const cart = useCart();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    //@ts-ignore
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    //@ts-ignore
    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white  group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative ">
        <Image
          alt="Image"
          src={data?.images?.[0]?.url}
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5 ">
          <div className="flex gap-x-6 justify-center  ">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description   */}
      <div>
        <p className="font-semibold text-lg">{data?.name}</p>
        <p className="text-sm text-gray-500"> {data.category?.name}</p>
      </div>
      {/* price */}
      <Currency value={data.price} />
    </div>
  );
};

export default ProductCard;