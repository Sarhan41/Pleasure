import Container from "@/components/Store/container";
import Billboard from "../_components/Billboard/Billboard";
import ProductList from "../_components/ProductList/ProductList";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";

const HomePage = async () => {
  const billboard = await db.category.findUnique({
    where: {
      id: "7d8b0280-3a24-4665-81cb-052ce8cff81e"
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
      category: { select: { name: true } },
      colors: { select: { name: true, value: true } },
      sizes: { select: { name: true, value: true } },
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
