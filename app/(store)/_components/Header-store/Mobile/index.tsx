import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { HeaderProps } from "../Header";

export default async function MobileHeaderIndex({
    categories,
    allProducts,
    UserId,
}: HeaderProps) {

  const User = await currentUser();

  const userId = User?.id;



  const AllProducts = await db.product.findMany({});

  return (
    // <Header categories={categories} allProducts={AllProducts} UserId={userId} />
    <div>Hello wrold</div>
  );
}
