import { format } from "date-fns";

import { BillboardClient } from "./components/client";
import { db } from "@/lib/db";
import { BillboardColumn } from "./components/columns";

const BillboardsPage = async () => {
  const billboards = await db.billboard.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboard: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    name: item.name,
    title: item.title || '',
    subtitle: item.subtitle || '',
    link: item.link ,
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
