// stores/discountStore.ts
import { create } from "zustand";

interface DiscountState {
  couponCode: string;
  discount: number;
  couponId: string | null;
  setCouponCode: (code: string) => void;
  setDiscount: (discount: number) => void;
  setCouponId: (id: string | null) => void;
  reset: () => void;
}

export const useDiscountStore = create<DiscountState>((set) => ({
  couponCode: "",
  discount: 0,
  couponId: null,
  setCouponCode: (couponCode) => set({ couponCode }),
  setDiscount: (discount) => set({ discount }),
  setCouponId: (couponId) => set({ couponId }),
  reset: () => {
    set({ couponCode: "", discount: 0, couponId: null });
  },
}));
