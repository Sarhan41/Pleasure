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
      <div className="h-screen w-screen flex justify-center items-center flex-col gap-6">
        <h1 className="text-2xl font-bold text-center my-6">
          Your cart is empty, Please Add Some Products.
        </h1>
        <Button>
          <Link className="text-white font-semibold" href="/">
            Go to Home
          </Link>
        </Button>
      </div>
    );
  }

  const quantitiesForSummary = CartProducts.map((item) => item.quantity);
  const pricesForSummary = CartProducts.map((item) => parseFloat(item.Price));

  return (
    <div className="bg-white w-full mt-36 px-10">
      <Container>
        <div className="px-8 py-8 mt-6 sm:px-6 lg:px-24 flex justify-between items-center w-full">
          <h1 className="text-4xl font-bold text-black">Your Cart</h1>
          <ClearIcon />
        </div>
        <div className="mt-4 lg:grid gap-4 lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            <ul className="">
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
          <div className="w-96">
            <Summary
              prices={pricesForSummary}
              // products={products}
              quantities={quantitiesForSummary}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
