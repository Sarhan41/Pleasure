import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import ThreeAccordion from "./components/ThreeAccordion";
import Summary from "../components/SummaryCart";
import CheckoutClientCart from "./components/CheckoutClientCart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SummaryCheckout from "./components/SummaryCheckout";


export const revalidate = 1800; // 30 minutes
// Cache function to get address data
const getAddress = (async (userId: string) => {
  return await db.address.findMany({
    where: {
      userId: userId,
    },
  });
});

// Cache function to get cart items
const getCartProducts = (async (userId: string) => {
  return await db.cartItems.findMany({
    where: {
      userId: userId,
    },
    include: {
      product: true,
      color: true,
    },
  });
});

export default async function CartCheckoutPage() {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return <div>Please log in to access the checkout page.</div>;
  }

  const address = await getAddress(userId);
  const cartProducts = await getCartProducts(userId);

  if (cartProducts.length === 0) {
    return (
      <div className="h-full w-full flex justify-center items-center flex-col gap-6">
        <h1 className="text-2xl font-bold text-center my-6">
          Your cart is empty, Please Add Some Products.
        </h1>
        <Button>
          <Link
            prefetch={true}
            aria-label="Link"
            href={`/cart?reload=${Date.now()}`}
          >
            Go to Cart Page
          </Link>
        </Button>
        <Button>
          <Link
            prefetch={true}
            aria-label="Link"
            className="text-white font-semibold"
            href="/"
          >
            Go to Home
          </Link>
        </Button>
      </div>
    );
  }

  const quantitiesForSummaryAndAccordion = cartProducts.map(
    (item) => item.quantity
  );
  const pricesForSummaryAndAccordion = cartProducts.map((item) =>
    parseFloat(item.discountedPrice ? item.discountedPrice : item.price)
  );

  return (
    <div className="bg-white w-full px-10 flex justify-between max-lg:flex-col max-lg:justify-center -mt-16">
      <div className="flex-[0.75]">
        <Link
          prefetch={true}
          aria-label="Link"
          href="/cart"
          className="text-end w-full flex justify-end"
        >
          <h3 className="w-fit hover:border-b border-black text-primary">
            View Cart
          </h3>
        </Link>
        <ThreeAccordion
          addresses={address}
          user={user}
          prices={pricesForSummaryAndAccordion}
          quantities={quantitiesForSummaryAndAccordion}
          products={cartProducts}
        />
      </div>
      <div className="max-lg:w-full flex justify-center items-start lg:mt-12">
        <div className="w-96">
          <SummaryCheckout
            prices={pricesForSummaryAndAccordion}
            quantities={quantitiesForSummaryAndAccordion}
          />
        </div>
      </div>
    </div>
  );
}
