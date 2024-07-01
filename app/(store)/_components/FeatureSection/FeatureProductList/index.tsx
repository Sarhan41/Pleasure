"use client";
import { Product } from "@/types";
import NoResults from "@/components/Store/NoResults";
import FeaturedProductCard from "../FeatureProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../Billboards/carousel";

interface FeaturedProductListProps {
  items: Product[];
  userId: string | undefined;
}

export const FeaturedProductList: React.FC<FeaturedProductListProps> = ({
  items,
  userId,
}) => {
  const halfIndex = Math.ceil(items.length / 2);
  const firstHalf = items.slice(0, halfIndex);
  const secondHalf = items.slice(halfIndex);

  return items.length === 0 ? (
    <NoResults />
  ) : (
    <div className="p-3 space-y-8">
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
  );
};
