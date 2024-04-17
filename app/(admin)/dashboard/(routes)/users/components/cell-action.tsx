"use client";

import { MoreHorizontal } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
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
import { UserColumn } from "./columns";
import { changeUserRole } from "@/actions/auth/changerole";

interface CellActionProps {
  data: UserColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const changeRole = async () => {
    setLoading(true);
    try {
      const userData = {
        id: data.id,
        name: data.name,
        role: data.role,
      };

      changeUserRole(userData);
      router.refresh();
      router.push(`/dashboard/users?reload(${Date.now()})`);

      toast.success("Role changed successfully");
    } catch (error) {
      toast.error("Error changing role");
      console.log("[User_PATCH]", error);
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
          {data.role === "ADMIN" ? (
            <DropdownMenuItem onClick={changeRole}>
              Change role to User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={changeRole}>
              Change role to Admin
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
