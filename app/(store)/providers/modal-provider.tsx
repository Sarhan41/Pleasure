"use client";

import { useEffect, useState } from "react";
import PreviewModal from "../_components/PreviewModal/PreviewModal";
import { useCurrentUser } from "@/hooks/auth/use-current-user";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  const user = useCurrentUser();
  const UserId = user?.id;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PreviewModal userId={UserId} />
    </>
  );
};

export default ModalProvider;
