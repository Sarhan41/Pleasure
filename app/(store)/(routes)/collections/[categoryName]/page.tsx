import { db } from "@/lib/db";
import Filter from "./components/Filter";
import MobileFilters from "./components/MobileFilter";
import Container from "@/components/Store/container";
import NoResults from "@/components/Store/NoResults";
import ProductCard from "@/app/(store)/_components/ProductCard/ProductCard";
import GetProducts from "@/actions/Store/GetProducts";
import { currentUser } from "@/lib/auth";
import Billboard from "@/app/(store)/_components/Billboards/index";

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const categoryName = params.categoryName.replace(/-/g, " ");

  const user = await currentUser();
  const userId = user?.id;

  const category = await db.category.findFirst({
    where: {
      name: categoryName,
    },
    select: {
      id: true,
      imageUrl: true,
      title: true,
    },
  });

  let products = await db.product.findMany({
    where: {
      categoryId: category?.id,
    },
    include: {
      sizes: true,
      colors: true,
      images: true,
    },
  });

  const colorForMatch = searchParams.colorId;
  const sizeForMatch = searchParams.sizeId;

  // Filter products by color
  const filteredProductsByColor = products.filter((product) => {
    if (!colorForMatch) return true;
    if (colorForMatch) {
      const productFirstColor =
        product.colors.length > 0 ? product.colors[0].name : null;
      if (!productFirstColor) return false;
      return colorForMatch.includes(productFirstColor);
    }
  });

  // Filter products by size based on filteredProductsByColor
  const finalProducts = filteredProductsByColor.filter((product) => {
    if (!sizeForMatch) return true;
    if (sizeForMatch) {
      const productSizes =
        product.sizes.length > 0
          ? product.sizes.map((size) => size.name).join(",") // Join sizes into a string
          : null;
      if (!productSizes) return false; // If product has no size, discard it

      // Check if any of the sizes in the product are included in the sizeForMatch array
      const productSizesArray = productSizes.split(","); // Convert product sizes string to an array
      const matches = productSizesArray.some((size) =>
        sizeForMatch.includes(size.trim())
      );

      return matches;
    }
  });

  const sizes = products
    .flatMap((item) => item.sizes)
    .filter(
      (item, index, self) =>
        self.findIndex((t) => t.name === item.name) === index
    );

  const colors = products
    .flatMap((item) => item.colors)
    .filter(
      (item, index, self) =>
        self.findIndex((t) => t.value === item.value) === index
    );

  return (
    <div className="bg-white">
      <Container>
        {
        
        category && <Billboard data={{ imageUrl: category?.imageUrl ?? '' }} />
        }
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:flex lg:justify-between lg:items-start">
            <div className="hidden lg:block w-1/5">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <MobileFilters sizes={sizes} colors={colors} />

            <div className="mt-6 lg:flex-1">
              {finalProducts.length === 0 && <NoResults />}
              <div className="flex flex-wrap gap-4">
                {finalProducts.map((item) => (
                  // @ts-ignore
                  <ProductCard key={item.id} data={item} userId={userId} />
                ))}
              </div>
            </div>
            <div className="lg:hidden w-1/5"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
