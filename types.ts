
  export interface Category {
    id: string;
    name: string;
  }
  
  export interface Product {
    id: string;
    category?: Category;
    name: string;
    price: number;
    isFeatured: boolean;
    size: Size;
    colors: Color[];
    images: Image[];
    quantity?: number;
  }
  
  export interface Image {
    id: string;
    url: string;
  }
  
  export interface Size {
    id: string;
    name: string;
    value: string;
  }
  
  export interface Color {
    id?: string;
    name: string;
    value: string;
    toLink?: string;
  }
  