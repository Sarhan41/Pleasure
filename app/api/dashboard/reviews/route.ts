import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const userId = user.id;

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const body = await req.json();
    const { name, productId, rating, comment, images, title } = body;

    // Basic validation
    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return new NextResponse("Rating must be a number between 1 and 5", {
        status: 400,
      });
    }

    if (!title || title.trim().length === 0) {
      return new NextResponse("Title is required", { status: 400 });
    }

    // if (!comment || comment.trim().length === 0) {
    //   return new NextResponse("Comment is required", { status: 400 });
    // }

    // Check if the user has already reviewed this product
    if (user.role === "USER") {
      const existingReview = await db.review.findFirst({
        where: {
          productId,
          userId,
        },
      });

      if (existingReview) {
        return new NextResponse(
          "You have already reviewed this product, please delete that review and try again.",
          { status: 400 }
        );
      }

      // Ensure the user has purchased the product
      const userOrders = await db.order.findMany({
        where: {
          userId,
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

    // Create the review
    const review = await db.review.create({
      data: {
        name,
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

    revalidatePath(`/product/${productId}`, "page");

    return NextResponse.json(review);
  } catch (error) {
    console.error("[REVIEW_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
