"use client";

import { useState } from "react";
import { LoginButton } from "@/components/Auth/AuthUi/LoginButton";
import { LogoutButton } from "@/components/Auth/AuthUi/LogoutButton";
import { SignUpButton } from "@/components/Auth/SignUpButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ExtendedUser } from "@/next-auth";
import { Address } from "@prisma/client";
import { FaCheckCircle } from "react-icons/fa";
import AddressForm from "./AddressForm";
import { useRouter } from "next/navigation";

interface ThreeAccordionProps {
  user?: ExtendedUser;
  addresses: Address[];
}

const ThreeAccordion: React.FC<ThreeAccordionProps> = ({ user, addresses }) => {
  const defaultValue = user ? "item-2" : "item-1";
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const router = useRouter();

  return (
    <Accordion type="single" defaultValue={defaultValue}>
      <AccordionItem
        value="item-1"
        className="rounded-xl overflow-hidden mx-4 md:mx-12 my-4 shadow-lg"
      >
        <AccordionTrigger
          className={`flex px-4 md:px-8 py-4 justify-between items-center ${
            user ? "bg-gray-200 text-gray-700" : "bg-white text-gray-900"
          } transition-colors duration-300`}
        >
          <div className="flex items-center  space-x-2">
            {user && <FaCheckCircle size={24} className="text-green-600" />}
            <h1 className="font-bold text-xl md:text-3xl sm:text-2xl xs:text-xl">
              1.Login
            </h1>
            {user ? <p className="text-gray-600">{user.email}</p> : ""}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {user ? (
            <div className="p-4 md:p-8 bg-gray-50 rounded-b-xl">
              <p className="mb-2">Logged in as {user.email}</p>
              <p className="mb-4">Want to change the account?</p>
              <LogoutButton>
                <Button className="bg-primary text-white px-4 py-2 rounded">
                  Logout
                </Button>
              </LogoutButton>
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center w-full gap-3">
                <LoginButton asChild mode="modal">
                  <Button
                    variant="outline"
                    className="border-primary w-fit hover:bg-primary z-50 hover:text-white"
                    size="lg"
                  >
                    Sign in
                  </Button>
                </LoginButton>
                <SignUpButton asChild mode="modal">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary w-fit hover:bg-primary z-50 hover:text-white"
                  >
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            </>
          )}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-2"
        className="rounded-xl overflow-hidden mx-4 md:mx-12 my-4 shadow-lg"
      >
        <AccordionTrigger className="flex justify-between px-4 md:px-8 py-4 items-center bg-white text-gray-900 transition-colors duration-300">
          <h1 className="font-bold text-xl md:text-3xl">2. Shipping Address</h1>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 md:p-8 bg-gray-50 rounded-b-xl">
            <div className="grid gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedAddress?.id === address.id
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedAddress(address)}
                >
                  <p>{address.addressLine1}</p>
                  <p>{address.addressLine2}</p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>{address.phone}</p>
                </div>
              ))}
              <Button
                onClick={() => {
                  router.push("/my-profile/address");
                }}
                className="mt-4"
              >
                Add New Address
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="item-3"
        className="rounded-xl overflow-hidden mx-4 md:mx-12 my-4 shadow-lg"
      >
        <AccordionTrigger className="flex justify-between px-4 md:px-8 py-4 items-center bg-white text-gray-900 transition-colors duration-300">
          <h1 className="font-bold text-xl md:text-3xl">3. Payment</h1>
        </AccordionTrigger>
        <AccordionContent>
          <div className="p-4 md:p-8 bg-gray-50 rounded-b-xl">
            <p>Checkout and payment information</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ThreeAccordion;
