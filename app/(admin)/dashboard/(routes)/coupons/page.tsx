import { format } from "date-fns";

import { db } from "@/lib/db";
import { CouponColumn } from "./components/columns";
import { CouponClient } from "./components/client";
import { currentRole, currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const CouponsPage = async () => {

  const user = await currentUser();
  const role = await currentRole();

  if (!user) {
    redirect("/login");
  }

  if (role !== "ADMIN") {
    redirect("/my-profile");
  }
  const coupons = await db.coupon.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCoupons: CouponColumn[] = coupons.map((item) => ({
    id: item.id,
    code: item.code,
    discountType: item.discountType,
    discountValue: item.discountValue,
    minimumOrderAmount: Number(item.minimumOrderAmount) || 0,
    usageLimit: item.usageLimit,
    remainingUses: item.remainingUses,
    isActive: item.isActive ? "Active" : "Inactive",
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CouponClient data={formattedCoupons} />
      </div>
      <div></div>
    </div>
  );
};

export default CouponsPage;
