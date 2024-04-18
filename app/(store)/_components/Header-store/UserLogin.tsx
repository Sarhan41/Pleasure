"use client";

import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
} from "@/components/ui/navigation-menu"; // Import the navigation menu components
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { LoginButton } from "@/components/Auth/AuthUi/LoginButton";

const UserLogin = () => {
  return (
    <div className="ml-4 relative">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <UserIcon className="h-7 w-7" />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* Welcome message */}
              <p className="text-sm text-gray-600 mb-2">Welcome to the store</p>

              {/* Login button */}
              <div>
                <LoginButton asChild mode="modal">
                  <Button variant="default" size="lg">
                    Sign in
                  </Button>
                </LoginButton>
              </div>

              {/* Signup button */}
              {/* <div>
                <div asChild>
                  <Button variant="default" size="lg">
                    Sign in
                  </Button>
                </div>
              </div> */}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default UserLogin;
