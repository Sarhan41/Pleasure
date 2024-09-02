"use server";
import { db } from "@/lib/db";
import { unstable_cache as cache } from "next/cache";

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
      colorNames: true,
    },
  });
  return featuredProducts;
});
