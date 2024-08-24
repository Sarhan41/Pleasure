// BlogContent.tsx
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
    // Ensure alignments are determined consistently across server and client
    const newAlignments = images.map((_, index) =>
      (index + 1) % 3 === 0 ? "left" : "right"
    );
    setAlignments(newAlignments);
  }, [images]);

  const formatContent = (content: string) => {
    return content.split("\n\n").map((block, index) => {
      // Handle subtitles and apply formatting
      const subtitleMatch = /==([^=]+)==/.exec(block);
      const subtitle = subtitleMatch ? subtitleMatch[1] : null;

      block = block.replace(/==([^=]+)==/g, ""); // Remove subtitle from block content
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
        <div key={index} className="my-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            {alignment === "left" ? imageComponent : null}
            <div className="md:w-2/3">
              {subtitle && (
                <h2 className="text-3xl font-semibold my-6 text-primary">
                  {subtitle}
                </h2>
              )}
              <p dangerouslySetInnerHTML={{ __html: block }} />
            </div>
            {alignment === "right" ? imageComponent : null}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="content space-y-8 font-sans text-lg leading-relaxed text-gray-800">
      {formatContent(content)}
    </div>
  );
};

export default BlogContent;
