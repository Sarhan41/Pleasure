import Container from "@/components/Store/container";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import CartItem from "./components/CartItem";
import Summary from "./components/Summary";

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

  // Extract prices and quantities from CartProducts
  const prices = CartProducts.map((item) => item.price);
  const products = CartProducts.map((item) => item);

  const quantities = CartProducts.map((item) => item.quantity);

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8 ">
          <h1 className="text-3xl font-bold text-black">Your Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {CartProducts.length === 0 && (
                <p className="text-neutral-500">No items added to Cart</p>
              )}
              <ul>
                {CartProducts.map((item) => (
                  <CartItem
                    key={item.id}
                    quantity={item.quantity}
                  // @ts-ignore

                    data={item.product}
                    size={item.size}
                    cartId={item.id}
                  />
                ))}
              </ul>
            </div>
            <Summary prices={prices} products={products} quantities={quantities} />
          </div>
        </div>
      </Container>
    </div>
  );
}
