import { db } from "@/lib/db";
import Filter from "./components/Filter";
import MobileFilters from "./components/MobileFilter";
import Container from "@/components/Store/container";
import Billboard from "@/app/(store)/_components/Billboard/BIllboard";
import NoResults from "@/components/Store/NoResults";
import ProductCard from "@/app/(store)/_components/ProductCard/ProductCard";

interface CategoryPageProps {
  params: {
    categoryId: string;
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
  const products = await db.product.findMany({
    where: {
      categoryId: params.categoryId,
      colorId: searchParams.colorId,
      sizeId: searchParams.sizeId,
    },
    include: {
      images: { select: { url: true } },
      category: { select: { name: true } },
      color: { select: { name: true, value: true } },
      size: { select: { name: true, value: true } },
    },
  });

  const sizes = await db.size.findMany();
  const colors = await db.color.findMany();
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
    select: {
      imageUrl: true,
      title: true,
    },
  });

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:flex lg:justify-between lg:items-start">
            <div className="hidden lg:block w-1/5">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
            <MobileFilters sizes={sizes} colors={colors} />

            <div className="mt-6 lg:flex-1">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  // @ts-ignore
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
            <div className="lg:hidden w-1/5">
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
