import { format } from "date-fns";

import { BillboardClient } from "./components/client";
import { db } from "@/lib/db";
import { BillboardColumn } from "./components/columns";
import { currentRole, currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const BillboardsPage = async () => {
  const user = await currentUser();
  const role = await currentRole();

  if (!user) {
    redirect("/login");
  }

  if (role !== "ADMIN") {
    redirect("/my-profile");
  }

  const billboards = await db.billboard.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboard: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    name: item.name,
    title: item.title || "",
    subtitle: item.subtitle || "",
    link: item.link,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <div className="  flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboard} />
      </div>
      <div></div>
    </div>
  );
};

export default BillboardsPage;
