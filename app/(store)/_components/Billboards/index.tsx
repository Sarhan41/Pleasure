"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BillboardProps {
  data: {
    imageUrl: string;
    name: string;
    title: string | null;
    subtitle: string | null;
    link: string;
  }[];
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  const highlightText = (text: string) => {
    const parts = text.split(/("[^"]+")/g);
    return parts.map((part, index) => {
      if (part.startsWith('"') && part.endsWith('"')) {
        return (
          <span key={index} className="text-pink-500 font-bold">
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Carousel
      className="mt-8 lg:mt-16 relative"
      autoPlayInterval={4000}
      hideArrows
    >
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-4 sm:p-6 w-full flex justify-center lg:p-8 overflow-hidden cursor-pointer">
              <Link
                href={`/collections/${item.link.replace(/\s+/g, "-")}`}
                passHref
                className="w-full h-full"
              >
                <div
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: "cover",
                  }}
                  className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105 bg-center max-sm:bg-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 flex flex-col justify-center lg:justify-end items-center lg:items-end text-center lg:text-right text-white space-y-4 lg:space-y-6 p-4 sm:p-6 lg:p-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                      {item.title && highlightText(item.title)}
                    </h1>
                    <p className="mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-gray-300">
                      {item.subtitle && highlightText(item.subtitle)}
                    </p>
                    <Button className="mt-4 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold text-sm sm:text-base rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl">
                      SHOP NOW
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Billboard;
