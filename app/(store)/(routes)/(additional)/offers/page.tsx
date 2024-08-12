"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Coupon {
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  minimumOrderAmount?: number;
  isActive: boolean;
}

const OffersPage: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          "/api/dashboard/coupons/getActiveCoupons"
        );
        setCoupons(response.data);
      } catch (error) {
        toast.error("Failed to fetch coupons.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center py-12 px-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
          Available Offers
        </h1>
        <div className="space-y-8">
          {loading ? (
            <p className="text-xl text-gray-700 text-center">
              Loading offers...
            </p>
          ) : coupons.length > 0 ? (
            coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="border-4 border-transparent bg-gradient-to-br from-yellow-300 to-yellow-500 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
              >
                <div className="font-mono flex items-center justify-between text-3xl text-primary font-semibold">
                  <h3 className="text-2xl text-black">Code:</h3>
                  <span className="bg-black text-white px-3 py-1 rounded-md">
                    {coupon.code}
                  </span>
                </div>
                <div className="text-xl text-gray-700 mt-4">
                  {coupon.discountType === "PERCENTAGE"
                    ? `${coupon.discountValue}% off`
                    : `₹${coupon.discountValue} off`}
                  {coupon.minimumOrderAmount &&
                    ` on orders over ₹${coupon.minimumOrderAmount}`}
                </div>
                {coupon.code.startsWith("Hello") && (
                  <div className="text-md text-gray-600 mt-4 font-light">
                    🎉 First order discount! Enjoy a special offer{" "}
                    {coupon.discountType === "PERCENTAGE"
                      ? `${coupon.discountValue}% off`
                      : `₹${coupon.discountValue} off`}{" "}
                    on your first purchase over ₹{coupon.minimumOrderAmount}.
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-700 text-center">
              No coupons available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
