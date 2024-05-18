import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Address } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";
import DeleteIcon from "./DeleteIcon";

interface AddressInfoProps {
  addresses: Address[];
  label: string;
}

export const AddressInfo = ({ addresses, label }: AddressInfoProps) => {
  return (
    <div className="flex flex-col w-full mt-6 space-y-4 px-4">
      <div className="flex justify-between   mb-4">
        <h2 className="text-3xl font-semibold">{label}</h2>
        <Link href="/my-profile/address/new">
          <Button>Add Address</Button>
        </Link>
      </div>

      {addresses.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-gray-500 font-normal text-base">
            No addresses found
          </h1>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses?.map((address, index) => (
          <Card key={address.id} className="w-full shadow-md">
            <CardHeader className="flex items-center justify-between p-4">
              <p className="text-lg font-medium">Address {index + 1}</p>
              <div className="flex space-x-2">
                <Link href={`/my-profile/address/${address.id}`}>
                  <Button variant="outline" size="sm">
                    <Pencil1Icon className="h-4 w-4" />
                  </Button>
                </Link>
                <DeleteIcon addressId={address.id} />
              </div>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Address Line 1</p>
                <p className="truncate text-xs font-mono bg-slate-100 rounded-md p-1 dark:text-black">
                  {address.addressLine1}
                </p>
              </div>
              {address.addressLine2 && (
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Address Line 2</p>
                  <p className="truncate text-xs font-mono bg-slate-100 rounded-md p-1 dark:text-black">
                    {address.addressLine2}
                  </p>
                </div>
              )}
              {address.addressLine3 && (
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Address Line 3</p>
                  <p className="truncate text-xs font-mono bg-slate-100 rounded-md p-1 dark:text-black">
                    {address.addressLine3}
                  </p>
                </div>
              )}
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">City</p>
                <p className="truncate text-xs font-mono bg-slate-100 rounded-md p-1 dark:text-black">
                  {address.city}
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">State</p>
                <p className="truncate text-xs font-mono bg-slate-100 rounded-md p-1 dark:text-black">
                  {address.state}
                </p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Phone</p>
                <p className="truncate text-xs font-mono bg-slate-100 rounded-md p-1 dark:text-black">
                  {address.phone}
                </p>
              </div>
              {address.AlternatePhone && (
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Alternate Phone</p>
                  <p className="truncate text-xs font-mono bg-slate-100 rounded-md p-1 dark:text-black">
                    {address.AlternatePhone}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
