import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  const { orderId, cancellationReason } = await request.json();

  const user = await currentUser();

  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = await db.order.findFirst({
    where: {
      id: orderId,
      userId: userId,
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.status !== "Pending") {
    return NextResponse.json(
      { error: "Order can only be cancelled if it is pending" },
      { status: 400 }
    );
  }

  if (order.canceled) {
    return NextResponse.json(
      { error: "Order is already cancelled" },
      { status: 400 }
    );
  }

  if (!cancellationReason) {
    return NextResponse.json(
      { error: "Cancellation reason is required" },
      { status: 400 }
    );
  }

  if (order.userId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const order = await db.order.update({
      where: { id: orderId },
      data: {
        status: "Cancelled",
        canceledAt: new Date(),
        canceled: true,
        cancellationReason: cancellationReason,
      },
    });

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.log("[ORDER_CANCEL]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
