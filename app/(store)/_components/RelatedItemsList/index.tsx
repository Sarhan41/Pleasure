"use client";
import { Product } from "@/types";
import NoResults from "@/components/Store/NoResults";
import FeaturedProductCard from "../FeatureSection/FeatureProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../Billboards/carousel";

interface RelatedProductListProps {
  items: Product[];
  userId: string | undefined;
}

export const RelatedProductList: React.FC<RelatedProductListProps> = ({
  items,
  userId,
}) => {
  const halfIndex = Math.ceil(items.length / 2);
  const firstHalf = items.slice(0, halfIndex);
  const secondHalf = items.slice(halfIndex);

  return items.length === 0 ? (
    <NoResults />
  ) : (
    <div className="my-12 place-self-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-start leading-tight drop-shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent border-b-4 border-b-black w-fit pb-3">
        Related <span>Products</span>
      </h1>
      <div className="p-3 space-y-6">
        <Carousel
          opts={{ containScroll: "trimSnaps" }}
          className="mt-8 lg:mt-16 max-w-5xl mx-auto relative"
          autoPlayInterval={4000}
          hideArrows
        >
          <CarouselContent className="flex">
            {firstHalf.map((item, index) => (
              <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 px-2">
                <CarouselItem>
                  <FeaturedProductCard data={item} userId={userId} />
                </CarouselItem>
              </div>
            ))}
          </CarouselContent>
        </Carousel>
        <Carousel
          opts={{ containScroll: "trimSnaps" }}
          className="mt-8 lg:mt-16 max-w-5xl mx-auto relative"
          autoPlayInterval={4000}
          hideArrows
        >
          <CarouselContent className="flex">
            {secondHalf.map((item, index) => (
              <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 px-2">
                <CarouselItem>
                  <FeaturedProductCard data={item} userId={userId} />
                </CarouselItem>
              </div>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};
