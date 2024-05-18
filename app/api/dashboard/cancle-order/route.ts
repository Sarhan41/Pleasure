import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { orderId } = await request.json();

  try {
    const order = await db.order.update({
      where: { id: orderId },
      data: { status: "Cancelled" },
    });

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.log("[ORDER_CANCEL]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
