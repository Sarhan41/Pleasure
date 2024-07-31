import React from "react";
import Container from "@/components/Store/container";
import Billboard from "../_components/Billboards";
import BestSellerBillboard from "../_components/BestSellerBillboard";
import FeatureSection from "../_components/FeatureSection";
import { currentUser } from "@/lib/auth";
import {
  getBillboards,
  getCategories,
  getFeaturedProducts,
} from "@/actions/Store/GetEverythingHomePage";


export const revalidate = 1800; // 30 minutes

const categoryOrder = [
  "New",
  "Panties",
  "Sport Bra",
  "Camisole",
  "Shorts",
  "Pyjama",
];

const HomePage: React.FC = async () => {
  const [billboards, categories, featuredProducts] = await Promise.all([
    getBillboards(),
    getCategories(),
    getFeaturedProducts(),
  ]);

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
