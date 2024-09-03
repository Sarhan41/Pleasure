import ProductList from "@/app/(store)/_components/ProductList/ProductList";
import { db } from "@/lib/db";
import { unstable_cache as cache } from "next/cache";


export const revalidate = 1800; // 30 minutes

// Define cache function
const getNewArrivalProducts = cache(async () => {
  return await db.product.findMany({
    where: {
      isNew: true,
    },
    include: {
      images: true,
      category: {
        select: {
          name: true,
        },
      },
      sizes: true,
      colors: true,
    },
  });
});

const NewArrivalPage = async () => {
  // Fetch the new arrival products using the cache function
  const products = await getNewArrivalProducts();

  return (
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 w-full">
      <ProductList title="New Arrivals" items={products} />
    </div>
  );
};

export default NewArrivalPage;
