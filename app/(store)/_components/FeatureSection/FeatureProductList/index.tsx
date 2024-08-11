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

  // Sort items by the frequency of their categories
  const sortedItems = items.sort((a, b) => {
    return categoryCount[b.category.name] - categoryCount[a.category.name];
  });

  // Separate items into two groups: one for the most frequent category, and one for the rest
  const primaryCategory = sortedItems[0].category.name;
  const primaryCategoryItems = sortedItems.filter(
    (item) => item.category.name === primaryCategory
  );
  const otherCategoryItems = sortedItems.filter(
    (item) => item.category.name !== primaryCategory
  );

  // Combine the first 6 items of the primary category and the first 6 of the others
  const firstCarouselItems = primaryCategoryItems.slice(0, 6);
  const secondCarouselItems = otherCategoryItems.slice(0, 6);

  return (
    <div className="p-3 space-y-8">
      <Carousel
        opts={{ containScroll: "trimSnaps" }}
        className="mt-8 lg:mt-16 max-w-5xl mx-auto relative"
        autoPlayInterval={4000}
        hideArrows
      >
        <CarouselContent className="flex">
          {firstCarouselItems.map((item) => (
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
          {secondCarouselItems.map((item) => (
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
