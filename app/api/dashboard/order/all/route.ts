import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const MyOrders = await db.order.findMany({
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
