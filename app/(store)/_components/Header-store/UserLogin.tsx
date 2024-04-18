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

const UserLogin = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

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
              <Button
                className="mb-2"
                onClick={() => console.log("Login clicked")}
              >
                Login
              </Button>

              {/* Signup button */}
              <Button
                variant="outline"
                onClick={() => console.log("Signup clicked")}
              >
                Signup
              </Button>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};


export default UserLogin;