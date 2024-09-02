"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Expand } from "lucide-react";
import { Blog } from "@/types";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  data: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const blogNameSlug = data.name.replace(/\s+/g, "-");

  return (
    <div className="relative overflow-hidden bg-white h-auto w-[260px] sm:w-[320px] group cursor-pointer rounded-2xl border border-gray-200 shadow-md p-3 space-y-2 transition-transform transform hover:scale-105">
      {/* Image and Preview Icon */}
      <Link href={`/blog/${blogNameSlug}`} passHref prefetch={true}>
        <div className="h-[280px] sm:h-[320px] w-full rounded-lg bg-gray-100 relative overflow-hidden mb-2">
          <Image
            alt={data.name}
            src={hovered && data.imagesBlog[1]?.url ? data.imagesBlog[1].url : data.imagesBlog[0].url}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            fill
            className="object-cover rounded-lg transition-transform transform group-hover:scale-105"
          />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute w-full px-4 bottom-4">
            <div className="flex justify-center">
              <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
                <Expand size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Blog Title and Category */}
      <Link href={`/blog/${blogNameSlug}`} passHref prefetch={true}>
        <div className="flex flex-col items-start space-y-1 mt-2">
          <p className="font-extrabold text-xs sm:text-xs text-black">
            {data.name.length > 30 ? `${data.name.slice(0, 30)}...` : data.name}
          </p>
          <p className="text-xs text-gray-500">{data.category.name}</p>
        </div>
      </Link>

      {/* Blog Excerpt and Read More Button */}
      <div className="flex justify-between items-center w-full mt-auto">
        <Link href={`/blog/${blogNameSlug}`} passHref prefetch={true}>
          <p className="text-xs text-gray-700 line-clamp-3">
            {data.content.length > 100
              ? `${data.content.slice(0, 100)}...`
              : data.content}
          </p>
        </Link>
        <Link href={`/blog/${blogNameSlug}`} passHref prefetch={true}>
          <Button className="rounded-full bg-blue-600 transition hover:bg-primary">
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
