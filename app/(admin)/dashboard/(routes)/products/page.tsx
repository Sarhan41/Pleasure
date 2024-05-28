import { format } from "date-fns";
import { formatter } from "@/lib/utils";

import { ProductClient } from "./components/client";
import { db } from "@/lib/db";
import { ProductColumn } from "./components/columns";

const ProductsPage = async () => {
  const products = await db.product.findMany({
    include: {
      category: true,
      colors: true,
      sizes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    category: item.category.name,
    price:item.sizes.map((size) => size.price).join(", "),
    size: item.sizes.map((size) => size.name).join(", "),
    colorName: item.colors.map((color) => color.name).join(", "),
    colorHex: item.colors.map((color) => color.value).join(", "),
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  console.log(formattedProducts)

  return (
    <div className="  flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
      <div></div>
    </div>
  );
};

export default ProductsPage;
