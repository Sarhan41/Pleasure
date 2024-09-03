// app/category/[categoryName]/page.tsx

import { db } from "@/lib/db";
import CategoryPageClient from "./Client/CategoryPageClient";
import { currentUser } from "@/lib/auth";
import { unstable_cache as cache } from "next/cache";



// Define cache functions
const getCategory = cache(async (categoryName: string) => {
  return await db.category.findFirst({
    where: {
      name: categoryName,
    },
    select: {
      id: true,
      imageUrl: true,
      title: true,
    },
  });
});

const getProducts = cache(async (categoryId: string) => {
  return await db.product.findMany({
    where: {
      categoryId: categoryId,
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
});

// Generate static params for categories
export async function generateStaticParams() {
  // Fetch all categories from the database
  const categories = await db.category.findMany({
    select: {
      name: true,
    },
  });

  // Map categories to params format
  return categories.map((category) => ({
    categoryName: category.name.replace(/\s+/g, "-"), // Ensure consistent URL format
  }));
}

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

  const category = await getCategory(categoryName);
  if (!category) {
    // Handle the case where the category is not found
    return <div>Category not found</div>;
  }

  const products = await getProducts(category.id);

  return (
    <CategoryPageClient
      products={products}
      userId={userId}
      categoryName={categoryName}
    />
  );
};

export default CategoryPage;
