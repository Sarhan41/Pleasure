"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
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
import { AlertModal } from "@/app/(admin)/_components/Alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z
    .object({ name: z.string(), hex: z.string(), link: z.string() })
    .array(),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
        colors: Color[];
      })
    | null;
  categories: Category[];
  sizes: Size[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
}) => {
  const params = useParams();
  const router = useRouter();
  console.log(initialData);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Product" : "Create Product";
  const description = initialData ? "Edit your Product" : "Add a new Product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          colorId: initialData.colors.map((color) => ({
            name: color.name,
            hex: color.value,
            link: color.toLink,
          })),
          price: parseFloat(String(initialData?.price)),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          colorId: [{ name: "", hex: "#000000", link: "" }],
          sizeId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/dashboard/products/${params.productId}`, data);
      } else {
        await axios.post(`/api/dashboard/products`, data);
      }
      router.refresh();
      router.push(`/dashboard/products?reload(${Date.now()}`);
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
      await axios.delete(`/api/dashboard/products/${params.productId}`);
      router.refresh();
      router.push(`/dashboard/products`);
      toast.success("Product deleted.");
    } catch (error) {
      toast.error("Something went wrong. ");
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
        name={initialData?.name || ""}
        menu="Product"
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
            <Trash className="h-4 w-4 " />
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {" "}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2  gap-8 max-sm:grid-cols-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="max-sm:w-[30vw]  w-[22vw] ">
                  <FormLabel>Name</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      disabled={loading}
                      placeholder="Product Name"
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
              name="price"
              render={({ field }) => (
                <FormItem className="max-sm:w-[30vw]  w-[22vw] ">
                  <FormLabel>Price</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
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
              name="categoryId"
              render={({ field }) => (
                <FormItem className="max-sm:w-[35vw] w-[22vw]">
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem className="max-sm:w-[35vw] w-[22vw]">
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a size"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-12">
              <FormField
                control={form.control}
                name="colorId"
                render={({ field }) => (
                  <FormItem className="max-sm:w-[35vw] w-[22vw] ">
                    <FormLabel>Colors</FormLabel>
                    <div className="space-y-2">
                      {field.value.map((colorId, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            className="w-[125px]"
                            placeholder="Color Name"
                            value={colorId.name}
                            onChange={(e) =>
                              field.onChange([
                                ...field.value.slice(0, index),
                                { ...colorId, name: e.target.value },
                                ...field.value.slice(index + 1),
                              ])
                            }
                          />
                          <Input
                            className="w-[125px]"
                            placeholder="Color Hex"
                            value={colorId.hex}
                            onChange={(e) =>
                              field.onChange([
                                ...field.value.slice(0, index),
                                { ...colorId, hex: e.target.value },
                                ...field.value.slice(index + 1),
                              ])
                            }
                          />
                          <Input
                            className="w-[125px]"
                            placeholder="To Link"
                            value={colorId.link}
                            onChange={(e) =>
                              field.onChange([
                                ...field.value.slice(0, index),
                                { ...colorId, link: e.target.value },
                                ...field.value.slice(index + 1),
                              ])
                            }
                          />

                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                              field.onChange([
                                ...field.value.slice(0, index),
                                ...field.value.slice(index + 1),
                              ])
                            }
                          >
                            X
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      onClick={() =>
                        field.onChange([
                          ...field.value,
                          { name: "", hex: "#000000" },
                        ])
                      }
                      className=""

                    >
                      Add Color
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-12  justify-between w-full ">
                <FormField
                  control={form.control}
                  name="isArchived"
                  render={({ field }) => (
                    <FormItem className=" flex flex-row space-x-3 space-y-0 rounded-md border p-4 items-start">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Archived</FormLabel>
                        <FormDescription>
                          This product will not appear anywhere in the store.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className=" flex flex-row space-x-3 space-y-0 rounded-md border p-4 items-start">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                          This product will appear on the home page
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
