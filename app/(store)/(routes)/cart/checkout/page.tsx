import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import ThreeAccordion from "./components/ThreeAccordion";
import Summary from "../components/Summary";
import CheckoutClientCart from "./components/CheckoutClientCart";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CartCheckoutPage() {
  const user = await currentUser();
  const UserId = user?.id;

  const Address = await db.address.findMany({
    where: {
      userId: UserId,
    },
  });

  const CartProducts = await db.cartItems.findMany({
    where: {
      userId: UserId,
    },
    include: {
      product: true,
    },
  });

  const quantitiesForSummaryAndAccordion = CartProducts.map(
    (item) => item.quantity
  );
  const pricesForSummaryAndAccordion = CartProducts.map((item) =>
    parseFloat(item.price)
  );

  if (CartProducts.length === 0) {
    return (
      <div className="h-full w-full flex justify-center items-center flex-col gap-6">
        <h1 className="text-2xl font-bold text-center my-6">
          Your cart is empty, Please Add Some Products.
        </h1>
        <Button>
          <Link href={`/cart?reload=${Date.now()}`}>Go to Cart Page</Link>
        </Button>
        <Button>
          <Link className="text-white font-semibold" href="/">
            Go to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white w-full  px-10 flex justify-between max-lg:flex-col max-lg:justify-center">
      <div className="flex-[0.75]">
        <Link
          href="/cart"
          className="text-end w-full flex justify-end
        "
        >
          <h3 className="w-fit hover:border-b border-black text-primary">
            View Cart
          </h3>
        </Link>
        <ThreeAccordion
          addresses={Address}
          user={user}
          prices={pricesForSummaryAndAccordion}
          quantities={quantitiesForSummaryAndAccordion}
          products={CartProducts}
        />
      </div>
      <div className="max-lg:w-full flex justify-center items-center">
        <div className="w-96 ">
          <Summary
            prices={pricesForSummaryAndAccordion}
            quantities={quantitiesForSummaryAndAccordion}
          />
        </div>
      </div>
    </div>
  );
}
