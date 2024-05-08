import { create } from "zustand";

import { Product } from "@/types";

interface PreviewModalStore {
  isOpen: boolean;
  data?: Product;
  userId? : string;
  onOpen: (data: Product, userId?: string) => void;
  onClose: () => void;
};

const usePreviewModal = create<PreviewModalStore>((set)=>({
    isOpen: false,
    data: undefined,
    onOpen: (data: Product, userId?: string) => set({data,userId, isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default usePreviewModal;