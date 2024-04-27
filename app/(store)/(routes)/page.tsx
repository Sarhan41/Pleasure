import Container from "@/components/Store/container";
import Billboard from "../_components/Billboard/BIllboard";
import ProductList from "../_components/ProductList/ProductList";
import { db } from "@/lib/db";

const HomePage = async () => {
  const billboard = await db.category.findUnique({
    where: {
      id: "3b165c91-d7d2-433c-a79d-6e92447b03f9"
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
