"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { UserColumn, columns } from "./columns";

interface UserClientProps {
  data: UserColumn[];
}

export const UsersClient: React.FC<UserClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage Colors for your store"
        />
      </div>
      <Separator />

      <DataTable  searchKey="name" columns={columns} data={data} />
    </>
  );
};
