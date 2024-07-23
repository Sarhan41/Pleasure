import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const role = await currentRole();

    const body = await req.json();
    const { code, discountType, discountValue, minimumOrderAmount, usageLimit, remainingUses, isActive } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!code) {
      return new NextResponse("Code is required", { status: 400 });
    }

    if (!discountType) {
      return new NextResponse("Discount type is required", { status: 400 });
    }

    if (!discountValue) {
      return new NextResponse("Discount value is required", { status: 400 });
    }

    if (!usageLimit) {
      return new NextResponse("Usage limit is required", { status: 400 });
    }

    if (remainingUses === undefined) {
      return new NextResponse("Remaining uses is required", { status: 400 });
    }

    const coupon = await db.coupon.create({
      data: {
        code,
        discountType: discountType === "percentage" ? "PERCENTAGE" : "FLAT",
        discountValue,
        minimumOrderAmount,
        usageLimit,
        remainingUses,
        isActive,
      },
    });

    return NextResponse.json(coupon);
  } catch (error) {
    console.error("[COUPON_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const coupons = await db.coupon.findMany();
    return NextResponse.json(coupons);
  } catch (error) {
    console.error("[COUPONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
