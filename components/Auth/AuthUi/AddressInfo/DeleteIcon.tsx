"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteIcon = ({ addressId }: { addressId: string }) => {
  const router = useRouter();

  const onclick = async () => {
    await axios.delete(`/api/dashboard/addresses/${addressId}`);
    toast.success("Address deleted successfully");
    router.push(`/my-profile/address?reload=${Date.now()}`);
  };
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={onclick}
    >
      <Trash2Icon className="h-4 w-4" />
    </Button>
  );
};

export default DeleteIcon;
