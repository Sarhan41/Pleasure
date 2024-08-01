import Container from "@/components/Store/container";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import CartItem from "./components/CartItem";
import Summary from "./components/Summary";
import toast from "react-hot-toast";
import ClearIcon from "./components/ClearIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CartPage() {
  const user = await currentUser();
  const UserId = user?.id;

  const CartProducts = await db.cartItems.findMany({
    where: {
      userId: UserId,
    },
    include: {
      product: {
        include: {
          category: true,
          images: { select: { url: true, id: true, productId: true } },
          colors: { select: { name: true, value: true, toLink: true } },
          sizes: {
            select: {
              name: true,
              SKUvalue: true,
              price: true,
              quantity: true,
              discountedprice: true,
              id: true,
            },
          },
        },
      },
    },
  });

  if (!CartProducts || CartProducts.length === 0) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center gap-6 px-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center my-6">
          Your cart is empty. Please add some products.
        </h1>
        <Button className="text-white font-semibold bg-blue-500 hover:bg-blue-600">
          <Link area-label="Link" href="/" className="text-white font-semibold">
            Go to Home
          </Link>
        </Button>
      </div>
    );
  }

  const quantitiesForSummary = CartProducts.map((item) => item.quantity);
  const pricesForSummary = CartProducts.map((item) =>
    parseFloat(item.discountedPrice ? item.discountedPrice : item.price)
  );

  return (
    <div className="bg-white w-full   px-4 sm:px-6 lg:px-10 overflow-x-hidden">
      <Container>
        <div className="bg-white px-4 py-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-2 sm:mb-0">
            Your Cart
          </h1>
          <div className="mt-2 mr-12 sm:mt-0">
            <ClearIcon />
          </div>
        </div>

        <div className="mt-4 mr-8 grid gap-4 grid-cols-1 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <ul className="space-y-4 ">
              {CartProducts.map((item) => (
                <CartItem
                  key={item.id}
                  // @ts-ignore
                  data={item}
                  cartId={item.id}
                />
              ))}
            </ul>
          </div>
          <div className="w-96 ml-4 md:ml-8 lg:col-span-5 mt-4">
            <Summary
              prices={pricesForSummary}
              quantities={quantitiesForSummary}
              userId={UserId}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
