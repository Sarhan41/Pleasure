import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    const body = await req.json();

    const { id, quantity } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const UserId: string = user.id || "";

    const cartItem = await db.cartItems.create({
      data: {
        userId: UserId,
        quantity: quantity,
        productId: id,
      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.log("[CARTITEMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const cartItemsProducts = await db.cartItems.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(cartItemsProducts);
  } catch (error) {
    console.log("[CARTITEMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
