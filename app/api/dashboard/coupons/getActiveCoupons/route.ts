import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Fetch all active coupons from the database
    const activeCoupons = await db.coupon.findMany({
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

    if (activeCoupons.length === 0) {
      return NextResponse.json(
        { message: "No active coupons available." },
        { status: 200 }
      );
    }

    return NextResponse.json(activeCoupons, { status: 200 });
  } catch (error) {
    console.log("[Get_Active_Coupons_GET]", error);

    return NextResponse.json(
      { error: "Failed to fetch active coupons." },
      { status: 500 }
    );
  }
}
