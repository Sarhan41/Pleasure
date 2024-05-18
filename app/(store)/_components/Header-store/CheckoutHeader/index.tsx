"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserIcon } from "lucide-react";

const CheckoutHeader = ({ userId }: { userId: string | undefined }) => {
  return (
    <header className="w-full px-4 sm:px-10 lg:px-16 bg-white shadow-md z-50 transition-all duration-300">
      <div className="flex flex-col lg:flex-row items-center justify-between py-2">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo.jpg"
              height={48}
              width={58}
              alt="Logo"
              className="rounded-full object-cover hidden sm:block"
            />
            <Image
              src="/logo-text.png"
              height={10}
              width={200}
              alt="Pleasure"
              className="object-cover"
            />
          </Link>
        </div>
        <div className="flex gap-2 mt-2 lg:mt-0">
          <div className="text-center">
            <Link href="/my-profile">
              <UserIcon size={48} className="p-2 border-r-2" />
            </Link>
          </div>
          <div className="text-center p-2 border-r-2 text-xs">FREE RETURNS</div>
          <div className="text-center p-2 border-r-2 text-xs">100% PRIVACY</div>
          <div className="text-center p-2 border-r-2 text-xs">CASH ON DELIVERY</div>
          <div className="text-center p-2 text-xs">FREE SHIPPING*</div>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;
