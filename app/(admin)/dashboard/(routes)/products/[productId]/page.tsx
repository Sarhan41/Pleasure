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
      sizes: true,
    },
  });

  const products = await db.product.findMany({});

  const categories = await db.category.findMany({});

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <ProductForm
          initialData={product}
          categories={categories}
          products={products}
        />
      </div>
    </div>
  );
};

export default ProductPage;
