"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import useDialogStore from "@/hooks/store/dialog-login";
import { LoginForm } from "../Forms/loginForm";
import { RegisterForm } from "../Forms/RegisterForm";

const Dialog = () => {
  const {
    isLoginOpen,
    isSignupOpen,
    closeLoginDialog,
    closeSignupDialog,
  } = useDialogStore();

  return (
    <>
      <DialogPrimitive.Root open={isLoginOpen} onOpenChange={closeLoginDialog}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
          <DialogPrimitive.Content className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <DialogPrimitive.Close className="absolute top-4 right-4">
                <Cross2Icon className="w-4 h-4" />
              </DialogPrimitive.Close>
              <LoginForm />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <DialogPrimitive.Root open={isSignupOpen} onOpenChange={closeSignupDialog}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
          <DialogPrimitive.Content className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <DialogPrimitive.Close className="absolute top-4 right-4">
                <Cross2Icon className="w-4 h-4" />
              </DialogPrimitive.Close>
              
              <RegisterForm />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
};

export default Dialog;
