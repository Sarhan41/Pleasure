"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { CouponColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface CouponClientProps {
  data: CouponColumn[];
}

export const CouponClient: React.FC<CouponClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Coupons (${data.length})`}
          description="Manage coupons for your store"
        />
        <Button onClick={() => router.push(`/dashboard/coupon/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="code" columns={columns} data={data} />
      <Heading title="API" description="API calls for Coupons" />
      <Separator />
      <ApiList entityName="Coupons" entityIdName="Coupons" />
    </>
  );
};
