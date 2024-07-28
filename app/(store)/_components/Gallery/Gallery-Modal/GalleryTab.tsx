"use client";
import { useState } from 'react';
import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

interface GalleryTabProps {
  url: string;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ url }) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <div 
      className={`aspect-square cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 ${isActive ? 'scale-110' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselItem>
        <div className="relative h-full w-full overflow-hidden">
          <Image
            fill
            src={url}
            alt=""
            className="object-cover object-center"
          />
        </div>
      </CarouselItem>
    </div>
  );
};

export default GalleryTab;
