import { CartItems } from "@prisma/client";

export interface Category {
  id: string;
  name: string;
  products?: Product[];
}

export interface Size {
  id: string;
  name: string;
  SKUvalue: string;
  price: string;
  discountedprice: string | null;
  quantity: string;
}

export interface Image {
  id: string;
  productId: string;
  url: string;
}

export interface Color {
  id?: string;
  name: string;
  value: string;
  toLink?: string | null;
}

export interface colorName{
  name: string;
}

export interface Product {
  id: string;
  category: Category;
  categoryId: string;
  name: string;
  subname?: string | null;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  description?: string | null;
  additionalInfo?: string | null;
  images: Image[];
  sizes: Size[];
  colors: Color[];
  colorNames: colorName[];
  isNew: boolean;
  isColorNameVisible: boolean;
}



export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color?: string | null;
  productId: string;
  sizeSKU: string;
  product: Product;
}

export interface Order {
  id: string;
  total: number;
  status: string;
  pdfUrl?: string | null;
  isPaid: boolean;
  addressId: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  orderItems: OrderItem[];
}

export interface CartItemWithColors extends CartItems {
  color: { value: string; name: string }[];
}

export interface Billboard {
  imageUrl: string;
  name: string;
  title: string;
  subtitle: string;
  link: string;
}
