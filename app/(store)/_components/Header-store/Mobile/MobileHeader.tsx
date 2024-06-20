import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeaderProps } from "../Header";
import { MenuIcon } from "lucide-react";

export default function MobileHeaderIndex({
  categories,
  allProducts,
  UserId,
}: HeaderProps) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <header className="flex">
        {/* =============================================================================
        // ? Side Menu icon
        ==================================================================================
        */}
        <div onClick={toggleSidebar} className="cursor-pointer mr-2">
          <MenuIcon size={24} />
        </div>

        {/* =============================================================================
        // ? logo
        ==================================================================================
        */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center overflow-hidden justify-center gap-8"
          >
            <Image
              src="/logo-text.png"
              height={10}
              width={298}
              alt="Pleasure"
              className="object-cover"
            />
          </Link>
        </div>

        {/* =============================================================================
        // ? search
        ==================================================================================
        */}
        <div></div>

        {/* =============================================================================
        // ?wishlist
        ==================================================================================
        */}
        <div></div>

        {/* =============================================================================
        // ? Cart icon
        ==================================================================================
        */}
        <div></div>
      </header>

      {/* =============================================================================
      // ? Sidebar
      ==================================================================================
      */}
     
    </div>
  );
}
