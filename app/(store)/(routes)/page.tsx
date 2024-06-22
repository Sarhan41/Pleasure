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
      {/* <Panty /> */}
    
    </Container>
  );
};

export default HomePage;
