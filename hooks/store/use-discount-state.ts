// stores/discountStore.ts
import { create } from "zustand";

interface DiscountState {
  couponCode: string;
  discount: number;
  couponId: string | null;
  setCouponCode: (code: string) => void;
  setDiscount: (discount: number) => void;
  setCouponId: (id: string | null) => void;
  reset: () => void; // Add a reset method
}

export const useDiscountStore = create<DiscountState>((set) => ({
  couponCode: localStorage.getItem('couponCode') || "",
  discount: Number(localStorage.getItem('discount')) || 0,
  couponId: localStorage.getItem('couponId') || null,
  setCouponCode: (couponCode) => {
    localStorage.setItem('couponCode', couponCode);
    set({ couponCode });
  },
  setDiscount: (discount) => {
    localStorage.setItem('discount', discount.toString());
    set({ discount });
  },
  setCouponId: (couponId) => {
    if (couponId) {
      localStorage.setItem('couponId', couponId);
    } else {
      localStorage.removeItem('couponId');
    }
    set({ couponId });
  },
  reset: () => {
    localStorage.removeItem('couponCode');
    localStorage.removeItem('discount');
    localStorage.removeItem('couponId');
    set({ couponCode: "", discount: 0, couponId: null });
  },
}));
