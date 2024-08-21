"use client";
import React from "react";
import Image from "next/image";

interface BlogHeaderProps {
  title: string;
  featuredImage: {url: string} | null;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, featuredImage }) => {
  return (
    <>
      <h1 className="text-5xl font-extrabold mb-8 text-primary uppercase tracking-wide">
        {title}
      </h1>

      {featuredImage && (
        <div className="relative w-full mx-auto max-sm:h-[300px] sm:w-[400px] sm:h-[600px]">
          <Image
            src={featuredImage.url}
            alt="Featured Image"
            fill
            className="object-cover object-center w-full h-full"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      )}
    </>
  );
};

export default BlogHeader;
