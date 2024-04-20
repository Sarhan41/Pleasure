import { db } from "@/lib/db";
import Header from "./Header";
import { currentUser } from "@/lib/auth";

export default async function HeaderIndex() {
  const User = await currentUser();

  const userId = User?.id;

  const categories = await db.category.findMany({});

  const AllProducts = await db.product.findMany({});

  const WishListProducts = await db.wishlist.findMany({
    where: {
      userId: userId,
    },
  });

  const WishListProductLength = WishListProducts.length;

  return <Header categories={categories} allProducts={AllProducts} wishlength = {WishListProductLength} UserId={userId}/>;
}
