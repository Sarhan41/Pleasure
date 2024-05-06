"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavbarActions from "./NavbarActions";
import Container from "@/components/Store/container";
import MainNav from "./MainNav";
import { db } from "@/lib/db";
import UserLogin from "./UserLogin";
import { Category, Product } from "@prisma/client";
import Image from "next/image";
import WishList from "./WishList";
import Search from "./Search";

interface HeaderProps {
  categories: Category[];
  allProducts: Product[];
  UserId: string | undefined;
}

const Header = ({ categories, allProducts, UserId }: HeaderProps) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

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

  return (
    <header
      className={`fixed top-0 left-0 w-screen  bg-white shadow-md z-50 transition-all duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* First row */}
      <div className="flex items-center border-b-3 gap-6 justify-between py-2 px-4 ">
        {/* Logo */}
        <div className="hidden lg:block"></div>
        <div className="flex items-center  justify-center">
          {/* Your logo image */}
          <Link
            href="/"
            className="flex items-center  overflow-hidden justify-center gap-8 "
          >
            <Image
              src="/logo.jpg"
              height={48}
              width={58}
              alt="Logo"
              className="rounded-full object-cover max-sm:hidden  "
            />
            <Image
              src="/logo-text.png"
              height={10}
              width={298}
              alt="Pleasure"
              className="  object-cover  "
            />
          </Link>
        </div>
        {/* Search functionality */}
        <div className="flex items-center justify-end">
          <Search allProducts={allProducts} />
        </div>
      </div>
      {/* Second row */}
      <div className="flex items-center bg-black text-white justify-between py-2 px-4">
        {/* Categories */}
        <div className="flex items-center lg:pl-6 ">
          {/* Your category links */}
          <MainNav data={categories} />
        </div>
        {/* User icon, cart, and wishlist */}
        <div className="flex items-center ">
          {/* Your user icon */}
          <UserLogin userId={UserId} />
          {/* Your cart icon */}
          <NavbarActions userId={UserId} />
        </div>
      </div>
    </header>
  );
};

export default Header;
