"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface BlogContentProps {
  content: string;
  images: any[];
}

const BlogContent: React.FC<BlogContentProps> = ({ content, images }) => {
  const [alignments, setAlignments] = useState<string[]>([]);

  useEffect(() => {
    const newAlignments = images.map(() =>
      Math.random() > 0.5 ? "left" : "right"
    );
    setAlignments(newAlignments);
  }, [images]);

  const formatContent = (content: string) => {
    return content.split("\n\n").map((block, index) => {
      block = block.replace(
        /==([^=]+)==/g,
        "<h2 class='text-3xl font-semibold my-6 text-primary'>$1</h2>"
      );
      block = block.replace(/\*\*([^\*]+)\*\*/g, "<strong>$1</strong>");
      block = block.replace(/\/\/([^\/]+)\/\//g, "<em>$1</em>");

      const alignment = alignments[index] || "left";
      const imageComponent = images[index] && (
        <div
          className={`md:w-1/3 ${alignment === "left" ? "md:order-first" : ""}`}
        >
          <Image
            src={images[index].url}
            alt="Blog Image"
            width={400}
            height={400}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
      );

      return (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center my-8 space-y-4 md:space-y-0 md:space-x-6"
        >
          {alignment === "left" ? imageComponent : null}
          <p dangerouslySetInnerHTML={{ __html: block }} className="md:w-2/3" />
          {alignment === "right" ? imageComponent : null}
        </div>
      );
    });
  };

  return (
    <div className="content space-y-8 text-lg leading-relaxed text-gray-800">
      {formatContent(content)}
    </div>
  );
};

export default BlogContent;
