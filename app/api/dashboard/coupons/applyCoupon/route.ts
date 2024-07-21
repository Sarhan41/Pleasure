import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const user = await currentUser();
  const { code, orderAmount } = await request.json();

  try {
    const coupon = await db.coupon.findUnique({
      where: { code },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    if (!user.id) {
      return NextResponse.json(
        { error: "User ID is missing" },
        { status: 400 }
      );
    }

    if (!coupon) {
      return NextResponse.json(
        { error: "Invalid coupon code" },
        { status: 400 }
      );
    }

    if (!coupon.isActive) {
      return NextResponse.json(
        { error: "Coupon is inactive" },
        { status: 400 }
      );
    }

    if (coupon.usageLimit <= 0 || coupon.remainingUses <= 0) {
      return NextResponse.json(
        { error: "Coupon usage limit reached" },
        { status: 400 }
      );
    }

    if (coupon.minimumOrderAmount && orderAmount < coupon.minimumOrderAmount) {
      return NextResponse.json(
        { error: `Minimum order amount is ${coupon.minimumOrderAmount}` },
        { status: 400 }
      );
    }

    const usedCoupon = await db.usedCoupon.findUnique({
      where: {
        couponId_userId: {
          couponId: coupon.id,
          userId: user.id,
        },
      },
    });

    if (usedCoupon) {
      return NextResponse.json(
        { error: "Coupon already used by this user" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[APPLY_COUPON]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
