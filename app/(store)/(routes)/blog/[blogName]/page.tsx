import React from "react";
import NoResults from "@/components/Store/NoResults";
import { db } from "@/lib/db";
import BlogHeader from "./components/DetailHeader";
import BlogContent from "./components/Content";
import RelatedBlogList from "./components/RelatedBlogList";
import { unstable_cache as cache } from "next/cache";

interface BlogPageProps {
  params: {
    blogName: string;
  };
}

export const revalidate = 1800; // 30 minutes

// Cache fetching individual blog
const getBlog = cache(async (blogName: string) => {
  return await db.blogs.findFirst({
    where: {
      name: blogName,
    },
    include: {
      imagesBlog: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
});

// Cache fetching related blogs
const getRelatedBlogs = cache(async (categoryId: string, excludeId: string) => {
  return await db.blogs.findMany({
    where: {
      categoryId,
      id: {
        not: excludeId, // Exclude the current blog
      },
    },
    take: 3, // Limit to 3 related blogs
    include: {
      imagesBlog: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
});

const BlogPage: React.FC<BlogPageProps> = async ({ params }) => {
  const blogName = params.blogName.replace(/-/g, " ");
  const blog = await getBlog(blogName);

  if (!blog) {
    return <NoResults />;
  }

  const relatedBlogs = await getRelatedBlogs(blog.category.id, blog.id);

  return (
    <section className="container mx-auto px-4 sm:px-8 lg:px-12 py-10">
      <BlogHeader title={blogName} featuredImage={blog.imagesBlog[0]} />
      <BlogContent content={blog.content} images={blog.imagesBlog.slice(1)} />
      {relatedBlogs.length > 0 && <RelatedBlogList blogs={relatedBlogs} />}
    </section>
  );
};

export default BlogPage;
