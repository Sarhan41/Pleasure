import Container from "@/components/Store/container";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import CartItem from "./components/CartItem";
import Summary from "./components/Summary";
import toast from "react-hot-toast";
import ClearIcon from "./components/ClearIcon";

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

  return (
    <div className="bg-white w-full mt-36 px-10">
      <Container>
        <div className="px-8 py-8 mt-6 sm:px-6 lg:px-24 flex justify-between items-center w-full">
          <h1 className="text-4xl font-bold text-black">Your Cart</h1>
          <ClearIcon />
        </div>
        <div className="mt-4 lg:grid gap-4 lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            {CartProducts.length === 0 && (
              <>
                <div className="relative flex py-4 border rounded-lg my-4 justify-between items-center border-primary flex-1 px-4">
                  <p className="text-neutral-500">No items added to Cart</p>
                </div>
                <div></div>
              </>
            )}
            <ul className="">
              {CartProducts.map((item) => (
                <CartItem
                  key={item.id}
                  quantity={item.quantity}
                  price={item.price}
                  // @ts-ignore
                  data={item.product}
                  size={item.size}
                  cartId={item.id}
                />
              ))}
            </ul>
          </div>
          <Summary
            prices={prices}
            products={products}
            quantities={quantities}
          />
        </div>
      </Container>
    </div>
  );
}
