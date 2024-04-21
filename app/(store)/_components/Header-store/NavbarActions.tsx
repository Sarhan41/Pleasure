import { LoginButton } from "@/components/Auth/AuthUi/LoginButton";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { set } from "date-fns";
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
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-2 py-2"
      >
        <ShoppingBag className="h-6 w-6 max-sm:h-4 max-sm:w-4" color="white" />
        <span className="ml-2 text-sm font-medium text-white ">
          {cartlength}
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
