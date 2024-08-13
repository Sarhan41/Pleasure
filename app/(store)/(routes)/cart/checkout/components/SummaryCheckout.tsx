"use client";

import React, { useState, useEffect } from "react";
import Currency from "@/components/Store/Currency";
import { Button } from "@/components/ui/button";
import { useDiscountStore } from "@/hooks/store/use-discount-state";

interface SummaryProps {
  prices: number[];
  quantities: number[];
  userId?: string | undefined;
}

const SummaryCheckout: React.FC<SummaryProps> = ({ prices, quantities, userId }) => {
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const { discount } = useDiscountStore();

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < prices.length; i++) {
      total += prices[i] * quantities[i];
    }
    setOrderTotal(total);
  }, [prices, quantities]);

  return (
    <div className="max-sm:mt-8 rounded-lg max-md:w-fit md:min-w-full bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 shadow-md">
      <h2 className="text-lg font-medium text-gray-900 sm:text-xl md:text-2xl lg:text-3xl">
        Order Summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center w-full justify-between text-sm sm:text-base md:text-lg lg:text-base">
          <div className="font-medium text-gray-900">Sub Total</div>
          <Currency value={orderTotal} />
        </div>
        <div className="flex items-center w-full justify-between border-t border-gray-200 pt-4 text-sm sm:text-base md:text-lg lg:text-base">
          <div className="font-medium text-gray-900">Discount</div>
          <Currency value={discount} />
        </div>
        <div className="flex items-center w-full justify-between border-t border-gray-200 pt-4 text-sm sm:text-base md:text-lg lg:text-base">
          <div className="font-medium text-gray-900">Tax</div>
          <Currency value={orderTotal * 0.05} />
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-sm sm:text-base md:text-lg lg:text-base">
          <div className="font-medium text-gray-900">Shipping</div>
          <Currency value={29} />
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-sm sm:text-base md:text-lg lg:text-base">
          <div className="font-medium text-gray-900">You Pay</div>
          <Currency value={orderTotal - discount + orderTotal * 0.05 + 29} />
        </div>
      </div>
    </div>
  );
};

export default SummaryCheckout;
