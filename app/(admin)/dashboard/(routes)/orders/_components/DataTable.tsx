"use client";

import React, { useState, useEffect } from "react";
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
import { OrderColumn } from "./order-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DownloadPdfButtonAdmin, { generatePdf } from "./DownloadPDFButtonForAdmin";

interface DataTableProps<TData> {
  data: TData[];
}

export function DataTable<TData extends OrderColumn>({ data }: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedOrders, setSelectedOrders] = useState<Record<string, boolean>>({});
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    setIsAllSelected(
      data.length > 0 && Object.keys(selectedOrders).length === data.length
    );
  }, [selectedOrders, data.length]);

  const columns: ColumnDef<TData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={(e) => {
            const checked = e.target.checked;
            setSelectedOrders(
              checked
                ? Object.fromEntries(data.map((order) => [order.id, true]))
                : {}
            );
          }}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={!!selectedOrders[row.original.id]}
          onChange={(e) => {
            const checked = e.target.checked;
            setSelectedOrders((prev) => {
              const updated = { ...prev, [row.original.id]: checked };
              if (!checked) {
                delete updated[row.original.id];
              }
              return updated;
            });
          }}
        />
      ),
    },
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
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "couponCode",
      header: "Coupon Code",
      cell: (info) => (info.getValue() === "No Coupon" ? "No" : info.getValue()),
    },
    {
      id: "details",
      header: "Details",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Details</Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-4xl p-6 rounded-lg shadow-lg">
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Order Details
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Phone:</span> {row.original.phone}
                </div>
                <div>
                  <span className="font-semibold">Address:</span> {row.original.address}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {row.original.email}
                </div>
                <div>
                  <span className="font-semibold">Total Payment:</span> ₹
                  {row.original.totalPayment}
                </div>
                <div>
                  <span className="font-semibold">Coupon Code:</span> {row.original.couponCode}
                </div>
                <div>
                  <span className="font-semibold">Paid:</span> {row.original.isPaid ? "Yes" : "No"}
                </div>
                <div>
                  <span className="font-semibold">Status:</span> {row.original.status}
                </div>
                <div>
                  <span className="font-semibold">Products:</span>
                  <ul className="space-y-2 mt-2">
                    {row.original.items.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Image
                          src={item.imageUrl}
                          alt=""
                          width={50}
                          height={50}
                          className="rounded-md mr-4"
                        />
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-gray-500">Size: {item.size}</p>
                          <p className="text-sm text-gray-500">SizeSKU: {item.sizeSKU}</p>
                          {item.color && (
                            <div>
                              <p className="text-sm text-gray-500">
                                Color: {item.color.map((color) => color.name).join(", ")}
                              </p>
                              <div className="flex space-x-1">
                                {item.color.map((color, idx) => (
                                  <span
                                    key={idx}
                                    style={{
                                      backgroundColor: color.value,
                                    }}
                                    className="block h-4 w-4 rounded-sm border border-gray-600"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <DownloadPdfButtonAdmin order={row.original} userName={row.original.userName} />
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
          <DownloadPdfButtonAdmin order={row.original} userName={row.original.userName} />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      rowSelection: selectedOrders,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleBulkPrint = () => {
    const selectedOrderIds = Object.keys(selectedOrders).filter(
      (key) => selectedOrders[key]
    );

    if (selectedOrderIds.length === 0) {
      console.error("No orders selected for printing.");
      return;
    }

    selectedOrderIds.forEach((orderId) => {
      const order = data.find((item) => item.id === orderId);
      if (order) {
        generatePdf(order, order.userName);
      } else {
        console.error("Order not found for orderId: ", orderId);
      }
    });
  };

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
      <Button onClick={handleBulkPrint} disabled={Object.keys(selectedOrders).length === 0}>
        Print Selected Invoices
      </Button>
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
