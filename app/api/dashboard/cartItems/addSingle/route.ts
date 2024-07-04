import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const body = await req.json();
    const {
      id,
      sizeName,
      color,
      price,
      quantity,
      SKUvalue,
      discountedPrice,
      category,
    } = body;

    const UserId: string = user.id || "";

    const cartItem = await db.cartItems.create({
      data: {
        userId: UserId,
        productId: id,
        sizeName: sizeName,
        price: price,
        quantity: quantity,
        SKUvalue: SKUvalue,
        discountedPrice: discountedPrice,
        category: category,
        color: {
          create: color,
        },
      },
      include: {
        color: true,
      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.log("[CARTITEMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
