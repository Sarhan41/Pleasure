import ProductList from "@/app/(store)/_components/ProductList/ProductList";
import { db } from "@/lib/db";

const NewArrivalPage = async () => {
  // Fetch the featured products
  const products = await db.product.findMany({
    where: {
      isFeatured: true,
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
  return (
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 w-full">
      <ProductList title="Featured Products" items={products} />
    </div>
  );
};

export default NewArrivalPage;
