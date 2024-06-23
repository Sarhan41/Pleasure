"use client";
import React from "react";
import Link from "next/link";
import MainNav from "./MainNav";
import Image from "next/image";
import UserLogin from "./UserLogin";
import NavbarActions from "./NavbarActions";
import Search from "./Search";
import { HeaderProps } from "../Header";

const DesktopHeader = ({ categories, allProducts, UserId }: HeaderProps) => {
  return (
    <>
      {/* Top Row */}
      <div className="flex justify-between py-2 items-center w-full px-4 text-xs text-gray-600 ">
        {/* Left Side */}
        <div className="flex font-mono text-[10px] border-b  space-x-4 pl-2 self-start ">
          <span>Free Returns</span>
          <span>100% Privacy</span>
          <span>Cash On Delivery</span>
          <span>Free Shipping*</span>
        </div>
        {/* Center */}
        <div className="flex justify-center items-center">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo.jpg"
              height={48}
              width={48}
              alt="Logo"
              className="rounded-full object-cover"
            />
            <Image
              src="/logo-text.png"
              height={48}
              width={298}
              alt="Pleasure"
              className="object-cover"
            />
          </Link>
        </div>
        {/* Right Side */}
        <div className="flex flex-col gap-1">
          <div className="flex text-[10px] font-mono   space-x-4 pl-2 self-start  ">
            <span className="cursor-pointer">
              <Link href="/become-affiliate">
              
              Become Affiliate
              </Link>
              </span>
            <span className="cursor-pointer"> <Link href="/about-us">
              
              Our Story
              </Link></span>
          </div>
          {/* Search functionality */}
          <div className="flex justify-center items-center  px-4">
            <Search allProducts={allProducts} />
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="flex items-center bg-black text-white justify-between py-2 px-4">
        {/* Categories */}
        <div className="flex items-center lg:pl-6">
          <MainNav data={categories} />
        </div>

        {/* User icon, cart, and wishlist */}
        <div className="flex items-center mr-4">
          <UserLogin userId={UserId} />
          <NavbarActions userId={UserId} />
        </div>
      </div>
    </>
  );
};

export default DesktopHeader;
