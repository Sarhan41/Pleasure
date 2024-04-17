import Container from "@/components/Store/container";
import Billboard from "./_components/Billboard/BIllboard";
import ProductList from "./_components/ProductList/ProductList";
import { db } from "@/lib/db";

const HomePage = async () => {
  const billboard = await db.category.findUnique({
    where: {
      id: "065d0d93-e512-4db7-a06c-a089778c9850",
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
      color: { select: { name: true, value: true } },
      size: { select: { name: true, value: true } },
    },
  });

  console.log(billboard);
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
