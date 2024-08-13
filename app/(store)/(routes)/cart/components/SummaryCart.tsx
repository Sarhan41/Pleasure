"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Currency from "@/components/Store/Currency";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useDiscountStore } from "@/hooks/store/use-discount-state";
import Link from "next/link";

interface Coupon {
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  minimumOrderAmount?: number;
  isActive: boolean;
}

interface SummaryProps {
  prices: number[];
  quantities: number[];
  userId?: string | undefined;
}

const Summary: React.FC<SummaryProps> = ({ prices, quantities, userId }) => {
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]); // Fetch coupons state
  const [loading, setLoading] = useState<boolean>(false); // Loading state for applying coupon
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to manage dialog open/close

  const {
    couponCode,
    discount,
    setCouponCode,
    setDiscount,
    couponId,
    setCouponId,
    reset,
  } = useDiscountStore();

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < prices.length; i++) {
      total += prices[i] * quantities[i];
    }
    setOrderTotal(total);
  }, [prices, quantities]);

  useEffect(() => {
    // Fetch active coupons from the database
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          "/api/dashboard/coupons/getActiveCoupons"
        );
        setCoupons(response.data);
      } catch (error) {
        toast.error("Failed to fetch coupons.");
      }
    };
    fetchCoupons();
  }, []);

  const onApplyCoupon = async () => {
    if (couponId) {
      const errorMessage = "A coupon code has already been applied.";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    if (couponCode === localStorage.getItem("couponCode")) {
      reset(); // Reset the store and local storage if the same code is applied again.
    }

    setLoading(true); // Start loading spinner
    try {
      const response = await axios.post("/api/dashboard/coupons/applyCoupon", {
        couponCode,
        orderTotal,
        userId,
      });

      if (response.status === 200) {
        const data = response.data;
        setDiscount(data.discountValue);
        setCouponId(data.couponId);
        setCouponCode(couponCode);
        toast.success("Coupon applied successfully!");
        setIsDialogOpen(false);
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
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const handleCouponClick = (code: string) => {
    setCouponCode(code);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onApplyCoupon();
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
          onKeyDown={handleKeyPress}
        />
        <Button
          onClick={onApplyCoupon}
          className="bg-primary text-white text-sm sm:text-base"
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply Coupon"}
        </Button>
      </div>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Offers</h3>
        <Button onClick={() => setIsDialogOpen(true)} className="text-indigo-600 text-sm">
          Have a discount code? Apply here
        </Button>
        {isDialogOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Available Coupons:
            </h4>
            <ul className="space-y-2">
              {coupons.map((coupon) => (
                <li key={coupon.id} className="border p-2 rounded-md">
                  <div className="font-mono text-lg text-primary font-semibold">
                    {coupon.code}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {coupon.discountType === "PERCENTAGE"
                      ? `${coupon.discountValue}% off`
                      : `₹${coupon.discountValue} off`}
                    {coupon.minimumOrderAmount &&
                      ` on orders over ₹${coupon.minimumOrderAmount}`}
                  </div>
                  <Button
                    onClick={() => handleCouponClick(coupon.code)}
                    className="mt-2 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium py-2 rounded-md shadow-sm transition-all transform hover:scale-105"
                  >
                    Apply This Coupon
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

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
