"use client";

import { LoginButton } from "@/components/Auth/AuthUi/LoginButton";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/store/use-cart";
import axios from "axios";
import { set } from "date-fns";
import { Heart, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NavbarActionsProps {
  userId: string | undefined;
}

const NavbarActions = ({ userId }: NavbarActionsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [wishlength, setWishLength] = useState(0);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchWishListLength = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `/api/dashboard/wishlist?reload=${Date.now()}`
        );
        setResponse(response.data); 
        setWishLength(response.data.length);
      } catch (error) {
        console.error("Error fetching wishlist length:", error);
      }
    };

    fetchWishListLength();
  }, [userId, response]); 

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-2 py-2"
      >
        <ShoppingBag className="h-6 w-6 max-sm:h-4 max-sm:w-4" color="white" />
        <span className="ml-2 text-sm font-medium text-white ">
          {cart.items.length}
        </span>
      </Button>

      <Button
        onClick={() => router.push(`/wishlist?reload=${Date.now()}`)}
        className="flex items-center rounded-full bg-black px-2 py-2"
      >
        <Heart className="h-6 w-6 max-sm:h-4 max-sm:w-4" color="white" />
        <span className="ml-2 text-sm font-medium text-white ">
          {wishlength}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
