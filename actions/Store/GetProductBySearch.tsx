// "use server"
import { db } from "@/lib/db";

export async function getProductBySearch(searchTerm: string) {
  const { data } = await db.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
  });
  return data;
}
