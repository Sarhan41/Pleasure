import { format } from "date-fns";

import { CategoryClient } from "./components/client";
import { db } from "@/lib/db";
import { CategoryColumn } from "./components/columns";
import { currentRole, currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const CategoriesPage = async () => {

  const user = await currentUser();
  const role = await currentRole();

  if (!user) {
    redirect("/login");
  }

  if (role !== "ADMIN") {
    redirect("/my-profile");
  }
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    title: item.title || '',
    description: item.description || '',
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));
  

  return (
    <div className="  flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
      <div></div>
    </div>
  );
};

export default CategoriesPage;
