"use client";

import useDialogStore from "@/hooks/store/dialog-login";

interface LoginButtonProps {
  children: React.ReactNode;
}

export const LoginButton = ({ children }: LoginButtonProps) => {
  const { openLoginDialog } = useDialogStore();

  return (
    <span onClick={openLoginDialog} className="cursor-pointer">
      {children}
    </span>
  );
};
