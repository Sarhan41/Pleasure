"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Coupon, DiscountType } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { TrashIcon } from "@radix-ui/react-icons";
import { AlertModal } from "@/app/(admin)/_components/Alert-modal";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

const formSchema = z.object({
  code: z.string().min(1),
  discountType: z.enum(["percentage", "rupees"]),
  discountValue: z.coerce.number().min(0),
  minimumOrderAmount: z.coerce.number().optional(),
  usageLimit: z.coerce.number().min(1),
  remainingUses: z.coerce.number().min(0),
  isActive: z.boolean(),
});

type CouponFormValues = z.infer<typeof formSchema>;

interface CouponFormProps {
  initialData: Coupon | null;
}

export const CouponForm: React.FC<CouponFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Coupon" : "Create Coupon";
  const description = initialData ? "Edit a Coupon" : "Add a new Coupon";
  const toastMessage = initialData ? "Coupon updated." : "Coupon created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CouponFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          code: initialData.code,
          discountType:
            initialData.discountType === "PERCENTAGE" ? "percentage" : "rupees",
          discountValue: initialData.discountValue,
          minimumOrderAmount: initialData.minimumOrderAmount ?? undefined,
          usageLimit: initialData.usageLimit,
          remainingUses: initialData.remainingUses,
          isActive: initialData.isActive,
        }
      : {
          code: "",
          discountType: "percentage",
          discountValue: 0,
          minimumOrderAmount: undefined,
          usageLimit: 1,
          remainingUses: 0,
          isActive: true,
        },
  });

  const onSubmit = async (data: CouponFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/dashboard/coupons/${params.couponId}`, data);
      } else {
        await axios.post(`/api/dashboard/coupons`, data);
      }
      router.refresh();
      router.push(`/dashboard/coupons?reload=${Date.now()}`);
      toast.success(toastMessage);
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
      await axios.delete(`/api/dashboard/coupons/${params.couponId}`);
      router.refresh();
      router.push(`/dashboard/coupons?reload=${Date.now()}`);
      toast.success("Coupon deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={onClose}
        onConfirm={onDelete}
        loading={loading}
        name={initialData?.code || ""}
        menu="Coupon"
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
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
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Coupon code"
                      className="w-fit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-min">
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a discount type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="rupees">Rupees</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Value</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Discount value"
                      className="w-fit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minimumOrderAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Order Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Minimum order amount"
                      className="w-fit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usageLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage Limit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Usage limit"
                      className="w-fit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remainingUses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remaining Uses</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Remaining uses"
                      className="w-fit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row space-x-3 space-y-0 rounded-md border p-4 items-start">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Active</FormLabel>
                    <FormDescription>
                      This code will get applied
                    </FormDescription>
                  </div>
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
    </>
  );
};
