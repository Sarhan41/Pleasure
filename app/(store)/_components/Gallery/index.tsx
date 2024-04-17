import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import GalleryTab from "./GalleryTab";

export interface ImageType {
  id: string;
  url: string;
}

export interface GalleryProps {
  images?: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="flex flex-col-reverse ">
      {/* GalleryTab Section */}
      {/* <div className="hidden lg:block ">
        <Carousel className="  bg-gray-200">
          {images &&
            images.map((image) => (
              <GalleryTab key={image.id} url={image.url} />
            ))}
        </Carousel>
      </div> */}

      {/* Big Photo Section */}
      <div className="lg:w-4/5">
        <Carousel>
          <CarouselContent>
            {images &&
              images.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="aspect-square border-4 relative h-full w-full sm:rounded-lg overflow-hidden">
                    <Image
                      fill
                      src={image.url}
                      alt="Image"
                      className="object-cover object-center"
                    />
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Gallery;
