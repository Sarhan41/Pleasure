import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function DELETE(
  req: Request,
  { params }: { params: { reviewId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.reviewId) {
      return new NextResponse("Review ID is required", { status: 400 });
    }

    const review = await db.review.findUnique({
      where: {
        id: params.reviewId,
      },
      select: {
        product: {
          select: {
            name: true,
          },
        },
        userId: true,
      },
    });

    if (!review) {
      return new NextResponse("Review not found", { status: 404 });
    }

    // Ensure that only the review's author or an admin can delete the review
    if (review.userId !== user.id && user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await db.review.delete({
      where: {
        id: params.reviewId,
      },
    });

    // Format the product name for the URL
    const formattedProductName = review.product.name.replace(/\s+/g, "-");

    // Revalidate the product page associated with the review
    if (formattedProductName) {
      revalidatePath(`/product/${formattedProductName}`, "page");
    }

    return new NextResponse("Review deleted successfully", { status: 200 });
  } catch (error) {
    console.log("[REVIEW_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
