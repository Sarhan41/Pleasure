import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const role = await currentRole();

    const body = await req.json();

    const { name, title, subtitle, imageUrl, link } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    if (!name) {
      return new NextResponse("Name is required ", { status: 400 });
    }

   

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    const billboard = await db.billboard.create({
      data: {
        name,
        imageUrl,
        title,
        subtitle,
        link,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    const billboard = await db.billboard.findMany({});

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
