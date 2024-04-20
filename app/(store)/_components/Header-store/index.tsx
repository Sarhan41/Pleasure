import { db } from "@/lib/db";
import Header from "./Header";

export default async function HeaderIndex() {
  const categories = await db.category.findMany({});

  const AllProducts = await db.product.findMany({});

  return <Header categories={categories} allProducts={AllProducts} />;
}
