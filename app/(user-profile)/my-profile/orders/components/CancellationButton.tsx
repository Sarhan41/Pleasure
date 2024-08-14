"use client";
import { useState } from "react";
import axios from "axios";
import { EllipsisVerticalIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogOverlay,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CancellationButtonProps {
  orderId: string;
}

const CancellationButton: React.FC<CancellationButtonProps> = ({ orderId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);
  const openDialog = () => {
    setIsOpen(false);
    setIsDialogOpen(true);
  };
  const closeDialog = () => setIsDialogOpen(false);

  const handleCancelOrder = async () => {
    try {
      await axios.patch("/api/dashboard/cancle-order", {
        orderId,
        cancellationReason,
      });

      toast.success("Order cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel the order");
    } finally {
      closeDialog();
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="text-gray-600">
        <EllipsisVerticalIcon className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            onClick={openDialog}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Cancel Order
          </button>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogDescription>
              Please provide a reason for canceling the order.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Enter cancellation reason"
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <DialogFooter>
            <button
              onClick={closeDialog}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleCancelOrder}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Confirm
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CancellationButton;
