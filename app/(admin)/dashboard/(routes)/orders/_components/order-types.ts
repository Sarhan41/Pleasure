// order-types.ts
export interface OrderItem {
  productName: string;
  size: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface OrderColumn {
  id: string;
  items: OrderItem[];
  phone: string;
  address: string;
  email: string;
  isPaid: boolean;
  createdAt: string;
  totalPayment: number;
}
