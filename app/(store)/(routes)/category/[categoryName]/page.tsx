import { db } from "@/lib/db";
import Filter from "./components/Filter";
import MobileFilters from "./components/MobileFilter";
import Container from "@/components/Store/container";
import Billboard from "@/app/(store)/_components/Billboard/BIllboard";
import NoResults from "@/components/Store/NoResults";
import ProductCard from "@/app/(store)/_components/ProductCard/ProductCard";

interface CategoryPageProps {
  params: {
    categoryName: string;
    colorId: string;
    sizeId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {

  


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

  
  // console.log("Hello",{params});

  const products = await db.product.findMany({
    where: {
      categoryId: category?.id,
      colors: { some: { name: params.colorId } },
      sizes: { some: { id: params.sizeId } },
    },
    include: {
      images: { select: { url: true } },
      category: { select: { name: true } },
      colors: { select: { id: true, name: true, value: true } },
      sizes: { select: { id: true, name: true, value: true, quantity: true } },
    },
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
