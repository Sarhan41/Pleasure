import { db } from "@/lib/db";
import { BlogForm } from "./components/BlogForm";

const BlogPage = async ({ params }: { params: { blogId: string } }) => {
  const blog = await db.blogs.findUnique({
    where: {
      id: params.blogId,
    },
    include: {
      ImagesBlog: true,
    },
  });

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogForm initialData={blog} />
      </div>
    </div>
  );
};

export default BlogPage;
