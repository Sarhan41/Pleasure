import { db } from "@/lib/db";
import CategoryPageClient from "./Client/CategoryPageClient";
import { currentUser } from "@/lib/auth";

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
}

export const revalidate = 1800; // 30 minutes

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const categoryName = params.categoryName.replace(/-/g, " ");

  const user = await currentUser();
  const userId = user?.id;

  const category = await db.category.findFirst({
    where: {
      name: categoryName,
    },
    select: {
      id: true,
      imageUrl: true,
      title: true,
    },
  });

  const products = await db.product.findMany({
    where: {
      categoryId: category?.id,
      isArchived: false,
    },
    include: {
      sizes: true,
      colors: true,
      category: true,
      images: true,
      colorNames: true,
    },
  });

  return (
    <CategoryPageClient
      products={products}
      userId={userId}
      categoryName={categoryName}
    />
  );
};

export default CategoryPage;
