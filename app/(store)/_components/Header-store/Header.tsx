"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutHeader from "./Checkout";
import { Category, Product } from "@prisma/client";
import MobileHeaderIndex from "./Mobile";
import DesktopHeader from "./Desktop/DesktopHeader";

export interface HeaderProps {
  categories: Category[];
  allProducts: Product[];
  UserId: string | undefined;
}

const Header = ({ categories, allProducts, UserId }: HeaderProps) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

    useEffect(() => {
        if (window.innerWidth < 1024) {
        setIsMobile(true);
        }
    }, []);


  useEffect(() => {
    let lastScrollTop = 0;
    const headerElement = document.querySelector("header");
    const headerHeight = headerElement?.offsetHeight ?? 0; // Handle possible null

    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop; // Use window.scrollY instead

      if (currentScrollTop > lastScrollTop && currentScrollTop > headerHeight) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isCheckOutPage = pathname.includes("/checkout");
  if (isCheckOutPage) return <CheckoutHeader userId={UserId} />;

  return (
    <header
      className={`fixed top-0 left-0 w-screen  bg-white shadow-md z-50 transition-all duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
        {isMobile ? (
        <    MobileHeaderIndex categories={categories} allProducts={allProducts} UserId={UserId} />
        ) : (
            <DesktopHeader categories={categories} allProducts={allProducts} UserId={UserId} />
        )
        }
    </header>
  );
};

export default Header;
