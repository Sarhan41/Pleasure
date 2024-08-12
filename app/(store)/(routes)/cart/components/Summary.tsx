"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Currency from "@/components/Store/Currency";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useDiscountStore } from "@/hooks/store/use-discount-state";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { calculateOrderTotal } from "@/app/(store)/(routes)/cart/function/calculateOrderTotal";

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
  const router = useRouter();
  const pathname = usePathname();
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]); // State to store fetched coupons
  const [loading, setLoading] = useState<boolean>(false); // Loading state for applying coupon

  const {
    couponCode,
    discount,
    setCouponCode,
    setDiscount,
    couponId,
    setCouponId,
  } = useDiscountStore();

  useEffect(() => {
    setOrderTotal(calculateOrderTotal(prices, quantities, discount));
  }, [prices, quantities, discount]);

  useEffect(() => {
    // Fetching active coupons from the database
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
      toast.error("A coupon code has already been applied.");
      return;
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
        toast.success("Coupon applied successfully!");
        setIsDialogOpen(false);
      } else {
        const errorData = response.data;
        toast.error(errorData.error);
      }
    } catch (error) {
      toast.error("Failed to apply coupon. Please try again.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const onCheckout = () => {
    window.open(`/cart/checkout?reload=${Date.now()}`, "_blank");
  };

  const isCheckoutPage = pathname.includes("checkout");

  const handleCouponClick = (code: string) => {
    setCouponCode(code);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onApplyCoupon();
    }
  };

  return (
    <div className="max-sm:mt-8 rounded-lg max-md:w-fit md:min-w-full bg-white px-6 py-8 sm:p-8 lg:col-span-5 lg:mt-0 lg:p-10 shadow-lg">
      <Button
        disabled={prices.length === 0}
        onClick={onCheckout}
        className="w-full mb-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-purple-500 text-lg font-semibold py-3 rounded-md shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
      >
        Proceed to Checkout
      </Button>

      <div className="border border-gray-200 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

        <div className="flex items-center justify-between text-base font-medium text-gray-900 mb-4">
          <div>Sub Total</div>
          <Currency value={orderTotal} />
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-medium text-gray-900 mb-4">
            <div>Discount</div>
            <Currency value={discount} />
          </div>
        )}

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

      {!isCheckoutPage && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Offers</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <p className="text-indigo-600 cursor-pointer text-sm hover:underline">
                Have a discount code? Apply here
              </p>
            </DialogTrigger>
            <DialogContent className="rounded-lg shadow-xl p-6 bg-white">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Apply Coupon Code
              </h2>
              <Input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full p-3 border border-gray-300 rounded-md text-sm mb-4"
                placeholder="Enter coupon code"
              />
              <Button
                onClick={onApplyCoupon}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-lg font-medium py-3 rounded-md shadow-lg transition-all transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Applying..." : "Apply Coupon"}
              </Button>
              <div className="mt-6">
                <p className="text-sm text-gray-700 mb-2">Available Coupons:</p>
                <ul className="space-y-4">
                  {coupons.map((coupon) => (
                    <li
                      key={coupon.id}
                      className="border border-gray-300 p-4 rounded-md shadow-sm bg-gray-50"
                    >
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
                      {coupon.code.startsWith("Hello") && (
                        <div className="text-sm text-gray-500 mt-2 font-light">
                          First order discount! Enjoy a special offer{" "}
                          {coupon.discountType === "PERCENTAGE"
                            ? `${coupon.discountValue}% off`
                            : `₹${coupon.discountValue} off`}{" "}
                          on your first purchase over ₹
                          {coupon.minimumOrderAmount}.
                        </div>
                      )}
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
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Summary;
