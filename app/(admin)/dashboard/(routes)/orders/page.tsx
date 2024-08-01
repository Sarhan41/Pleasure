// pages/admin/orders.tsx
import { db } from "@/lib/db";
import { format } from "date-fns";
import { OrderColumn } from "./_components/order-types";
import { DataTable } from "./_components/DataTable";
import { Heading } from "@/components/ui/Heading";
import { currentRole, currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const fetchOrders = async () => {
  const orders = await db.order.findMany({
    include: {
      address: true,
      user: true,
      coupon: true, // Include coupon information
      orderItems: {
        include: {
          product: {
            select: {
              name: true,
              images: true,
            },
          },
          color: true, // Include color data
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders = orders.map((order) => ({
    id: order.id,
    items: order.orderItems.map((item) => ({
      productName: item.product.name,
      size: item.size,
      color: item.color.map((c) => ({
        value: c.value,
        name: c.name, // Include color name
      })),
      sizeSKU: item.sizeSKU,
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
    email: order.user.email || "",
    userName: order.user.name || "",
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, "MMM do, yyyy"),
    totalPayment: order.total,
    status: order.status,
    couponCode: order.coupon ? order.coupon.code : "No Coupon", // Add coupon code information
  }));

  return formattedOrders;
};

const OrdersPage = async () => {
  const user = await currentUser();
  const role = await currentRole();

  if (!user) {
    redirect("/login");
  }

  if (role !== "ADMIN") {
    redirect("/my-profile");
  }
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
