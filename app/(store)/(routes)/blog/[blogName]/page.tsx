// BlogPage.tsx
import React from "react";
import NoResults from "@/components/Store/NoResults";
import { db } from "@/lib/db";
import BlogHeader from "./components/DetailHeader";
import BlogContent from "./components/Content";

interface BlogPageProps {
  params: {
    blogName: string;
  };
}

const BlogPage: React.FC<BlogPageProps> = async ({ params }) => {
  const blogName = params.blogName.replace(/-/g, " ");

  const blog = await db.blogs.findFirst({
    where: {
      name: blogName,
    },
    include: {
      imagesBlog: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!blog) {
    return <NoResults />;
  }

  // Generate alignments on the server-side
  const alignments = blog.imagesBlog.slice(1).map(() =>
    Math.random() > 0.5 ? "left" : "right"
  );

  return (
    <section className="container mx-auto px-4 sm:px-8 lg:px-12 py-10">
      <BlogHeader title={blogName} featuredImage={blog.imagesBlog[0]} />
      <BlogContent
        content={blog.content}
        images={blog.imagesBlog.slice(1)}
        alignments={alignments}
      />
    </section>
  );
};

export default BlogPage;
