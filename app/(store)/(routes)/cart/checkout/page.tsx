import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import ThreeAccordion from "./components/ThreeAccordion";
import Summary from "../components/Summary";
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
      product: {
        include: {
          images: { select: { url: true } },
          category: { select: { name: true } },
          colors: { select: { name: true, value: true } },
          sizes: { select: { name: true, value: true } },
        },
      },
    },
  });


  const prices = CartProducts.map((item) => item.price);
  const products = CartProducts.map((item) => item);
  const quantities = CartProducts.map((item) => item.quantity);

 
  if (products.length === 0) {
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
    <div className="bg-white  px-10 flex justify-between max-lg:flex-col">
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
          prices={prices}
          quantities={quantities}
          products={products}
        />
      </div>
      <div className="w-96">
        <Summary prices={prices} quantities={quantities} products={products} />
      </div>
    </div>
  );
}
