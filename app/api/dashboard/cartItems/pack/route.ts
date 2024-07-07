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
      colors,
      price,
      quantity,
      SKUvalue,
      discountedPrice,
      category,
    } = body;

    const userId: string = user.id || "";

    // Create the cart item along with related colors
    const cartItem = await db.cartItems.create({
      data: {
        userId: userId,
        productId: productId,
        sizeName: sizeName,
        price: price,
        quantity: quantity,
        SKUvalue: SKUvalue,
        discountedPrice: discountedPrice,
        category: category,
        color: {
          create: colors.map((c: { value: string; name: string }) => ({
            value: c.value,
            name: c.name,
          })),
        },
      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.log("[CARTITEMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
