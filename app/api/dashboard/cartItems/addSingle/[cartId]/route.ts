import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { cartId: string } }) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const body = await req.json();
    const { quantity } = body;

    if (!params.cartId) {
      return new NextResponse("Cart item ID is required", { status: 400 });
    }

    if (!quantity || quantity <= 0) {
      return new NextResponse("Valid quantity is required", { status: 400 });
    }

    const cartItem = await db.cartItems.findUnique({
      where: {
        id: params.cartId,
      },
      include: {
        color: true,
      },
    });

    if (!cartItem || cartItem.userId !== user.id) {
      return new NextResponse("Cart item not found or unauthorized", {
        status: 404,
      });
    }

    const updatedCartItem = await db.cartItems.update({
      where: {
        id: params.cartId,
      },
      data: {
        quantity: quantity,
      },
      include: {
        color: true,
      },
    });

    return NextResponse.json(updatedCartItem);
  } catch (error) {
    console.error("[CART_ITEM_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
