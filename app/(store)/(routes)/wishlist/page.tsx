import Container from "@/components/Store/container";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import WishListItem from "./componenets/wishlistItem";

export default async function WishPage() {
  const user = await currentUser();
  const UserId = user?.id;

  const wishlistProducts = await db.wishlist.findMany({
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



  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8 ">
          <h1 className="text-3xl font-bold text-black">Your WishList</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {wishlistProducts.length === 0 && (
                <p className="text-neutral-500">No items added to WishList</p>
              )}
              <ul>
                {wishlistProducts.map((item) => (
                  // @ts-ignore
                  <WishListItem key={item.id} data={item.product} wishlistId={item.id} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
