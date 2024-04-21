import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = user.id;

    if (!params.cartId) {
      return new NextResponse("Cart item ID is required", { status: 400 });
    }

    const cartItem = await db.cartItems.delete({
      where: {
        userId: userId,
        id: params.cartId,
      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.log("[CART_ITEM_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    const user = await currentUser();
    const body = await req.json();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = user.id;

    if (!params.cartId) {
      return new NextResponse("Cart item ID is required", { status: 400 });
    }

    const { quantity } = body; // Assuming quantity is sent in the request body

    const updatedCartItem = await db.cartItems.update({
      where: {
        userId: userId,
        id: params.cartId,
      },
      data: {
        quantity: quantity, // Update quantity here
      },
    });

    return NextResponse.json(updatedCartItem);
  } catch (error) {
    console.error("[CART_ITEM_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
