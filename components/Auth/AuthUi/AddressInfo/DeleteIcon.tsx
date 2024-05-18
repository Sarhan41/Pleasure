"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash2Icon } from "lucide-react";

const DeleteIcon = ({ addressId }: { addressId: string }) => {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => axios.delete(`/api/dashboard/${addressId}`)}
    >
      <Trash2Icon className="h-4 w-4" />
    </Button>
  );
};

export default DeleteIcon;
