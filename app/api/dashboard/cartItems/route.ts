import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";



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
        color: true,
      },
    });

    return NextResponse.json(cartItemsProducts);
  } catch (error) {
    console.log("[CARTITEMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const cartItemsProductsDelete = await db.cartItems.deleteMany({
      where: {
        userId: user.id,
      },
    });
    return NextResponse.json(cartItemsProductsDelete);
  } catch (error) {
    console.log("[CARTITEMS_DELETE_ALL]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
