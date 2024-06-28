import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
 

    if (!params.billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }

    const billboard = await db.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string } }
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

    const { name, title, imageUrl, subtitle, link } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }


    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard Id is Required", { status: 400 });
    }

    const Billboard = await db.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        name,
        imageUrl,
        title,
        subtitle,
        link,
      },
    });

    return NextResponse.json(Billboard);
  } catch (error) {
    console.log("[BILLBOARDS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string } }
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

    if (!params.billboardId) {
      return new NextResponse("Billboard Id Is Required", { status: 400 });
    }

    const billboard = await db.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
