import { cache } from "react";
import { db } from "@/lib/db";

export const getProduct = cache(async (productName: string) => {
  const product = await db.product.findFirst({
    where: {
      name: productName,
    },
    include: {
      category: true,
      images: { select: { url: true, id: true, productId: true } },
      colors: { select: { name: true, value: true, toLink: true } },
      sizes: {
        select: {
          name: true,
          SKUvalue: true,
          price: true,
          quantity: true,
          discountedprice: true,
          id: true,
        },
      },
    },
  });
  return product;
});

export const getSuggestedProducts = cache(async (categoryId: string, productId: string) => {
  const suggestedProducts = await db.product.findMany({
    where: {
      categoryId: categoryId,
      isArchived: false,
    },
    include: {
      category: true,
      images: { select: { url: true, id: true, productId: true } },
      colors: { select: { name: true, value: true, toLink: true } },
      sizes: true,
    },
  });

  return suggestedProducts.filter((product) => product.id !== productId);
});

