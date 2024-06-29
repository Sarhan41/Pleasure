import { Product } from "@/types";
import NoResults from "@/components/Store/NoResults";
import { currentUser } from "@/lib/auth";
import FeaturedProductCard from "../FeatureProductCard";

interface FeaturedProductListProps {
  items: Product[];
}

const FeaturedProductList: React.FC<FeaturedProductListProps> = async ({ items }) => {
  const user = await currentUser();

  return items.length === 0 ? (
    <NoResults />
  ) : (
    <div className="p-3 space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <FeaturedProductCard key={item.id} data={item} userId={user?.id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductList;
