import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { orderId, total, status, isPaid, userId, addressId, products } = await request.json();

  try {
    // Validate orderId
    if (!orderId) {
      throw new Error("Order ID is missing");
    }

    // Fetch product details
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

    // Map products to include additional details
    const orderItemsData = products.map((product: any) => {
      const productDetail = productDetails.find((p) => p.id === product.productId);
      if (!productDetail) {
        throw new Error(`Product with id ${product.productId} not found`);
      }
      return {
        name: productDetail?.name,
        price: parseInt(product.price, 10), // Convert price to integer
        quantity: product.quantity,
        size: product.size,
        color: product.color,
        productId: product.productId,
        sizeSKU: product.sizeSKU,
      };
    });

    // Create the order
    const order = await db.order.create({
      data: {
        id: orderId,
        total: parseInt(total, 10), // Convert total to integer
        status: status,
        isPaid: isPaid,
        userId: userId,
        addressId: addressId,
        orderItems: {
          create: orderItemsData,
        },
      },
    });

    // Empty the cart
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
