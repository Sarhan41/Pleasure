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
  if (items.length === 0) {
    return <NoResults />;
  }

  // Group products by category and count occurrences
  const categoryCount: { [key: string]: number } = {};
  items.forEach((item) => {
    if (categoryCount[item.category.name]) {
      categoryCount[item.category.name]++;
    } else {
      categoryCount[item.category.name] = 1;
    }
  });

  // Sort products by the occurrence of their category, majority category first
  const sortedItems = items.sort((a, b) => {
    return categoryCount[b.category.name] - categoryCount[a.category.name];
  });

  // Take the first 6 products
  const selectedItems = sortedItems.slice(0, 12);

  // Split selectedItems into two halves
  const halfIndex = Math.ceil(selectedItems.length / 2);
  const firstHalf = selectedItems.slice(0, halfIndex);
  const secondHalf = selectedItems.slice(halfIndex);

  return (
    <div className="p-3 space-y-8">
      <Carousel
        opts={{ containScroll: "trimSnaps" }}
        className="mt-8 lg:mt-16 max-w-5xl mx-auto relative"
        autoPlayInterval={4000}
        hideArrows
      >
        <CarouselContent className="flex">
          {firstHalf.map((item) => (
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
          {secondHalf.map((item) => (
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
