"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Currency from "@/components/Store/Currency";
import { Button } from "@/components/ui/button";
import { CartItems } from "@prisma/client";
import { useRouter } from "next/navigation";

interface SummaryProps {
  prices: number[];
  quantities: number[];
  products: CartItems[];
}

const Summary: React.FC<SummaryProps> = ({ prices, quantities, products }) => {
  const router = useRouter();
  const [orderTotal, setOrderTotal] = useState<number>(0);

  useEffect(() => {
    // Calculate order total based on prices and quantities
    let total = 0;
    for (let i = 0; i < prices.length; i++) {
      total += prices[i] * quantities[i];
    }
    setOrderTotal(total);
  }, [prices, quantities]);

  const onCheckout = async () => {
    if (products.length === 0) {
      toast.error("No items in cart");
      return;
    }

    router.push("/checkout/?amount=" + orderTotal);
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <Currency value={orderTotal} />
        </div>
      </div>
      <Button
        disabled={prices.length === 0}
        onClick={onCheckout}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
