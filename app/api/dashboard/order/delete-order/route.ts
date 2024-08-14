import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";

export async function DELETE(request: NextRequest) {
  try {
    const { orderIds } = await request.json();

    const user = await currentUser();
    const role = await currentRole();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return new NextResponse("Invalid input", { status: 400 });
    }

    const result = await db.order.deleteMany({
      where: {
        id: { in: orderIds },
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
