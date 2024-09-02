"use server";
import { db } from "@/lib/db";
import { unstable_cache as cache } from "next/cache";

export const getHomePageData = cache(async () => {
  const [billboards, categories, featuredProducts] = await Promise.all([
    db.billboard.findMany({
      select: {
        imageUrl: true,
        name: true,
        title: true,
        subtitle: true,
        link: true,
      },
    }),
    db.category.findMany({
      select: { imageUrl: true, name: true },
    }),
    db.product.findMany({
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
    }),
  ]);

  return { billboards, categories, featuredProducts };
});
