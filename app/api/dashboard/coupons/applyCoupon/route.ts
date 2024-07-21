import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { couponCode, orderTotal } = await req.json();

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

    const discountValue =
      coupon.discountType === "PERCENTAGE"
        ? (orderTotal * coupon.discountValue) / 100
        : coupon.discountValue;

    return NextResponse.json({ discountValue }, { status: 200 });
  } catch (error) {
    console.log("[Apply_Coupon_POST]", error);

    return NextResponse.json(
      { error: "Failed to apply coupon." },
      { status: 500 }
    );
  }
}
