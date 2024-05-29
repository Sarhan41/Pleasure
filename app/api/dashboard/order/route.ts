// /api/dashboard/order route
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  const { amount } = await request.json() as { amount: number };

  if (amount < 100) {
    return NextResponse.json({ 
      error: {
        code: 'BAD_REQUEST_ERROR',
        description: 'Order amount less than minimum amount allowed'
      }
    }, { status: 400 });
  }

  const options = {
    amount,
    currency: "INR",
    receipt: "rcp1",
  };
  
  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
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
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                images: {
                  select: {
                    url: true,
                  },
                },
                category: {
                  select: {
                    name: true,
                  },
                },
                sizes: {
                  select: {
                    name: true,
                  },
                },
                colors: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
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

export async function DELETE(req: Request) {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  try {
    await db.order.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
