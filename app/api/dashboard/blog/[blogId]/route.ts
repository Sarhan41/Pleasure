import { currentRole, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    if (!params.blogId) {
      return new NextResponse("Blog Id is required", { status: 400 });
    }

    const blog = await db.blogs.findUnique({
      where: {
        id: params.blogId,
      },
      include: {
        ImagesBlog: true,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log("[BLOG_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string } }
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
    const { name, subname, content, images, isFeatured, isArchived, isNew } =
      body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!content) {
      return new NextResponse("Content is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("At least one image is required", {
        status: 400,
      });
    }

    if (!params.blogId) {
      return new NextResponse("Blog Id is required", { status: 400 });
    }

    await db.blogs.update({
      where: {
        id: params.blogId,
      },
      data: {
        name,
        subname,
        content,
        isFeatured,
        isArchived,
        isNew,
        ImagesBlog: {
          deleteMany: {},
        },
      },
    });

    const blog = await db.blogs.update({
      where: {
        id: params.blogId,
      },
      data: {
        ImagesBlog: {
          createMany: {
            data: images.map((image: { url: string }) => ({ url: image.url })),
          },
        },
      },
      include: {
        ImagesBlog: true,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log("[BLOG_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { blogId: string } }
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

    if (!params.blogId) {
      return new NextResponse("Blog Id is required", { status: 400 });
    }

    await db.imagesBlog.deleteMany({
      where: {
        blogId: params.blogId,
      },
    });

    const blog = await db.blogs.delete({
      where: {
        id: params.blogId,
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.log("[BLOG_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
