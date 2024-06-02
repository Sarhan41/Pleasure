// OrdersPage.tsx
import { db } from "@/lib/db";
import { format } from "date-fns";
import { OrderColumn } from "./_components/order-types";
import { DataTable } from "./_components/DataTable";
import { Heading } from "@/components/ui/Heading";

const fetchOrders = async () => {
  const orders = await db.order.findMany({
    include: {
      address: true,
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

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    items: order.orderItems.map((item) => ({
      productName: item.product.name,
      size: item.size,
      SUK:item.sizeSKU,
      quantity: item.quantity,
      price: item.price,
      imageUrl: item.product.images[0]?.url || "",
    })),
    phone: order.address.phone,
    address: `${order.address.addressLine1}, ${
      order.address.addressLine2 || ""
    }, ${order.address.addressLine3 || ""}, ${order.address.city}, ${
      order.address.state
    }, ${order.address.pincode}`,
    email: order.user.email || "", // Make email property non-nullable
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, "MMM do, yyyy"),
    totalPayment: order.orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    ),
  }));

  return formattedOrders;
};

const OrdersPage = async () => {
  const orders = await fetchOrders();

  return (
    <div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Orders" description="See details of your store orders" />
        <DataTable<OrderColumn> data={orders} />
      </div>
    </div>
  );
};

export default OrdersPage;
