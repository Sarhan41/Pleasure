import { unstable_cache as cache } from "next/cache";
import React from "react";
import { db } from "@/lib/db";
import Container from "@/components/Store/container";
import Billboard from "../_components/Billboards";
import BestSellerBillboard from "../_components/BestSellerBillboard";
import FeatureSection from "../_components/FeatureSection";
import { currentUser } from "@/lib/auth";

export const revalidate = 1800; // 30 minutes

const categoryOrder = [
  "New",
  "Panties",
  "Sport Bra",
  "Camisole",
  "Shorts",
  "Pyjama",
];

// Fetch billboards
const getBillboards = cache(async () => {
  return await db.billboard.findMany({
    select: {
      imageUrl: true,
      name: true,
      title: true,
      subtitle: true,
      link: true,
    },
  });
});

// Fetch categories
const getCategories = cache(async () => {
  return await db.category.findMany({
    select: { imageUrl: true, name: true },
  });
});

// Fetch featured products
const getFeaturedProducts = cache(async () => {
  return await db.product.findMany({
    where: { isFeatured: true },
    include: {
      category: true,
      images: true,
      sizes: true,
      colors: true,
      colorNames: true,
    },
  });
});

const HomePage: React.FC = async () => {
  const billboards = await getBillboards();
  const categories = await getCategories();
  const featuredProducts = await getFeaturedProducts();

  const sortedCategories = categories.sort((a, b) => {
    return categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name);
  });

  const user = await currentUser();

  return (
    <Container>
      {billboards && <Billboard data={billboards} />}
      <div>
        <FeatureSection featuredProducts={featuredProducts} userId={user?.id} />
      </div>
      <div>
        <div className="mt-12 text-4xl font-extrabold text-gray-900 text-center leading-tight tracking-tight">
          <span className="block text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text">
            Discover
          </span>
          <span className="block">Our Best Sellers</span>
        </div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-8 mt-8 justify-center">
          {sortedCategories.map((category, index) => (
            <BestSellerBillboard
              key={category.name}
              data={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
