"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../Dialog";
import { LoginForm } from "@/components/Auth/AuthUi/LoginForm";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild={asChild} onClick={() => setOpen(true)}>
          {children}
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none w-full h-full flex justify-center items-center mx-auto">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
