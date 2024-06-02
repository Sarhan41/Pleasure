import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const MyProfileOrdersPage = async () => {
  const user = await currentUser();

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
              sizes: {
                select: {
                  name: true,
                },
              },
              colors: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return (
    <div className="min-h-fit w-screen  p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center my-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-lg">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg p-6 mb-6"
          >
            <h2 className="text-2xl font-bold mb-4">Order ID: {order.id}</h2>
            <p className="text-xl font-semibold mb-2">Total: ${order.total}</p>
            <p className="text-xl font-semibold mb-2">Status: {order.status}</p>
            <p className="text-xl font-semibold mb-4">
              Paid: {order.isPaid ? "Yes" : "No"}
            </p>
            <h3 className="text-xl font-bold mb-4">Products:</h3>
            <ul className="divide-y divide-gray-200">
              {order.orderItems.map((item) => {
                const productName = item.product.name.replace(/\s+/g, "-");
                return (
                  <Link href={`/product/${productName}`} key={item.id}>
                    <li key={item.id} className="py-4 w-fit flex items-center">
                      <Image
                        src={item.product.images[0].url}
                        alt=""
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                      <div className="ml-4">
                        <p className="text-lg font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Category: {item.product.category.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                        <p className="text-sm text-gray-500">
                          Color: {item.color}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ${item.Price}
                        </p>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
            <p className="text-lg font-semibold mt-4">
              {order.status === "Delivered" ? "Arrived on: " : "Arriving on: "}
              {new Date(order.updatedAt).toLocaleDateString()}
            </p>
            {order.pdfUrl && (
              <Link href={order.pdfUrl} download>
                Download Invoice
              </Link>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyProfileOrdersPage;
