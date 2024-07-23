"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Currency from "@/components/Store/Currency";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useDiscountStore } from "@/hooks/store/use-discount-state";

interface SummaryProps {
  prices: number[];
  quantities: number[];
  userId?: string | undefined;
}

const Summary: React.FC<SummaryProps> = ({ prices, quantities, userId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const { couponCode, discount, setCouponCode, setDiscount } =
    useDiscountStore();

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < prices.length; i++) {
      total += prices[i] * quantities[i];
    }
    setOrderTotal(total);
  }, [prices, quantities]);

  const onApplyCoupon = async () => {
    try {
      const response = await axios.post("/api/dashboard/coupons/applyCoupon", {
        couponCode,
        orderTotal,
        userId,
      });

      if (response.status === 200) {
        const data = response.data;
        setDiscount(data.discountValue);
        toast.success("Coupon applied successfully!");
      } else {
        const errorData = response.data;
        toast.error(errorData.error);
      }
    } catch (error) {
      toast.error("Failed to apply coupon. Please try again.");
    }
  };

  const onCheckout = () => {
    router.push(`/cart/checkout?reload=${Date.now()}`);
  };

  const isCheckoutPage = pathname.includes("checkout");

  return (
    <div className="mt-8 rounded-lg min-w-full bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 shadow-md">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center w-full justify-between">
          <div className="text-base font-medium text-gray-900">Sub Total</div>
          <Currency value={orderTotal} />
        </div>
        <div className="flex items-center w-full justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Discount</div>
          <Currency value={discount} />
        </div>
        <div className="flex items-center w-full justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Tax</div>
          <Currency value={orderTotal * 0.05} />
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Shipping</div>
          <Currency value={29} />
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">You Pay</div>
          <Currency value={orderTotal - discount + orderTotal * 0.05 + 29} />
        </div>
      </div>
      {!isCheckoutPage && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Discount Codes are added at checkout.
          </p>
        </div>
      )}

      {isCheckoutPage && (
        <div className="mt-4 flex gap-4">
          <Input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l"
            placeholder="Enter coupon code"
          />
          <Button onClick={onApplyCoupon} className="bg-primary text-white">
            Apply Coupon
          </Button>
        </div>
      )}

      {!isCheckoutPage && (
        <Button
          disabled={prices.length === 0}
          onClick={onCheckout}
          className="w-full mt-6 bg-pink-600 text-white hover:bg-pink-700"
        >
          Checkout
        </Button>
      )}
    </div>
  );
};

export default Summary;
