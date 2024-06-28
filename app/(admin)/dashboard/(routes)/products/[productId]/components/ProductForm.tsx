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
  categoryId: z.string().min(1),
  description: z.string().min(1).optional(),
  colorId: z
    .object({ name: z.string(), hex: z.string(), link: z.string().optional() })
    .array(),
  sizeId: z
    .object({
      name: z.string(),
      SKUvalue: z.string(),
      quantity: z.string(),
      price: z.string(),
      discountedprice: z.string().optional(),
    })
    .array(),

  isNew: z.boolean().default(false).optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
        colors: Color[];
        sizes: Size[];
      })
    | null;
  categories: Category[];
  products: Product[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  products,
}) => {
  const params = useParams();
  const router = useRouter();
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
            link: color.toLink || "",
          })),
          sizeId: initialData.sizes.map((size) => ({
            name: size.name || "",
            SKUvalue: size.SKUvalue || "",
            quantity: size.quantity || "",
            price: size.price || "",
            discountedprice: size.discountedprice || "",
          })),
          description: initialData.description || "",
        }
      : {
          name: "",
          images: [],
          categoryId: "",
          colorId: [{ name: "", hex: "#000000", link: "" }],
          sizeId: [
            {
              name: "",
              SKUvalue: "",
              quantity: "",
              price: "",
              discountedprice: "",
            },
          ],
          isFeatured: false,
          isArchived: false,
          isNew: false,
          description: "",
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
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="max-sm:w-[30vw]  w-[22vw] ">
                    <FormLabel>Description</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        disabled={loading}
                        placeholder="Product Description"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div></div>
            <div className="flex flex-col gap-12">
              <FormField
                control={form.control}
                name="sizeId"
                render={({ field }) => (
                  <FormItem className="max-sm:w-[35vw] w-[22vw]">
                    <FormLabel>Size</FormLabel>
                    <div className="space-y-2">
                      {field.value.map((sizeId, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            className="w-[125px]"
                            placeholder="Size Name"
                            value={sizeId.name}
                            onChange={(e) =>
                              field.onChange([
                                ...field.value.slice(0, index),
                                { ...sizeId, name: e.target.value },
                                ...field.value.slice(index + 1),
                              ])
                            }
                          />
                          <Input
                            className="w-[125px]"
                            placeholder="Size SKUValue"
                            value={sizeId.SKUvalue}
                            onChange={(e) =>
                              field.onChange([
                                ...field.value.slice(0, index),
                                { ...sizeId, SKUvalue: e.target.value },
                                ...field.value.slice(index + 1),
                              ])
                            }
                          />
                          <Input
                            className="w-[125px]"
                            placeholder="Size Quantity"
                            value={sizeId.quantity}
                            onChange={(e) =>
                              field.onChange([
                                ...field.value.slice(0, index),
                                {
                                  ...sizeId,
                                  quantity: e.target.value,
                                },
                                ...field.value.slice(index + 1),
                              ])
                            }
                          />
                          <Input
                            className="w-[125px]"
                            placeholder="Size Price"
                            value={sizeId.price}
                            onChange={(e) =>
                              field.onChange([
                                ...field.value.slice(0, index),
                                {
                                  ...sizeId,
                                  price: e.target.value,
                                },
                                ...field.value.slice(index + 1),
                              ])
                            }
                          />
                          <Input
                            className="w-[125px]"
                            placeholder="Size Discounted Price"
                            value={sizeId.discountedprice}
                            onChange={(e) =>
                              field.onChange([
                                ...field.value.slice(0, index),
                                {
                                  ...sizeId,
                                  discountedprice: e.target.value,
                                },
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
                          { name: "", value: "" },
                        ])
                      }
                      className=""
                    >
                      Add Size
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          <select
                            className="w-[200px] p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={colorId.link}
                            onChange={(e) =>
                              field.onChange([
                                ...field.value.slice(0, index),
                                { ...colorId, link: e.target.value },
                                ...field.value.slice(index + 1),
                              ])
                            }
                          >
                            <option value="">Select a product</option>
                            {products.map((product) => (
                              <option key={product.id} value={product.name}>
                                {product.name}
                              </option>
                            ))}
                          </select>

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

              <div className="flex gap-12 max-lg:flex-col justify-between w-full ">
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
                <FormField
                  control={form.control}
                  name="isNew"
                  render={({ field }) => (
                    <FormItem className=" flex flex-row space-x-3 space-y-0 rounded-md border p-4 items-start">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>New</FormLabel>
                        <FormDescription>
                          This product will appear on the New page
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
