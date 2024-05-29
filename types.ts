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

export interface Product {
  id: string;
  category?: Category;
  categoryId: string;
  name: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  description?: string | null;
  images: Image[];
  sizes: Size[];
  colors: Color[];
}
