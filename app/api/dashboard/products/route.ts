import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";

export async function POST(req: Request) {
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
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
      description,
    } = body;

    if (!name) {
      return new NextResponse("Name is required ", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required ", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required ", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("SizeId is required ", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("ColorId is required ", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("images is required ", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required ", { status: 400 });
    }

    const product = await db.product.create({
      data: {
        name,
        price,
        categoryId,
        colors: {
          createMany: {
            data: colorId.map(
              (color: { name: string; hex: string; link: string }) => ({
                name: color.name,
                value: color.hex,
                toLink: color.link,
              })
            ),
          },
        },
        description: description,
        sizes: {
          createMany: {
            data: sizeId.map(
              (size: {
                name: string;
                value: string | number;
                quantity: number;
              }) => ({
                name: size.name,
                value: size.value,
                quantity: size.quantity,
              })
            ),
          },
        },
        images: {
          createMany: {
            data: images.map((image: { url: string }) => image),
          },
        },
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId") || undefined;
  const colorId = searchParams.get("colorId") || undefined;
  const sizeId = searchParams.get("sizeId") || undefined;
  const isFeatured = searchParams.get("isFeatured");

  try {
    const product = await db.product.findMany({
      where: {
        categoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        colors: true,
        sizes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
