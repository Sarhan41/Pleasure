"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExtendedUser } from "@/next-auth";
import { useEffect, useState } from "react";

interface ThreeAccordionProps {
  isLoggedin: boolean;
  user?: ExtendedUser;
}

const ThreeAccordion: React.FC<ThreeAccordionProps> = ({
  isLoggedin,
  user,
}) => {
  const [defaultValue, setDefaultValue] = useState(["item-1"]);

  useEffect(() => {
    if (isLoggedin) {
      setDefaultValue(["item-2"]);
    }
  }, [isLoggedin]);

  return (
    <Accordion type="multiple" defaultValue={defaultValue}>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h1 className="font-bold text-3xl text-primary">Login</h1>
        </AccordionTrigger>
        <AccordionContent>
          {isLoggedin ? (
            <p>Welcome, {user?.email}</p>
          ) : (
            <p>Please log in to continue.</p>
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Address Form</AccordionTrigger>
        <AccordionContent>
          {/* Address form goes here */}
          <p>Address Form Content</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Checkout Client Cart</AccordionTrigger>
        <AccordionContent>
          <p>Checkout and payment information</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ThreeAccordion;
