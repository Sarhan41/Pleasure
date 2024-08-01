// pages/profile/orders.tsx
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import DownloadPdfButton from "./DownloadPDFButton";
import { redirect } from "next/navigation";

const MyProfileOrdersPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await db.order.findMany({
    where: {
      userId: user?.id,
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
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg p-6 mb-6"
          >
            <h2 className="text-2xl font-bold mb-4">Order ID: {order.id}</h2>
            <p className="text-xl font-semibold mb-2">
              Total: ₹{order.totalPayment}
            </p>
            <p className="text-xl font-semibold mb-2">Status: {order.status}</p>
            <p className="text-xl font-semibold mb-4">
              Paid: {order.isPaid ? "Yes" : "No"}
            </p>
            <h3 className="text-xl font-bold mb-4">Products:</h3>
            <ul className="divide-y divide-gray-200">
              {order.items.map((item, index) => {
                const productName = item.productName.replace(/\s+/g, "-");
                return (
                  <Link area-label="Link" href={`/product/${productName}`} key={index}>
                    <li className="py-4 w-fit flex items-center">
                      <Image
                        src={item.imageUrl}
                        alt=""
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                      <div className="ml-4">
                        <p className="text-lg font-medium">
                          {item.productName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                        <p className="text-sm text-gray-500">
                          Colors:{" "}
                          {item.color.map((color) => color.name).join(", ")}
                        </p>
                        <div className="flex space-x-1">
                          {item.color.map((color, idx) => (
                            <span
                              key={idx}
                              style={{ backgroundColor: color.value }}
                              className="block h-4 w-4 rounded-sm border border-gray-600"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ₹{item.price}
                        </p>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
            <DownloadPdfButton order={order} userName={user.name} />
          </div>
        ))
      )}
    </div>
  );
};

export default MyProfileOrdersPage;
