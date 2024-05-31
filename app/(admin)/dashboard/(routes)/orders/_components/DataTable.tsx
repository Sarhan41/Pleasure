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

interface DataTableProps<TData> {
  data: TData[];
}

export function DataTable<TData extends OrderColumn>({ data }: DataTableProps<TData>) {
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
      id: "details",
      header: "Details",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedOrder(row.original)}>Details</Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-4xl p-6  rounded-lg shadow-lg">
            <DialogTitle className="text-2xl font-semibold text-gray-900">Order Details</DialogTitle>
            <DialogDescription>
              <OrderDetails selectedOrder={selectedOrder} />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      ),
    },
  ];

  const OrderDetails: React.FC<{ selectedOrder: TData | null }> = ({ selectedOrder }) => {
    if (!selectedOrder) return null;
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex flex-col gap-4">
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Paid:</strong> {selectedOrder.isPaid ? "Yes" : "No"}</p>
            <p><strong>Date:</strong> {selectedOrder.createdAt}</p>
            <p><strong>Total Payment:</strong> ₹{selectedOrder.totalPayment}</p>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold mb-4">Products:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto max-h-60">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex flex-col items-center p-4 border border-gray-300 rounded-lg">
                  <Image src={item.imageUrl} alt="" width={80} height={80} className="rounded-md" />
                  <p className="text-lg font-medium mt-2">{item.productName}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

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
          placeholder="Filter Products..."
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
