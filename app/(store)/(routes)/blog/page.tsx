import { db } from "@/lib/db";
import BlogCard from "./components/BlogCard";
import NoResults from "@/components/Store/NoResults";
import { unstable_cache as cache } from "next/cache";

export const revalidate = 1800; // 30 minutes

const getBlogsData = cache(async () => {
  return await db.blogs.findMany({
    where: {
      isFeatured: true,
      isArchived: false,
    },
    include: {
      imagesBlog: true,
      category: true,
    },
  });
});

const BlogsMainPage = async () => {
  const blogs = await getBlogsData();

  if (!blogs) {
    return <NoResults />;
  }

  return (
    <section className="container mx-auto py-12 max-sm:-mt-12 ">
      <h1 className="text-4xl max-xs:text-3xl font-extrabold text-center mb-12 text-gray-800">
        Featured Blogs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} data={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogsMainPage;
