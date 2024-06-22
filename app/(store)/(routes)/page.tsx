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

  return (
    <Container>
      {billboard && <Billboard data={billboard} />}

      {/* Title: Best Selling */}
      <div className="mt-12 text-3xl font-bold text-gray-800 text-center">
        Best Selling
      </div>

      {/* Placeholder for future product category boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
        {/* Placeholder boxes */}
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
          Panties
        </div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
          Pyjamas
        </div>
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
          Camisoles
        </div>
        {/* Add more boxes for other categories as needed */}
      </div>
    </Container>
  );
};

export default HomePage;
