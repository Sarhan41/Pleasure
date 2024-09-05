// pages/profile/orders.tsx
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import OrderItem from "./components/OrderItem";

export const revalidate = 60;

// Define cache function
const getUserOrders = async (userId: string | undefined) => {
  return await db.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      orderItems: {
        include: {
          product: {
            include: {
              images: {
                select: {
                  url: true,
                },
              },
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
          color: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      address: true,
    },
  });
};

const MyProfileOrdersPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await getUserOrders(user.id);

  const formattedOrders = orders.map((order) => ({
    ...order,
    userName: user.name,
    phone: order.address.phone,
    email: user.email,
    totalPayment: order.total, // assuming `order.total` is the total payment
    address: [
      order.address.addressLine1,
      order.address.addressLine2,
      order.address.addressLine3,
      order.address.city,
      order.address.state,
      order.address.pincode,
    ]
      .filter(Boolean)
      .join(", "),
    items: order.orderItems.map((item) => ({
      productName: item.product.name,
      imageUrl: item.product.images[0]?.url || "",
      size: item.size,
      color: item.color.map((color) => ({
        name: color.name,
        value: color.value,
      })),
      quantity: item.quantity,
      price: item.price,
    })),
  }));

  return (
    <div className="min-h-fit w-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center my-6">My Orders</h1>
      {formattedOrders.length === 0 ? (
        <p className="text-center text-lg">You have no orders yet.</p>
      ) : (
        formattedOrders.map((order) => (
          <OrderItem key={order.id} order={order} userName={user.name} />
        ))
      )}
    </div>
  );
};

export default MyProfileOrdersPage;
