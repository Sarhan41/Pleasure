"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserIcon } from "lucide-react";

const BlogHeader = () => {
  return (
    <header className="w-full px-4 sm:px-10 lg:px-16 bg-white shadow-md z-50 transition-all duration-300 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between py-2">
        <div className="flex items-center justify-center">
          <Link area-label="Link" href="/" className="flex items-center gap-4">
            <Image
              src="/logo.jpg"
              height={48}
              width={58}
              alt=""
              className="rounded-full object-cover hidden sm:block"
            />
            <Image
              src="/logo-text.png"
              height={10}
              width={200}
              alt=""
              className="object-cover"
            />
          </Link>
        </div>

        
      </div>
    </header>
  );
};

export default BlogHeader;
