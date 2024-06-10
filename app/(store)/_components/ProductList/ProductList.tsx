import { Product } from "@prisma/client";
import NoResults from "@/components/Store/NoResults";
import ProductCard from "../ProductCard/ProductCard";
import { currentUser } from "@/lib/auth";

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = async ({ title, items }) => {
  const User = await currentUser();

  let userId = "";

  if (User) {
    userId = User.id ?? "";
  }

  return (
    <div className="space-y-4 px-4 w-full">
      <h3 className="font-bold text-3xl text-gray-900">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="flex flex-wrap gap-4 justify-center  w-full">
        {items.map((item) => (
          // @ts-ignore
          <ProductCard key={item.id} data={item} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
