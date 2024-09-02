"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "./components/navigation";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { LoginButton } from "./Button/loginButton";
import { SignUpButton } from "./Button/signupButton";
import { LogoutButton } from "@/components/Auth/AuthUi/LogoutButton";
import Dialog from "./components/dialog";

interface UserLoginProps {
  userId: string | undefined;
  userName: string | undefined | null;
}

const UserLogin = ({ userId, userName }: UserLoginProps) => {
  return (
    <div className=" w-fit z-40 relative">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-black data-[state=open]:bg-black data-[active]:bg-black  hover:bg-black pr-5  text-white ">
              <Link prefetch={true} area-label="Link" href="/my-profile">
                <FaUser className="h-5 w-5 max-sm:h-4 max-sm:w-4  text-white bg-black " />
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-full md:w-80 px-4  py-6 bg-white border border-gray-200 rounded-lg shadow-lg  z-50 ">
              <h2 className="text-lg font-bold mb-1">
                Welcome to the store,{" "}
                <span className="text-primary font-extrabold">{userName}</span>
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                Access your pleasure account
              </p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-10 mt-4 justify-between  z-50 ">
                {userId ? (
                  <div className="flex flex-col gap-8">
                    <Link prefetch={true} area-label="Link" href="/my-profile">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-primary hover:bg-primary hover:text-white z-50 w-full"
                      >
                        My Profile
                      </Button>
                    </Link>
                    <Link prefetch={true} area-label="Link" href="/wishlist">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-primary hover:bg-primary hover:text-white z-50 w-full"
                      >
                        Wishlist
                      </Button>
                    </Link>
                    <Link prefetch={true} area-label="Link" href="/my-profile/orders">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-primary hover:bg-primary hover:text-white z-50 w-full"
                      >
                        My Orders
                      </Button>
                    </Link>
                    <Link prefetch={true} area-label="Link" href="/order-tracking">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-primary hover:bg-primary hover:text-white w-full"
                      >
                        Track My Order
                      </Button>
                    </Link>
                    <LogoutButton>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-primary hover:bg-primary hover:text-white z-50 w-full"
                      >
                        Logout
                      </Button>
                    </LogoutButton>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center gap-3">
                    <LoginButton>
                      <Button
                        variant="outline"
                        className="border-primary hover:bg-primary z-50 hover:text-white"
                        size="lg"
                      >
                        Sign in
                      </Button>
                    </LoginButton>
                    <SignUpButton>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-primary hover:bg-primary z-50 hover:text-white"
                      >
                        Create an account
                      </Button>
                    </SignUpButton>
                  </div>
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Dialog />
    </div>
  );
};

export default UserLogin;
