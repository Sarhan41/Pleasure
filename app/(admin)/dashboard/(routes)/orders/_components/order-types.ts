// order-types.ts
export interface OrderColumn {
  id: string;
  productName: string;
  size: string;
  phone: string;
  address: string;
  email: string | null;
  isPaid: boolean;
  createdAt: string;
  imageUrl: string; // New field for product image URL
  quantity: number; // New field for product quantity
  totalPayment: number; // New field for total payment
}
