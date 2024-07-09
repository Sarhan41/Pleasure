import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeaderProps } from "../Header";
import { MenuIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import NavbarActions from "../Desktop/NavbarActions";
import Search from "../Desktop/Search";

export default function MobileHeaderIndex({
  categories,
  allProducts,
  UserId,
}: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative">
      <header className="flex items-center justify-between p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-40">
        <div onClick={toggleSidebar} className="cursor-pointer mr-2">
          <MenuIcon size={24} />
        </div>

        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center overflow-hidden justify-center gap-2"
          >
            <Image
              src="/logo-text.png"
              height={40}
              width={150}
              alt="Pleasure"
              className="object-cover"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Search allProducts={allProducts} />
          <NavbarActions userId={UserId} />
        </div>
      </header>

      <div className="relative z-40" onClick={closeSidebar}>
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          categories={categories}
        />
      </div>
    </div>
  );
}
