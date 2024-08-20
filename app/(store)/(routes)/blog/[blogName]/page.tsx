import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import NoResults from "@/components/Store/NoResults";
import Image from "next/image";
import React from "react";

interface CategoryPageProps {
  params: {
    blogName: string;
  };
}

const BlogPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const BlogName = params.blogName.replace(/-/g, " ");

  const user = await currentUser();
  const userId = user?.id;

  const blog = await db.blogs.findFirst({
    where: {
      name: BlogName,
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

  const { imagesBlog, content } = blog;
  const formattedContent = formatContent(content, imagesBlog);

  return (
    <section className="container mx-auto px-4 sm:px-8 lg:px-12 py-10">
      <h1 className="text-5xl font-extrabold mb-8 text-primary capitalize tracking-wide">
        {capitalizeWords(BlogName)}
      </h1>

      {imagesBlog[0] && (
       <div
       className="border-4 relative h-60 w-full sm:h-[600px] sm:w-[400px] sm:ml-24"
     >
       <Image
         fill
         src={imagesBlog[0].url}
         alt=""
         className="max-sm:object-contain object-cover object-center h-full w-full"
       />
     </div>
      )}

      <div className="content space-y-8 text-lg leading-relaxed text-gray-800">
        {formattedContent.map((block, index) => (
          <React.Fragment key={index}>{block}</React.Fragment>
        ))}
      </div>
    </section>
  );
};

const formatContent = (content: string, images: any[]) => {
  const contentBlocks = content.split("\n\n").map((block, index) => {
    block = block.replace(
      /==([^=]+)==/g,
      "<h2 class='text-3xl font-semibold my-6 text-primary'>$1</h2>"
    );
    block = block.replace(/\*\*([^\*]+)\*\*/g, "<strong>$1</strong>");
    block = block.replace(/\/\/([^\/]+)\/\//g, "<em>$1</em>");

    if (images[index + 1]) {
      return (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center my-8 space-y-4 md:space-y-0 md:space-x-6"
        >
          <p dangerouslySetInnerHTML={{ __html: block }} className="md:w-2/3" />
          <div className="md:w-1/3">
            <Image
              src={images[index + 1].url}
              alt="Blog Image"
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      );
    } else {
      return (
        <p
          key={index}
          dangerouslySetInnerHTML={{ __html: block }}
          className="my-6 leading-relaxed"
        />
      );
    }
  });

  return contentBlocks;
};

const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export default BlogPage;
