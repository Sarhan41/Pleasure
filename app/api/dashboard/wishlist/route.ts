import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    const body = await req.json();

    const { id } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const UserId: string = user.id || "";

    const wishlist = await db.wishlist.create({
      data: {
        userId: UserId,
        productId: id,
      },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.log("[WISHLIST_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    const user = await currentUser();
    const role = await currentRole();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const wishlistProducts = await db.wishlist.findMany({
      where: {
        userId: user.id,
      },
      
    });

    return NextResponse.json(wishlistProducts);
  } catch (error) {
    console.log("[WISHLIST_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
