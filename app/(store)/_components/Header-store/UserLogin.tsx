"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Divide, User2Icon } from "lucide-react";
import { LoginButton } from "@/components/Auth/AuthUi/LoginButton";
import Link from "next/link";
import { SignUpButton } from "@/components/Auth/SignUpButton";
import { FaUser } from "react-icons/fa";
import { LogoutButton } from "@/components/Auth/AuthUi/LogoutButton";

interface UserLoginProps {
  userId: string | undefined;
}

const UserLogin = ({ userId }: UserLoginProps) => {
  return (
    <div className=" w-fit  z-40 relative">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {/*    */}
            <NavigationMenuTrigger className=" bg-black data-[state=open]:bg-black data-[active]:bg-black  hover:bg-black   text-white ">
              <Link href="/my-profile">
                <FaUser className="h-6 w-6 max-sm:h-4 max-sm:w-4  text-white bg-black" />
              </Link>
            </NavigationMenuTrigger>
            <div className="">
              <NavigationMenuContent className="w-full md:w-80 px-4 py-6 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ">
                {/* Welcome message */}

                <h2 className="text-lg font-bold mb-1">Welcome to the store</h2>

                <p className="text-sm text-gray-600 mb-2">
                  Access your pleasure account
                </p>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-10 mt-4 justify-between  z-50 ">
                  {userId ? (
                    <div className="flex flex-col gap-8">
                      <Link href="/my-profile">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-primary hover:bg-primary hover:text-white z-50 w-full"
                        >
                          My Profile
                        </Button>
                      </Link>
                      <Link href="/wishlist">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-primary hover:bg-primary hover:text-white z-50 w-full"
                        >
                          Wishlist
                        </Button>
                      </Link>
                      <Link href="/my-orders">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-primary hover:bg-primary hover:text-white z-50 w-full"
                        >
                          My Orders
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
                    <>
                      <div className="z-50">
                        <LoginButton asChild mode="modal">
                          <Button
                            variant="outline"
                            className="border-primary hover:bg-primary z-50 hover:text-white"
                            size="lg"
                          >
                            Sign in
                          </Button>
                        </LoginButton>
                      </div>
                      <div className="z-50">
                        <SignUpButton asChild mode="modal">
                          <Button
                            size="lg"
                            variant="outline"
                            className="border-primary hover:bg-primary z-50 hover:text-white"
                          >
                            Sign up
                          </Button>
                        </SignUpButton>
                      </div>
                    </>
                  )}
                </div>
              </NavigationMenuContent>
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default UserLogin;
