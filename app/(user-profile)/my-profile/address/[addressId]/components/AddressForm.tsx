"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Address } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

// ###########################################################
// Local Imports
// ###########################################################

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  alternatePhone: z.string().optional(),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(1, "Pincode is required"),
  addressType: z.string().min(1, "Address type is required"),
});

type AddressFormValues = z.infer<typeof formSchema>;

interface AddressFormProps {
  initialData: Address | null;
}

const normalizeInitialData = (
  data: Address | null
): Partial<AddressFormValues> => {
  if (!data) {
    return {
      phone: "",
      alternatePhone: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      state: "",
      addressType: "",
      pincode: "",
    };
  }

  return {
    phone: data.phone,
    alternatePhone: data.AlternatePhone ?? undefined,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2 ?? undefined,
    addressLine3: data.addressLine3 ?? undefined,
    pincode: data.pincode,
    city: data.city,
    state: data.state,
    addressType: data.AddressType,
  };
};

export const AddressForm: React.FC<AddressFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Address" : "Create Address";
  const description = initialData ? "Edit an address" : "Add a new address";
  const toastMessage = initialData ? "Address updated." : "Address created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: normalizeInitialData(initialData),
  });

  const onSubmit = async (data: AddressFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/dashboard/addresses/${params.addressId}`, data);
      } else {
        await axios.post(`/api/dashboard/addresses`, data);
      }
      router.refresh();
      toast.success(toastMessage);
      router.push(`/my-profile/address?reload=${Date.now()}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/dashboard/addresses/${params.addressId}`);
      router.refresh();
      toast.success("Address deleted.");
      router.push(`/my-profile/address?reload=${Date.now()}`);
    } catch (error) {
      toast.error(
        "Make sure you cleared your all Orders using this Address first. "
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <section className="border border-gray-200 p-8 rounded-lg">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={onDelete}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="+91"
                      {...field}
                      className="w-full"
                      defaultValue={+91}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alternatePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternate Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Alternate phone number"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Address Line 1"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Address Line 2"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 3</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Address Line 3"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="City"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="State"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PinCode</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="PinCode"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Type</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Address Type (e.g., Home, Office)"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </section>
  );
};
