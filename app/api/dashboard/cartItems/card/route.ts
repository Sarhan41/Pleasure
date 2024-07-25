import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const body = await req.json();
    const {
      productId,
      sizeName,
      price,
      quantity,
      SKUvalue,
      discountedPrice,
      category,
    } = body;

    const UserId: string = user.id || "";

    // Create the cart item along with related colors
    const cartItem = await db.cartItems.create({
      data: {
        userId: UserId,
        productId: productId,
        sizeName: sizeName,
        price: price,
        quantity: quantity,
        SKUvalue: SKUvalue,
        discountedPrice: discountedPrice,
        category: category,
      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.log("[CARTITEMS_POST_CARD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
