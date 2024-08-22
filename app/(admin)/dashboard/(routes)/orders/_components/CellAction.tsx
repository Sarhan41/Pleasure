"use client";

import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { OrderColumn } from "./order-types"; // Adjust the import to match your order types
import { changeOrderStatus } from "@/actions/dashboard/change-order-status";

interface CellActionProps {
  data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleOrderStatus = async () => {
    setLoading(true);
    try {
      const newStatus = data.status === "Completed" ? "Pending" : "Completed";

      const orderData = {
        id: data.id,
        status: newStatus,
      };

      await changeOrderStatus(orderData);
      router.refresh();
      router.push(`/dashboard/orders?reload(${Date.now()})`);

      toast.success(`Order status changed to ${newStatus}`);
    } catch (error) {
      toast.error("Error changing order status");
      console.log("[Order_PATCH]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {data.status === "Completed" ? (
            <DropdownMenuItem onClick={toggleOrderStatus} disabled={loading}>
              Set to Pending
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={toggleOrderStatus} disabled={loading}>
              Mark as Completed
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
