// _components/order-types.ts
export interface OrderItem {
  productName: string;
  size: string;
  quantity: number;
  price: number;
  imageUrl: string;
  color: string | null;
  sizeSKU: string | null;
}

export interface OrderColumn {
  id: string;
  userName: string;
  phone: string;
  address: string;
  email: string;
  isPaid: boolean;
  createdAt: string;
  totalPayment: number;
  status: string;
  items: OrderItem[];
}
