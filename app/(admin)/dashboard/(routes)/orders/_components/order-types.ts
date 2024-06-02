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
  userName: string; // Add this line
  isPaid: boolean;
  createdAt: string;
  totalPayment: number;
  status: string; // Add this line
  orderItems: any; // Add this line to ensure the orderItems are included
}
