import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const body = await req.json();

    const userId = user?.id;

    const {
      phone,
      alternatePhone,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      state,
      addressType,
    } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!userId) {
      return new NextResponse("You must login for creating Address", {
        status: 404,
      });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    if (!addressLine1) {
      return new NextResponse("Address Line 1 is required", { status: 400 });
    }

    if (!city) {
      return new NextResponse("City is required", { status: 400 });
    }

    if (!state) {
      return new NextResponse("State is required", { status: 400 });
    }

    if (!addressType) {
      return new NextResponse("Address type is required", { status: 400 });
    }

    const address = await db.address.create({
      data: {
        userId,
        phone,
        AlternatePhone: alternatePhone,
        addressLine1,
        addressLine2,
        addressLine3,
        city,
        state,
        AddressType: addressType,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESSES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const addresses = await db.address.findMany();
    return NextResponse.json(addresses);
  } catch (error) {
    console.log("[ADDRESSES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
