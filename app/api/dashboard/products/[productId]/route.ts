import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
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

    if (!params.productId) {
      return new NextResponse("Product Id is required", { status: 400 });
    }

    const product = await db.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        colors: true,
        size: true,

      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { productId: string } }) {
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
      return new NextResponse("Size Id is required ", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color Id is required ", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("images is required ", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Product Id Is Required", { status: 400 });
    }

    await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colors: {
          deleteMany: {},
        },
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        colors: {
          createMany: {
            data: colorId.map((color: { name: string; hex: string }) => ({
              name: color.name,
              value: color.hex,
            })),
          },
        },
      },
      include: {
        images: true,
        category: true,
        size: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
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
    if (!params.productId) {
      return new NextResponse("Product Id Is Required", { status: 400 });
    }

    const product = await db.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
