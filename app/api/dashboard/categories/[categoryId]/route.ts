import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    const user = await currentUser();
    const role = await currentRole();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const user = await currentUser();
    const role = await currentRole();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();

    const { name, title, imageUrl } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category Id Is Required", { status: 400 });
    }

    const category = await db.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        imageUrl,
        title,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const user = await currentUser();
    const role = await currentRole();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category Id Is Required", { status: 400 });
    }

    const category = await db.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
