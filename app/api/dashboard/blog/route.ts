import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentRole, currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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
      subname,
      content,
      images,
      isArchived,
      isFeatured,
      isNew,
      categoryId,
    } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if(!categoryId) {
      return new NextResponse("Category is required", { status: 400 });
    }

    if (!content) {
      return new NextResponse("Content is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    const blog = await db.blogs.create({
      data: {
        name,
        subname,
        content,
        isArchived,
        isFeatured,
        isNew,
        categoryId,
        imagesBlog: {
          createMany: {
            data: images.map((image: { url: string }) => ({
              url: image.url,
            })),
          },
        },
      },
    });
    revalidatePath("/blog", "page");


    return NextResponse.json(blog);
  } catch (error) {
    console.log("[BLOG_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || undefined;
  const subname = searchParams.get("subname") || undefined;

  try {
    const blogs = await db.blogs.findMany({
      where: {
        name: name ? { contains: name } : undefined,
        subname: subname ? { contains: subname } : undefined,
      },
      include: {
        imagesBlog: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.log("[BLOGS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
