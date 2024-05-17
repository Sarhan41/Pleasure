import razorpay from "razorpay";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Initialize Razorpay instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const { productIds } = await req.json();
  const User = await currentUser();

  if (!User) {
    return new NextResponse("Please Login to Place Order", { status: 401 });
  }

  const userId = User.id;

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product Ids are required", { status: 400 });
  }

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // Prepare order data
  const orderItems = productIds.map((productId: string) => ({
    product: {
      connect: {
        id: productId,
      },
    },
  }));

  // Create order in your database
  const order = await db.order.create({
    data: {
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  // Prepare line items for Razorpay
  const line_items = products.map((product) => ({
    name: product.name,
    amount: product.price * 100, // Amount in paise
    currency: "INR",
    quantity: 1,
  }));

  // Create Razorpay order
  const razorpayOrder = await razorpayInstance.orders.create({
    amount: products.reduce((acc, curr) => acc + curr.price, 0) * 100, // Total amount in paise
    currency: "INR",
    receipt: `order_${order.id}`, // You can customize receipt id as per your requirement
    notes: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    {
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      url: razorpayOrder.receipt,
    },
    { headers: corsHeaders }
  );
}
