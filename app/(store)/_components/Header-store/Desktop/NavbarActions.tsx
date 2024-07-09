import { LoginButton } from "@/components/Auth/AuthUi/LoginButton";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Heart, ShoppingBag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NavbarActionsProps {
  userId: string | undefined;
}

const NavbarActions = ({ userId }: NavbarActionsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [wishlength, setWishLength] = useState(0);
  const [cartlength, setCartLength] = useState(0);
  const [responseCart, setResponseCart] = useState(null);
  const [responseWish, setResponseWish] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchLength = async () => {
      if (!userId) return;

      try {
        // Fetch wishlist length
        const responseWish = await axios.get(
          `/api/dashboard/wishlist?reload=${Date.now()}`
        );
        setResponseWish(responseWish.data);
        setWishLength(responseWish.data.length);

        // Fetch cart length
        const responseCart = await axios.get(
          `/api/dashboard/cartItems?reload=${Date.now()}`
        );
        setResponseCart(responseCart.data);
        setCartLength(responseCart.data.length);
      } catch (error) {
        console.error("Error fetching wishlist length:", error);
      }
    };

    const intervalId = setInterval(fetchLength, 5000); // Run every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [userId, pathname]);

  if (!isMounted) return null;

  return (
    <div className="flex items-center gap-x-4">
      <Button
        onClick={() => router.push(`/cart?reload=${Date.now()}`)}
        className="flex items-center rounded-full px-2 py-2 lg:bg-black lg:text-white bg-transparent text-black"
      >
        <ShoppingBag className="lg:h-5 lg:w-5 h-6 w-6" />
        <span className="ml-2 text-xs font-medium lg:text-white text-black">
          {cartlength}
        </span>
      </Button>

      <Button
        onClick={() => router.push(`/wishlist?reload=${Date.now()}`)}
        className=" items-center rounded-full px-2 py-2 hidden lg:flex lg:bg-black lg:text-white bg-transparent text-black"
      >
        <Heart className="lg:h-5 lg:w-5 h-6 w-6" />
        <span className="ml-2 text-xs font-medium lg:text-white text-black">
          {wishlength}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
