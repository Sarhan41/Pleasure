import { create } from "zustand";

interface DialogState {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
  openSignupDialog: () => void;
  closeSignupDialog: () => void;
}

const useDialogStore = create<DialogState>((set) => ({
  isLoginOpen: false,
  isSignupOpen: false,
  openLoginDialog: () => set({ isLoginOpen: true }),
  closeLoginDialog: () => set({ isLoginOpen: false }),
  openSignupDialog: () => set({ isSignupOpen: true }),
  closeSignupDialog: () => set({ isSignupOpen: false }),
}));

export default useDialogStore;
