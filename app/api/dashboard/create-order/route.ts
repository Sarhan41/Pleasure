import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const {
    orderId,
    total,
    status,
    isPaid,
    userId,
    addressId,
    products,
    couponCode,
    couponId, // Make sure to destructure couponId from the request payload
  } = await request.json();

  try {
    if (!orderId) {
      throw new Error("Order ID is missing");
    }

    let discount = 0;
    let finalCouponId = couponId; // Use finalCouponId to avoid shadowing
    let coupon = null;

    if (couponCode) {
      coupon = await db.coupon.findUnique({
        where: { code: couponCode },
      });

      if (coupon && coupon.isActive && coupon.remainingUses > 0) {
        discount =
          coupon.discountType === "PERCENTAGE"
            ? (total * coupon.discountValue) / 100
            : coupon.discountValue;

        finalCouponId = coupon.id; // Update finalCouponId if couponCode is found
      }
    }

    const finalTotal = total - discount;

    const productDetails = await db.product.findMany({
      where: {
        id: {
          in: products.map(
            (product: { productId: string }) => product.productId
          ),
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
      const productDetail = productDetails.find(
        (p) => p.id === product.productId
      );
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
        total: finalTotal,
        status: status,
        isPaid: isPaid,
        userId: userId,
        addressId: addressId,
        orderItems: {
          create: orderItemsData,
        },
        couponId: finalCouponId, // Use finalCouponId here
      },
    });

    if (coupon && finalCouponId) {
      await db.coupon.update({
        where: { id: finalCouponId },
        data: { remainingUses: coupon.remainingUses - 1 },
      });

      await db.usedCoupon.create({
        data: {
          couponId: finalCouponId,
          userId: userId,
        },
      });
    }

    await db.cartItems.deleteMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
}
