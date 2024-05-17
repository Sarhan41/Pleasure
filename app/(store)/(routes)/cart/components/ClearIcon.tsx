"use client";

import { db } from "@/lib/db";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ClearIcon = () => {
  const router = useRouter();

  const onClick = async () => {
    try {
      await axios.delete("/api/dashboard/cartItems");
      toast.success("Cart cleared successfully!");
      router.refresh(); // Refresh the page or navigate as needed
      router.push(`/cart?reload=${Date.now()}`);
    } catch (error) {
      toast.error("Failed to clear the cart. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center p-3 cursor-pointer gap-3 border-2 border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-200"
      onClick={onClick}
    >
      <Trash2Icon className="h-5 w-5" />
      <h3 className="text-lg font-semibold">Clear Cart</h3>
    </div>
  );
};

export default ClearIcon;
