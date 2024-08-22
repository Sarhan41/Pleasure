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
import { generatePdf } from "./DownloadPDFButtonForAdmin";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

interface DataTableProps<TData> {
  data: TData[];
}

// Dynamically import the component with ssr: false
const DownloadPdfButtonAdmin = dynamic(
  () => import("./DownloadPDFButtonForAdmin"),
  { ssr: false }
);

export default DownloadPdfButtonAdmin;

export function DataTable<TData extends OrderColumn>({
  data,
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedOrders, setSelectedOrders] = useState<Record<string, boolean>>(
    {}
  );
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [pendingFilter, setPendingFilter] = useState<boolean | undefined>(
    undefined
  );
  const [completedFilter, setCompletedFilter] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    setIsAllSelected(
      data.length > 0 && Object.keys(selectedOrders).length === data.length
    );
  }, [selectedOrders, data.length]);

  const filteredData = data.filter((item) => {
    if (pendingFilter && item.status !== "Pending") return false;
    if (completedFilter && item.status !== "Completed") return false;
    return true;
  });

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
            setIsAllSelected(checked);
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
      cell: ({ row }) => (
        <span
          className={
            row.original.status === "Cancelled"
              ? "text-red-600 font-semibold"
              : ""
          }
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "couponCode",
      header: "Coupon Code",
      cell: (info) =>
        info.getValue() === "No Coupon" ? "No" : info.getValue(),
    },
    {
      id: "details",
      header: "Details",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Details</Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-4xl mx-auto p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
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
                  <span className="font-semibold">Coupon Code:</span>{" "}
                  {row.original.couponCode}
                </div>
                <div>
                  <span className="font-semibold">Paid:</span>{" "}
                  {row.original.isPaid ? "Yes" : "No"}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  {row.original.status}
                </div>
                {row.original.status === "Cancelled" && (
                  <div>
                    <span className="font-semibold text-red-600">
                      Cancellation Reason:
                    </span>{" "}
                    {row.original.cancellationReason}
                    <br />
                    <span className="font-semibold text-red-600">
                      Canceled At:
                    </span>{" "}
                    {row.original.canceledAt}
                  </div>
                )}
                <div>
                  <span className="font-semibold">Products:</span>
                  <div className="mt-2">
                    <ul className="space-y-2">
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
                            <p className="text-sm text-gray-500">
                              Size: {item.size}
                            </p>
                            <p className="text-sm text-gray-500">
                              SizeSKU: {item.sizeSKU}
                            </p>
                            {item.color && (
                              <div>
                                <p className="text-sm text-gray-500">
                                  Color:{" "}
                                  {item.color
                                    .map((color) => color.name)
                                    .join(", ")}
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
    data: filteredData,
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

  const router = useRouter();

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

  const handleBulkDelete = async () => {
    const selectedOrderIds = Object.keys(selectedOrders).filter(
      (key) => selectedOrders[key]
    );

    if (selectedOrderIds.length === 0) {
      console.error("No orders selected for deletion.");
      return;
    }

    try {
      await axios.delete("/api/dashboard/order/delete-order", {
        data: {
          orderIds: selectedOrderIds,
        },
      });
      router.refresh();
      toast.success("Selected orders deleted successfully");
      router.push(`/dashboard/orders?reload=${Date.now()}`);
    } catch (error) {
      console.error("Error deleting orders:", error);
      toast.error("Failed to delete selected orders");
    }
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
      <div className="flex space-x-2 mb-4">
        <Button
          variant={pendingFilter ? "default" : "outline"}
          onClick={() =>
            setPendingFilter((prev) => (prev === undefined ? true : undefined))
          }
        >
          Show Pending Orders
        </Button>
        <Button
          variant={completedFilter ? "default" : "outline"}
          onClick={() =>
            setCompletedFilter((prev) =>
              prev === undefined ? true : undefined
            )
          }
        >
          Show Completed Orders
        </Button>
      </div>

      <div className="space-x-4 my-4">
        <Button onClick={handleBulkPrint} disabled={!isAllSelected}>
          Bulk Print
        </Button>
        <Button onClick={handleBulkDelete} disabled={!isAllSelected}>
          Bulk Delete
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
