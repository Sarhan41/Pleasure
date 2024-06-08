// _components/DataTable.tsx
"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { OrderColumn, OrderItem } from "./order-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DownloadPdfButtonAdmin from "./DownloadPDFButtonForAdmin";

interface DataTableProps<TData> {
  data: TData[];
}

export function DataTable<TData extends OrderColumn>({
  data,
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedOrder, setSelectedOrder] = useState<TData | null>(null);

  const columns: ColumnDef<TData>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "isPaid",
      header: "Paid",
      cell: (info) => (info.getValue() ? "Yes" : "No"),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
    },
    {
      accessorKey: "totalPayment",
      header: "Total Payment",
    },
    {
      accessorKey: "status", // Ensure status column is included
      header: "Status",
    },
    {
      id: "details",
      header: "Details",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedOrder(row.original)}>
              Details
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-4xl p-6 rounded-lg shadow-lg">
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Order Details
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Phone:</span>{" "}
                  {row.original.phone}
                </div>
                <div>
                  <span className="font-semibold">Address:</span>{" "}
                  {row.original.address}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {row.original.email}
                </div>
                <div>
                  <span className="font-semibold">Total Payment:</span> ₹
                  {row.original.totalPayment}
                </div>
                <div>
                  <span className="font-semibold">Paid:</span>{" "}
                  {row.original.isPaid ? "Yes" : "No"}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  {row.original.status} {/* Display status */}
                </div>
                <div>
                  <span className="font-semibold">Products:</span>
                  <ul className="space-y-2 mt-2">
                    {row.original.items.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          width={50}
                          height={50}
                          className="rounded-md mr-4"
                        />
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-gray-500">
                            Size: {item.size}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-500">
                            Price: ₹{item.price}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <DownloadPdfButtonAdmin
                    order={row.original}
                    userName={row.original.userName}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "Download",
      header: "Download Invoice",
      cell: ({ row }) => (
        <div>
          <DownloadPdfButtonAdmin
            order={row.original}
            userName={row.original.userName}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter order..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
