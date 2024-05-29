"use client";

import axios from "axios";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const ClearIcon = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      await axios.delete("/api/dashboard/cartItems");
      toast.success("Cart cleared successfully!");
      router.refresh();
      router.push(`/cart?reload=${Date.now()}`);
      setLoading(false);
    } catch (error) {
      console.error("[CLEAR_CART]", error);
      toast.error("Failed to clear the cart. Please try again.");
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
      <div
        className="flex items-center justify-center p-3 cursor-pointer gap-3 border-2 border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-200"
        onClick={onClick}
      >
        <Trash2Icon className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Clear Cart</h3>
      </div>
    </>
  );
};

export default ClearIcon;
