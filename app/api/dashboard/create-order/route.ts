import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { orderId, total, status, isPaid, userId, addressId, products } = await request.json();

  try {
    if (!orderId) {
      throw new Error("Order ID is missing");
    }

    const productDetails = await db.product.findMany({
      where: {
        id: {
          in: products.map((product: { productId: string }) => product.productId),
        },
      },
      select: {
        id: true,
        name: true,
        sizes: true,
      },
    });

    if (productDetails.length === 0) {
      return NextResponse.json({ error: "No products found" }, { status: 400 });
    }

    const orderItemsData = products.map((product: any) => {
      const productDetail = productDetails.find((p) => p.id === product.productId);
      if (!productDetail) {
        throw new Error(`Product with id ${product.productId} not found`);
      }
      return {
        name: productDetail.name,
        price: parseInt(product.price, 10),
        quantity: product.quantity,
        size: product.size,
        productId: product.productId,
        sizeSKU: product.sizeSKU,
        color: {
          create: product.color.map((color: any) => ({
            value: color.value,
            name: color.name,
          })),
        },
      };
    });

    const order = await db.order.create({
      data: {
        id: orderId,
        total: parseInt(total, 10),
        status: status,
        isPaid: isPaid,
        userId: userId,
        addressId: addressId,
        orderItems: {
          create: orderItemsData,
        },
      },
    });

    await db.cartItems.deleteMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.log("[ORDER_CREATE]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
