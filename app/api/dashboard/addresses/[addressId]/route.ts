import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {  currentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { addressId: string } }
) {
  try {
    if (!params.addressId) {
      return new NextResponse("Address ID is required", { status: 400 });
    }

    const address = await db.address.findUnique({
      where: {
        id: params.addressId,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { addressId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

  

    const body = await req.json();

    const { phone, alternatePhone, addressLine1, addressLine2, addressLine3, city, state, addressType } = body;

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

    if (!params.addressId) {
      return new NextResponse("Address ID is required", { status: 400 });
    }

    const address = await db.address.update({
      where: {
        id: params.addressId,
      },
      data: {
        phone,
        AlternatePhone: alternatePhone,
        addressLine1,
        addressLine2,
        addressLine3,
        city,
        state,
        AddressType : addressType,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { addressId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

   
    if (!params.addressId) {
      return new NextResponse("Address ID is required", { status: 400 });
    }

    const address = await db.address.delete({
      where: {
        id: params.addressId,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
