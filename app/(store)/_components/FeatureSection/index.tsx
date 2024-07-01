import { Product } from "@/types";
import { FeaturedProductList } from "./FeatureProductList";

interface FeatureSectionProps {
  featuredProducts: Product[];
  userId: string | undefined;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  featuredProducts,
  userId,
}) => {
  return (
    <div className="my-12 place-self-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center leading-tight drop-shadow-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
        Featured <span>Products</span>
      </h1>
      <FeaturedProductList items={featuredProducts} userId={userId} />
    </div>
  );
};

export default FeatureSection;
