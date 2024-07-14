"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutHeader from "./Checkout";
import { Category, Product } from "@prisma/client";
import MobileHeaderIndex from "./Mobile/MobileHeader";
import DesktopHeader from "./Desktop/DesktopHeader";

export interface HeaderProps {
  categories: Category[];
  allProducts: Product[];
  UserId: string | undefined;
}

const Header = ({ categories, allProducts, UserId }: HeaderProps) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;

      setIsHeaderVisible(lastScrollTop >= currentScrollTop);
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isCheckOutPage = pathname.includes("/checkout");
  if (isCheckOutPage) return <CheckoutHeader userId={UserId} />;

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white shadow-md z-40 transition-transform duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="lg:hidden">
        <MobileHeaderIndex
          categories={categories}
          allProducts={allProducts}
          UserId={UserId}
        />
      </div>
      <div className="max-lg:hidden ">
        <DesktopHeader
          categories={categories}
          allProducts={allProducts}
          UserId={UserId}
        />
      </div>
    </header>
  );
};

export default Header;
