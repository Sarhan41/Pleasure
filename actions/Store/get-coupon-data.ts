import { db } from "@/lib/db";
import { unstable_cache as cache } from "next/cache";

export const getCouponData = async () => {
  const coupons = await db.coupon.findMany({
    where: {
      isActive: true,
      remainingUses: {
        gt: 0, // Ensure there are remaining uses
      },
    },
    select: {
      id: true,
      code: true,
      discountType: true,
      discountValue: true,
      minimumOrderAmount: true,
      isActive: true,
    },
  });

  return { coupons };
};
