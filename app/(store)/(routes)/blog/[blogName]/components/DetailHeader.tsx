"use client";
import React from "react";
import Image from "next/image";

interface BlogHeaderProps {
  title: string;
  featuredImage: any;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, featuredImage }) => {
  

  return (
    <>
      <h1 className="text-5xl font-extrabold mb-8 text-primary uppercase  tracking-wide">
        {title}
      </h1>

      {featuredImage && (
        <div className="relative h-60 w-full sm:h-[600px] sm:w-[400px] sm:ml-24">
          <Image
            fill
            src={featuredImage.url}
            alt="Featured Image"
            className="max-sm:object-contain object-cover object-center h-full w-full"
          />
        </div>
      )}
    </>
  );
};

export default BlogHeader;
