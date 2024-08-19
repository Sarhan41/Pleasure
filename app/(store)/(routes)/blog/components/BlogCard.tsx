import React from "react";
import Image from "next/image";
import { Blog } from "@/types";

export interface BlogCardProps {
  data: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={data.imagesBlog[0].url}
          alt={data.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {data.name}
        </h2>
        <p className="text-sm text-gray-500 mb-2">{data.category.name}</p>
        <p className="text-gray-700 text-sm line-clamp-3">
          {data.content.length > 100
            ? `${data.content.slice(0, 100)}...`
            : data.content}
        </p>
      </div>
      <div className="p-4">
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
