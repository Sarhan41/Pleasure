"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type BlogColumn = {
  id: string;
  name: string;
  subname: string | null;
  isArchived: boolean;
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
};

export const columns: ColumnDef<BlogColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "subname",
    header: "SubName",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => <div>{row.original.isArchived ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => <div>{row.original.isFeatured ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "isNew",
    header: "New",
    cell: ({ row }) => <div>{row.original.isNew ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
