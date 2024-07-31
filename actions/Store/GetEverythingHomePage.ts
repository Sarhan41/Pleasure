import { cache } from "react";
import { db } from "@/lib/db";

export const getBillboards = cache(async () => {
  const billboards = await db.billboard.findMany({
    select: {
      imageUrl: true,
      name: true,
      title: true,
      subtitle: true,
      link: true,
    },
  });
  return billboards;
});

export const getCategories = cache(async () => {
  const categories = await db.category.findMany({
    select: { imageUrl: true, name: true },
  });
  return categories;
});

export const getFeaturedProducts = cache(async () => {
  const featuredProducts = await db.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      category: true,
      images: true,
      sizes: true,
      colors: true,
    },
  });
  return featuredProducts;
});
