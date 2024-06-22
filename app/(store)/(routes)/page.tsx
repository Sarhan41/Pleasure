import Container from "@/components/Store/container";
import ProductList from "../_components/ProductList/ProductList";
import { db } from "@/lib/db";
import Billboard from "../_components/Billboard/index";

const HomePage = async () => {
  // Fetch the billboard data
  const billboard = await db.category.findUnique({
    where: {
      id: "79e15fe8-2cfb-420b-b144-6e11468c2327",
    },
    select: {
      imageUrl: true,
      name: true,
    },
  });

  // Fetch the featured products
  const products = await db.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      images: true,
      category: {
        select: {
          name: true,
        },
      },
      sizes: true,
      colors: true,
    },
  });

  console.log(billboard)

  return (
    <Container>
      {billboard && <Billboard data={billboard} />}
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 w-full">
        <ProductList title="Featured Products" items={products} />
      </div>
    </Container>
  );
};

export default HomePage;
