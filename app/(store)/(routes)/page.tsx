import Container from "@/components/Store/container";
import ProductList from "../_components/ProductList/ProductList";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Billboard from "../_components/Billboard/index";

const HomePage = async () => {
  const billboard = await db.category.findUnique({
    where: {
      id: "3085b9ae-59ef-4a7f-99f1-03b89796fad8"
    },
    select: {
      imageUrl: true,
      title: true,
    },
  });

  const products = await db.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      images: {},
      category: {
        select: {
          name: true,
        },
      },
      sizes: true,
      colors: true,

    },
  });

  return (
    <Container>
      {billboard && <Billboard data={billboard} />}
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      
      </div>
    </Container>
  );
};

export default HomePage;
