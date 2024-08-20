"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutHeader from "./Checkout";
import { Category, Product } from "@prisma/client";
import MobileHeaderIndex from "./Mobile/MobileHeader";
import DesktopHeader from "./Desktop/DesktopHeader";
import usePreviewModal from "@/hooks/store/use-preview-modal";
import BlogHeader from "./Blog";

export interface HeaderProps {
  categories: Category[];
  allProducts: Product[];
  UserId: string | undefined;
  UserName: string | undefined | null;
}

const Header = ({ categories, allProducts, UserId, UserName }: HeaderProps) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const pathname = usePathname();
  const { isOpen } = usePreviewModal();

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

  // if(isOpen) return null;



  const isCheckOutPage = pathname.includes("/checkout");
  if (isCheckOutPage) return <CheckoutHeader />;
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
          UserName={UserName}
        />
      </div>
      <div className="max-lg:hidden ">
        <DesktopHeader
          categories={categories}
          allProducts={allProducts}
          UserId={UserId}
          UserName={UserName}
        />
      </div>
    </header>
  );
};

export default Header;
