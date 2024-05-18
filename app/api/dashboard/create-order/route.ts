import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { orderId, total, status, isPaid, userId, addressId } = await request.json();

  try {
    const order = await db.order.create({
      data: {
        id: orderId,
        total: total,
        status: status,
        isPaid: isPaid,
        userId: userId,
        AddressId: addressId,
        // Add other necessary order details here
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.log("[ORDER_CREATE]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
