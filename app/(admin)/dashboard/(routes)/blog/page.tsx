import { format } from "date-fns";
import { formatter } from "@/lib/utils";

import { BlogsClient } from "./components/client";
import { db } from "@/lib/db";
import { BlogColumn } from "./components/columns";
import { currentRole, currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const BlogMainPage = async () => {
  const user = await currentUser();
  const role = await currentRole();

  if (!user) {
    redirect("/login");
  }

  if (role !== "ADMIN") {
    redirect("/my-profile");
  }

  const blogs = await db.blogs.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBlogs: BlogColumn[] = blogs.map((item) => ({
    id: item.id,
    name: item.name,
    subname: item.subname,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    isNew: item.isNew,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <div className="  flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogsClient data={formattedBlogs} />
      </div>
      <div></div>
    </div>
  );
};

export default BlogMainPage;
