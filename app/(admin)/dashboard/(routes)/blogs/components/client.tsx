"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { BlogColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface BlogsClientProps {
  data: BlogColumn[];
}

export const BlogsClient: React.FC<BlogsClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Blogs (${data.length})`}
          description="Manage Blogs for your Magazine"
        />
        <Button onClick={() => router.push(`/dashboard/blogs/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entityName="blogs" entityIdName="blogId" />
    </>
  );
};
