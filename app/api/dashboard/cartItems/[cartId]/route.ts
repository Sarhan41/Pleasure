import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { CartItemsId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = user.id;

    if (!params.CartItemsId) {
      return new NextResponse("Wishlist id is required", { status: 400 });
    }

    const cartItems = await db.cartItems.delete({
      where: {
        userId: userId,
        id: params.CartItemsId,
      },
    });

    return NextResponse.json(cartItems);
  } catch (error) {
    console.log("[WISHLIST_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function PUT(
  req: Request,
  { params }: { params: { CartId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = user.id;

    console.log(params.CartId)

    if (!params.CartId) {
      return new NextResponse("Cart item ID is required", { status: 400 });
    }

    const updatedCartItem = await db.cartItems.update({
      where: {
        userId: userId,
        id: params.CartId,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(updatedCartItem);
  } catch (error) {
    console.error("[CART_ITEM_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}