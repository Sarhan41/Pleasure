import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

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

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const UserId: string = user.id || "";

    const cartItem = await db.cartItems.create({
      data: {
        userId: UserId,
        productId: id,
        sizeName: sizeName,
        color: color,
        price: price,
        quantity: quantity,
        SKUvalue: SKUvalue,
        discountedPrice: discountedPrice,
        category: category,
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
