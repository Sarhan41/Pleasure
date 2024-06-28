import { db } from "@/lib/db";
import { BillboardForm } from "./components/BillboardForm";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  const categories = await db.category.findMany({});

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <BillboardForm initialData={billboard} categories={categories} />
      </div>
    </div>
  );
};

export default BillboardPage;
