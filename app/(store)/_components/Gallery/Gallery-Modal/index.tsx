"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai";

export interface ImageType {
  id: string;
  url: string;
}

export interface GalleryProps {
  images?: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(-1);

  const openFullScreen = (index: number) => {
    setSelectedImageIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const goToPreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? (images?.length ?? 0) - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === (images?.length ?? 0) - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 lg:gap-6">
        <div className="w-full ">
          <Carousel>
            <CarouselContent>
              {images &&
                images.map((image, index) => (
                  <CarouselItem key={image.id}>
                    <div
                      className="relative h-60 w-full cursor-pointer"
                      onClick={() => openFullScreen(index)}
                    >
                      <Image
                        fill
                        src={image.url}
                        alt=""
                        className="sm:object-contain object-center h-full w-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      {isFullScreen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-90"
          onClick={closeFullScreen}
        >
          <div className="relative">
            <button
              className="absolute top-0 right-0 m-4 text-white text-xl z-50"
              onClick={closeFullScreen}
            >
              <AiFillCloseCircle className="h-10 w-10" />
            </button>
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <div
                    className="h-screen w-screen flex justify-center items-center"
                    onClick={goToPreviousImage}
                  >
                    <Image
                      fill
                      src={images?.[selectedImageIndex]?.url ?? ""}
                      alt=""
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2" />
              <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2" />
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
