import Container from "@/components/Store/container";
import { db } from "@/lib/db";
import Billboard from "../_components/Billboards";
import BestSellerBillboard from "../_components/BestSellerBillboard";

const HomePage = async () => {
  const billboard = await db.category.findUnique({
    where: { id: "79e15fe8-2cfb-420b-b144-6e11468c2327" },
    select: { imageUrl: true, name: true },
  });

  const fourBillboards = await db.category.findMany({
    where: {
      name: {
        not: "New",
      },
    },
    select: { imageUrl: true, name: true },
  });

  return (
    <Container>
      {billboard && <Billboard data={billboard} />}
      <div className="mt-12 text-4xl font-extrabold text-gray-900 text-center leading-tight tracking-tight">
        <span className="block text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text">
          Discover
        </span>
        <span className="block">Our Best Sellers</span>
      </div>
      <div className="grid grid-cols-1  mx-auto px-4 sm:px-6 lg:px-8 sm:grid-cols-2  gap-8 mt-8 ">
        {fourBillboards.map((billboard) => (
          <BestSellerBillboard key={billboard.name} data={billboard} />
        ))}
      </div>
    </Container>
  );
};

export default HomePage;
