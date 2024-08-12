"use client";

import React, { useState, useEffect } from "react";
import Currency from "@/components/Store/Currency";
import { useDiscountStore } from "@/hooks/store/use-discount-state";
import { calculateOrderTotal } from "@/app/(store)/(routes)/cart/function/calculateOrderTotal";

interface SummaryCheckoutProps {
  prices: number[];
  quantities: number[];
}

const SummaryCheckout: React.FC<SummaryCheckoutProps> = ({
  prices,
  quantities,
}) => {
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const { discount } = useDiscountStore();

  useEffect(() => {
    setOrderTotal(calculateOrderTotal(prices, quantities, discount));
  }, [prices, quantities, discount]);

  return (
    <div className="rounded-lg bg-white px-6 py-8 sm:p-8 lg:col-span-5 lg:p-10 shadow-lg">
      <div className="border border-gray-200 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

        <div className="flex items-center justify-between text-base font-medium text-gray-900 mb-4">
          <div>Sub Total</div>
          <Currency value={orderTotal} />
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-medium text-gray-900 mb-4">
          <div>Discount</div>
          <Currency value={discount} />
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-medium text-gray-900 mb-4">
          <div>Estimated Tax</div>
          <Currency value={orderTotal * 0.05} />
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-medium text-gray-900 mb-4">
          <div>Shipping</div>
          <Currency value={orderTotal > 500 ? 0 : 50} />
        </div>

        <div className="border-t border-gray-200 pt-4 text-xl font-extrabold text-gray-900 flex justify-between">
          <div>You Pay</div>
          <Currency
            value={
              orderTotal -
              discount +
              orderTotal * 0.05 +
              (orderTotal > 500 ? 0 : 50)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryCheckout;
