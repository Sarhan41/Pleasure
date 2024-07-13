"use client";

import useDialogStore from "@/hooks/store/dialog-login";

interface SignUpButtonProps {
  children: React.ReactNode;
}

export const SignUpButton = ({ children }: SignUpButtonProps) => {
  const { openSignupDialog } = useDialogStore();

  return (
    <span onClick={openSignupDialog} className="cursor-pointer">
      {children}
    </span>
  );
};
