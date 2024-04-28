import { db } from "@/lib/db";
import Filter from "./components/Filter";
import MobileFilters from "./components/MobileFilter";
import Container from "@/components/Store/container";
import Billboard from "@/app/(store)/_components/Billboard/BIllboard";
import NoResults from "@/components/Store/NoResults";
import ProductCard from "@/app/(store)/_components/ProductCard/ProductCard";
import GetProducts from "@/actions/Store/GetProducts";

interface CategoryPageProps {
  params: {
    categoryName: string;
    colorName: string;
    sizeName: string;
  };
  searchParams: {
    colorName: string;
    sizeName: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const category = await db.category.findFirst({
    where: {
      name: params.categoryName,
    },
    select: {
      id: true,
      imageUrl: true,
      title: true,
    },
  });

  const productsWithoutFilters = await db.product.findMany({
    where: {
      categoryId: category?.id,
    },
    include: {
      images: true,
      colors: true,
      sizes: true,
    },
  });

  const productsWithFilters = await db.product.findMany({
    where: {
      categoryId: category?.id,
      colors: {
        some: {
          name: searchParams.colorName,
        },
      },
      sizes: {
        some: {
          name: searchParams.sizeName,
        },
      },
    },
    include: {
      images: true,
      colors: true,
      sizes: true,
    },
  });


  const sizes = productsWithoutFilters
    .flatMap((item) => item.sizes)
    .filter(
      (item, index, self) =>
        self.findIndex((t) => t.name === item.name) === index
    );

  const colors = productsWithoutFilters
    .flatMap((item) => item.colors)
    .filter(
      (item, index, self) =>
        self.findIndex((t) => t.value === item.value) === index
    );

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
              {productsWithFilters.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                {productsWithoutFilters.map((item) => (
                  // @ts-ignore
                  <ProductCard key={item.id} data={item} />
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
