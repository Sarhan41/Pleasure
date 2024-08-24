"use server";

import { db } from "@/lib/db";
import toast from "react-hot-toast";

interface OrderStatusProps {
  id: string;
  status: string;
}

export const changeOrderStatus = async ({ id, status }: OrderStatusProps) => {
  try {
    const updatedOrder = await db.order.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    // Return the updated order object
    return updatedOrder;
  } catch (error) {
    // Handle errors
    console.log("[Order_PATCH]", error);
    throw new Error("Error changing order status");
  }
};
