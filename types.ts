export interface Category {
  id: string;
  name: string;
  products?: Product[];
}

export interface Size {
  productId: string;
  name: string;
  SKUvalue: string;
  price: string;
  quantity: string;
  discountedprice?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id: string;
  productId: string;
  url: string;
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

export interface Image {
  id: string;
  url: string;
}

export interface Color {
  id?: string;
  name: string;
  value: string;
  toLink?: string | null;
}
