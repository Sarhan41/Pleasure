// DataTable.tsx
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderColumn } from "./order-types";

interface DataTableProps<TData> {
  data: TData[];
}

export function DataTable<TData extends OrderColumn>({
  data,
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedOrder, setSelectedOrder] = useState<TData | null>(null);

  const columns: ColumnDef<OrderColumn>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: (info) => (
        <img src={info.getValue() as string} alt="Product" width="50" />
      ),
    },
    {
      accessorKey: "productName",
      header: "Product Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "isPaid",
      header: "Paid",
      cell: (info) => (info.getValue() ? "Yes" : "No"),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: (info) => info.getValue(),
    },

    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "totalPayment",
      header: "Total Payment",
      cell: (info) => `$${info.getValue()}`,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by product name..."
          value={
            (table.getColumn("productName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("productName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          onClick={() => {
            table.getColumn("productName")?.setFilterValue("");
          }}
          variant="outline"
          className="ml-2"
        >
          Reset
        </Button>
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
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => setSelectedOrder(row.original as TData)}>
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                          {selectedOrder && (
                            <div>
                              <p>
                                <strong>Product Name:</strong>{" "}
                                {selectedOrder.productName}
                              </p>
                              <p>
                                <strong>Size:</strong> {selectedOrder.size}
                              </p>
                              <p>
                                <strong>Phone:</strong> {selectedOrder.phone}
                              </p>
                              <p>
                                <strong>Address:</strong>{" "}
                                {selectedOrder.address}
                              </p>
                              <p>
                                <strong>Email:</strong>{" "}
                                {selectedOrder.email ?? "N/A"}
                              </p>
                              <p>
                                <strong>Paid:</strong>{" "}
                                {selectedOrder.isPaid ? "Yes" : "No"}
                              </p>
                              <p>
                                <strong>Date:</strong> {selectedOrder.createdAt}
                              </p>
                              <p>
                                <strong>Image:</strong>{" "}
                                <img
                                  src={selectedOrder.imageUrl}
                                  alt="Product"
                                  width="50"
                                />
                              </p>
                              <p>
                                <strong>Quantity:</strong>{" "}
                                {selectedOrder.quantity}
                              </p>
                              <p>
                                <strong>Total Payment:</strong>{" "}
                                {selectedOrder.totalPayment}
                              </p>
                            </div>
                          )}
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
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
