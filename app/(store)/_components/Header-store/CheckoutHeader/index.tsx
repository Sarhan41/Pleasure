"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const CheckoutHeader = () => {
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
      className={`fixed top-0 left-0 w-screen px-4 md:px-10 lg:px-16 bg-white shadow-md z-50 transition-all duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* First row */}
      <div className="flex items-center max-lg:flex-col border-b-3 gap-6 justify-between py-2 px-4">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center overflow-hidden justify-center gap-8"
          >
            <Image
              src="/logo.jpg"
              height={48}
              width={58}
              alt="Logo"
              className="rounded-full object-cover max-sm:hidden"
            />
            <Image
              src="/logo-text.png"
              height={10}
              width={298}
              alt="Pleasure"
              className="object-cover"
            />
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="text-center">
            <div className="font-normal border-r-2 p-2 text-xs">
              FREE RETURNS
            </div>
          </div>
          <div className="text-center">
            <div className="font-normal border-r-2 p-2 text-xs">
              100% PRIVACY
            </div>
          </div>
          <div className="text-center">
            <div className="font-normal border-r-2 p-2 text-xs">
              CASH ON DELIVERY
            </div>
          </div>
          <div className="text-center">
            <div className="font-normal border-r-2 p-2 text-xs">
              FREE SHIPPING*
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;
