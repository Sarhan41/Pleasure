// components/RelatedBlogList.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/types";
import BlogCard from "../../components/BlogCard";

interface RelatedBlogListProps {
  blogs: Blog[];
}

const RelatedBlogList: React.FC<RelatedBlogListProps> = ({ blogs }) => {
  return (
    <div className="mt-12">
     <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-start leading-tight drop-shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent border-b-4 border-b-black w-fit pb-3">
        Related <span>Blogs</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-8 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} data={blog} />
        ))}
      </div>
    </div>
  );
};

export default RelatedBlogList;
