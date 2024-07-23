"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CouponColumn = {
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  minimumOrderAmount?: number;
  usageLimit: number;
  remainingUses: number;
  isActive: string;
  createdAt: string;
};

export const columns: ColumnDef<CouponColumn>[] = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "discountType",
    header: "Discount Type",
  },
  {
    accessorKey: "discountValue",
    header: "Discount Value",
  },
  {
    accessorKey: "minimumOrderAmount",
    header: "Minimum Order Amount",
  },
  {
    accessorKey: "usageLimit",
    header: "Usage Limit",
  },
  {
    accessorKey: "remainingUses",
    header: "Remaining Uses",
  },
  {
    accessorKey: "isActive",
    header: "Status",
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
