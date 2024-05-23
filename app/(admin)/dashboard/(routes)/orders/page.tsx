import { format } from "date-fns";
import { db } from "@/lib/db";
import { formatter } from "@/lib/utils";
import { DataTable } from "./_components/DataTable";
import { OrderColumn } from "./_components/order-types";

const OrdersPage = async () => {
  const orders = await db.order.findMany({
    include: {
      Address: true,
      user: true,
      orderItems: {
        include: {
          product: {
            select: {
              name: true,
              images: true, // Assuming 'images' is the field that holds the product image URLs
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
    productName: order.orderItems.map(item => item.product.name).join(", "),
    size: order.orderItems.map(item => item.size).join(", "),
    phone: order.Address.phone,
    address: `${order.Address.addressLine1}, ${order.Address.addressLine2 || ""}, ${order.Address.addressLine3 || ""}, ${order.Address.city}, ${order.Address.state}, ${order.Address.pincode}`,
    email: order.user.email,
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, "MMM do, yyyy"),
    imageUrl: order.orderItems[0]?.product.images[0]?.url || "", // Taking the first image URL
    quantity: order.orderItems.reduce((total, item) => total + item.quantity, 0), // Summing up quantities
    totalPayment: order.total // Total payment
  }));

  return (
    <div>
      <h1>Orders</h1>
      <DataTable<OrderColumn> data={formattedOrders} />
    </div>
  );
};

export default OrdersPage;
