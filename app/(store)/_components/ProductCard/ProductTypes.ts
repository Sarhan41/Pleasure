import { Category, Color, Product, Size } from "@prisma/client";

export interface ProductType {
    id: string;
    category: Category;
    name: string;
    price: number;
    isFeatured: boolean;
    size: Size;
    color: Color;
    images: Image[];
  }
  
  export interface Image {
    id: string;
    url: string;
  }