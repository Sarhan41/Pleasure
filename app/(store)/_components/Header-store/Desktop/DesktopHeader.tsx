"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/Store/container";
import MainNav from "./MainNav";
import { db } from "@/lib/db";
import Image from "next/image";
import WishList from "./WishList";
import { usePathname } from "next/navigation";
import CheckoutHeader from "../Checkout";
import UserLogin from "./UserLogin";
import NavbarActions from "./NavbarActions";
import Search from "./Search";
import { HeaderProps } from "../Header";

const DesktopHeader = ({
  categories,
  allProducts,
  UserId,
}:
HeaderProps
) => {
  return (
    <>
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
              alt=""
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
    </>
  );
};

export default DesktopHeader;
