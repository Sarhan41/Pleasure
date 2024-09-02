import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import Header from "./Header";
import { unstable_cache as cache } from "next/cache";

// Define the cache function with concurrent execution
const getHeaderData = cache(async () => {
  // Run both queries concurrently
  const [categories, allProducts] = await Promise.all([
    db.category.findMany({
      include: {
        products: {
          where: {
            isArchived: false,
          },
          select: {
            name: true,
            subname: true,
          },
          orderBy: {
            name: "asc",
          },
        },
      },
    }),
    db.product.findMany({
      select: {
        name: true,
      },
    }),
  ]);

  return { categories, allProducts };
});

// DesktopHeaderIndex component
export default async function DesktopHeaderIndex() {
  const user = await currentUser();
  const userId = user?.id;
  const userName = user?.name;

  // Fetch cached data
  const { categories, allProducts } = await getHeaderData();

  return (
    <Header
      categories={categories}
      allProducts={allProducts}
      UserId={userId}
      UserName={userName}
    />
  );
}
