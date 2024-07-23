"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type UserColumn = {
  id: string;
  name: string;
  role: string;
  email: string;
  newsletter: boolean;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "newsletter",
    header: "Newsletter",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
