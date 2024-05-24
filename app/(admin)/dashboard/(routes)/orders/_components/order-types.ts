// order-types.ts
export interface OrderColumn {
  id: string;
  productName: string;
  size: string;
  quantity: number;
  price: number;
  phone: string;
  address: string;
  email: string;
  isPaid: boolean;
  createdAt: string;
  imageUrl: string;
  totalPayment: number;
}
