import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";

export async function GET(req: Request) {
  const user = await currentUser();

  try {
    const MyOrders = await db.order.findMany({
      where: {
        id: user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(MyOrders);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
