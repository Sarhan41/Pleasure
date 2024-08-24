import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    const userId = user?.id;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!userId) {
      return new NextResponse("You must login for creating Address", {
        status: 404,
      });
    }

    const body = await req.json();
    const { productId, rating, comment, images, title } = body;

    // Basic validation
    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return new NextResponse("Rating must be a number between 1 and 5", {
        status: 400,
      });
    }
    if (!comment || comment.trim().length === 0) {
      return new NextResponse("Comment is required", { status: 400 });
    }

    const existingReview = await db.review.findFirst({
      where: {
        productId,
        userId: user.id,
      },
    });

    if (existingReview) {
      return new NextResponse(
        "You have already reviewed this product, please delete that review and try again.",
        { status: 400 }
      );
    }

    if (user.role === "USER") {
      const userOrders = await db.order.findMany({
        where: {
          userId: user.id,
          orderItems: {
            some: {
              productId,
            },
          },
        },
      });

      if (userOrders.length === 0) {
        return new NextResponse(
          "You are not a verified buyer of this product, you can't review or rate this.",
          { status: 403 }
        );
      }
    }

    // Creating the review
    const review = await db.review.create({
      data: {
        productId,
        rating,
        comment,
        title,
        userId,
        images:
          images && images.length > 0
            ? {
                createMany: {
                  data: images.map((url: string) => ({ url })),
                },
              }
            : undefined,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("[REVIEW_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
