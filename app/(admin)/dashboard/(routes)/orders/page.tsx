// OrdersPage.tsx
import { db } from "@/lib/db";
import { format } from "date-fns";
import { OrderColumn } from "./_components/order-types";
import { DataTable } from "./_components/DataTable";

const fetchOrders = async () => {
  const orders = await db.order.findMany({
    include: {
      Address: true,
      user: true,
      orderItems: {
        include: {
          product: {
            select: {
              name: true,
              images: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.flatMap((order) =>
    order.orderItems.map((item) => ({
      id: order.id,
      productName: item.product.name,
      size: item.size,
      quantity: item.quantity,
      price: item.Price,
      phone: order.Address.phone,
      address: `${order.Address.addressLine1}, ${
        order.Address.addressLine2 || ""
      }, ${order.Address.addressLine3 || ""}, ${order.Address.city}, ${
        order.Address.state
      }, ${order.Address.pincode}`,
      email: order.user.email || "", // Make email property non-nullable
      isPaid: order.isPaid,
      createdAt: format(order.createdAt, "MMM do, yyyy"),
      imageUrl: item.product.images[0]?.url || "",
      totalPayment: item.quantity * item.Price,
    }))
  );

  return formattedOrders;
};

const OrdersPage = async () => {
  const orders = await fetchOrders();

  return (
    <div>
      <h1>Orders</h1>
      <DataTable<OrderColumn> data={orders} />
    </div>
  );
};

export default OrdersPage;
