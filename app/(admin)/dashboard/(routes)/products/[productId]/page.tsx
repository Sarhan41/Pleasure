import { db } from "@/lib/db";
import { ProductForm } from "./components/ProductForm";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
      colors: true,
    },
  });

  const categories = await db.category.findMany({});
  const sizes = await db.size.findMany({});

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          
        />
      </div>
    </div>
  );
};

export default ProductPage;
