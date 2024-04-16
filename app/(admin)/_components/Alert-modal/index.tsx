"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  name: string;
  menu: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  name,
  menu,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const DeleteText = `Delete ${name} ${menu}`;

  useEffect(() => {
    setIsMounted(true);

    if (inputValue == DeleteText && !loading) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputValue, DeleteText, loading]);

  if (!isMounted) {
    return null;
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading && !isDisabled) {
      onConfirm();
    }
  };
  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="text-base font-medium  tracking-tight">
        Enter &quot;
        <span className="text-base font-bold font-serif ">{DeleteText}</span>&quot; to
        Continue
      </h2>
      <Input
        className="mt-2"
        placeholder=""
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <div className="pt-6 space-x-2 flex items-center w-full justify-end">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancle
        </Button>
        <Button disabled={isDisabled} variant="destructive" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};
