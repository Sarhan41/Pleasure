import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: NextRequest) {
  const { amount, currency } = (await request.json()) as {
    amount: string;
    currency: string;
  };

  var options = {
    amount: amount,
    currency: currency,
    receipt: "rcp1",
  };
  const order = await razorpay.orders.create(options);
  console.log(order);
  return NextResponse.json({ orderId: order.id }, { status: 200 });
}

export async function GET(req: Request) {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

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
