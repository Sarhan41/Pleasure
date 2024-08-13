import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { couponCode, orderTotal, userId } = await req.json();

    if (!couponCode) {
      return NextResponse.json(
        { error: "Coupon code is required." },
        { status: 400 }
      );
    }

    const coupon = await db.coupon.findUnique({
      where: { code: couponCode },
    });

    if (!coupon || !coupon.isActive || coupon.remainingUses <= 0) {
      return NextResponse.json(
        { error: "Invalid or expired coupon code." },
        { status: 400 }
      );
    }

    if (coupon.minimumOrderAmount && !orderTotal) {
      return NextResponse.json(
        { error: "Order total is required." },
        { status: 400 }
      );
    }

    if (coupon.minimumOrderAmount && orderTotal < coupon.minimumOrderAmount) {
      return NextResponse.json(
        { error: "Minimum order amount not met." },
        { status: 400 }
      );
    }

    const hasUsedCoupon = await db.usedCoupon.findFirst({
      where: { couponId: coupon.id, userId: userId },
    });

    if (hasUsedCoupon) {
      return NextResponse.json(
        { error: "This coupon code has already been used." },
        { status: 400 }
      );
    }

    const discountValue =
      coupon.discountType === "PERCENTAGE"
        ? (orderTotal * coupon.discountValue) / 100
        : coupon.discountValue;

    return NextResponse.json(
      { discountValue, couponId: coupon.id },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Apply_Coupon_POST]", error);

    return NextResponse.json(
      { error: "Failed to apply coupon." },
      { status: 500 }
    );
  }
}
