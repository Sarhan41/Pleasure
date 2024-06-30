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
      <div className="lg:flex">
        <div className="max-lg:hidden mr-8 flex flex-col">
          {images &&
            images.map((image, index) => (
              <div
                key={image.id}
                className="border-4 relative h-20 w-20 sm:h-28 mb-1 sm:w-28 rounded-lg overflow-hidden cursor-pointer hover:border-primary"
                onClick={() => openFullScreen(index)}
                onMouseEnter={() => setHoveredImageIndex(index)}
                onMouseLeave={() => setHoveredImageIndex(-1)}
              >
                <Image
                  fill
                  src={image.url}
                  alt="Image"
                  className="object-cover object-center h-full w-full"
                />
              </div>
            ))}
        </div>
        <div className="lg:w-4/5">
          <Carousel>
            <CarouselContent>
              {images &&
                images.map((image, index) => (
                  <CarouselItem key={image.id}>
                    <div
                      className="border-4 relative h-[600px] w-[400px] sm:rounded-lg overflow-hidden ml-24"
                      onClick={() => openFullScreen(index)}
                    >
                      <Image
                        fill
                        src={images?.[hoveredImageIndex]?.url ?? image?.url}
                        alt="Image"
                        className="object-cover object-center h-full w-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      {isFullScreen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-90">
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
                      alt="Image"
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
