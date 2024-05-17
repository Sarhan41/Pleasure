import Container from "@/components/Store/container";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import CheckoutClientCart from "./components/CheckoutClientCart";

import Summary from "../components/Summary";
import ThreeAccordion from "./components/ThreeAccordion";

export default async function CartCheckoutPage() {
  const user = await currentUser();
  const isLoggedIn = !!user;

  const UserId = user?.id;

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

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="bg-white mt-36 px-10 flex justify-between max-lg:flex-col">
      <div className="flex-[0.75]">
        <ThreeAccordion isLoggedin={isLoggedIn} user={user} />
      </div>
      <div className="w-96">
        <Summary prices={prices} quantities={quantities} products={products} />
      </div>
      {/* 
      <CheckoutClientCart prices={prices} quantities={quantities} /> */}
    </div>
  );
}
