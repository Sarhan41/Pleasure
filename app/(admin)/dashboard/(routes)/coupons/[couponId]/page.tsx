import { db } from "@/lib/db";
import { CouponForm } from "./components/CouponForm";

const CouponPage = async ({
  params,
}: {
  params: { couponId: string };
}) => {
  const coupon = await db.coupon.findUnique({
    where: {
      id: params.couponId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CouponForm initialData={coupon} />
      </div>
    </div>
  );
};

export default CouponPage;
