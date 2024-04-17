import React from "react";
import Link from "next/link";
import NavbarActions from "./NavbarActions";
import Container from "@/components/Store/container";
import MainNav from "./MainNav";
import { db } from "@/lib/db";


const Header = async () => {


  const categories = await  db.category.findMany({})

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Header;
