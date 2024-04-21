import { format } from "date-fns";
import { formatter } from "@/lib/utils";

import { ProductClient } from "./components/client";
import { db } from "@/lib/db";
import { ProductColumn } from "./components/columns";

const ProcutsPage = async () => {
  const products = await db.product.findMany({
    include: {
      category: true,
      size: true,
      color: true,
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
    price: item.price,
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <div className="  flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
      <div></div>
    </div>
  );
};

export default ProcutsPage;
