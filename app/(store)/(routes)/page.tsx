import Container from "@/components/Store/container";
import { db } from "@/lib/db";
import Billboard from "../_components/Billboards";
import BestSellerBillboard from "../_components/BestSellerBillboard";

const HomePage = async () => {
  const billboard = await db.category.findMany({
    select: { imageUrl: true, name: true },
  });

  const fourBillboards = await db.category.findMany({
    select: { imageUrl: true, name: true },
  });

  const categoryOrder = [
    "New",
    "Panties",
    "Sport Bra",
    "Camisole",
    "Shorts",
    "Pyjama",
  ];

  // Sort the categories based on the defined order
  const sortedBillboardData = fourBillboards.sort((a, b) => {
    return categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name);
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
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-8 mt-8 justify-center">
        {sortedBillboardData.map((billboard, index) => (
          <BestSellerBillboard
            key={billboard.name}
            data={billboard}
            index={index}
          />
        ))}
      </div>
    </Container>
  );
};

export default HomePage;
