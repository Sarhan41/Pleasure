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
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          // @ts-ignore
          <ProductCard key={item.id} data={item} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
