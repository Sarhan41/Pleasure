
import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { OrderColumn, columns } from "./columns";

interface BillboardClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<BillboardClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage Orders for your store"
      />

      <Separator />

      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};
