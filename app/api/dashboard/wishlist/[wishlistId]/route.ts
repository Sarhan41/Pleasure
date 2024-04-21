import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { wishlistId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = user.id;

    if (!params.wishlistId) {
      return new NextResponse("Wishlist id is required", { status: 400 });
    }

    const wishlist = await db.wishlist.delete({
      where: {
        userId: userId,
        id: params.wishlistId,
      },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.log("[WISHLIST_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
