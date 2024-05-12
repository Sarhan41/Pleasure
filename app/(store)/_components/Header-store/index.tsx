import { db } from "@/lib/db";
import Header from "./Header";
import { currentUser } from "@/lib/auth";

export default async function HeaderIndex() {
  const User = await currentUser();

  const userId = User?.id;

  const categories = await db.category.findMany({
    include: {
      products: {
        select: {
          name: true,
        },

        orderBy: {
          name: "asc",
        },
      },
    },
  });

  const AllProducts = await db.product.findMany({});

  return (
    <Header categories={categories} allProducts={AllProducts} UserId={userId} />
  );
}
