// OrdersPage.tsx
import { db } from "@/lib/db";
import { format } from "date-fns";
import { OrderColumn } from "./_components/order-types";
import { DataTable } from "./_components/DataTable";
import { Heading } from "@/components/ui/Heading";

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
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Orders"
          description="See details of your store orders"
        />
        <DataTable<OrderColumn> data={orders} />
      </div>
    </div>
  );
};

export default OrdersPage;
