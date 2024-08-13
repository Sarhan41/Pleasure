"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Currency from "@/components/Store/Currency";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useDiscountStore } from "@/hooks/store/use-discount-state";
import Link from "next/link";

interface SummaryProps {
  prices: number[];
  quantities: number[];
  userId?: string | undefined;
}

const Summary: React.FC<SummaryProps> = ({ prices, quantities, userId }) => {
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null); // Error state
  const {
    couponCode,
    discount,
    setCouponCode,
    setDiscount,
    couponId,
    setCouponId,
  } = useDiscountStore();

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < prices.length; i++) {
      total += prices[i] * quantities[i];
    }
    setOrderTotal(total);
  }, [prices, quantities]);

  const onApplyCoupon = async () => {
    if (couponId) {
      const errorMessage = "A coupon code has already been applied.";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    try {
      const response = await axios.post("/api/dashboard/coupons/applyCoupon", {
        couponCode,
        orderTotal,
        userId,
      });

      if (response.status === 200) {
        const data = response.data;
        setDiscount(data.discountValue);
        setCouponId(data.couponId); // Set the coupon ID in the state
        toast.success("Coupon applied successfully!");
        setError(null); // Clear any previous errors
      } else {
        const errorData = response.data.error;
        setError(errorData); // Set error state
        toast.error(errorData); // Display the error message from the API
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        "Failed to apply coupon. Please try again.";
      setError(errorMessage); // Set error state
      toast.error(errorMessage); // Display a generic error message if no specific error is available
    }
  };

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

      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className={`flex-1 p-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-l text-sm sm:text-base`}
          placeholder="Enter coupon code"
        />
        <Button
          onClick={onApplyCoupon}
          className="bg-primary text-white text-sm sm:text-base"
        >
          Apply Coupon
        </Button>
      </div>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <Link href="/cart/checkout" className="text-sm text-blue-500 mt-4">
        <Button
          disabled={prices.length === 0}
          className="w-full mt-6 bg-pink-600 text-white hover:bg-pink-700 text-sm sm:text-base"
        >
          Checkout
        </Button>
      </Link>
    </div>
  );
};

export default Summary;
