"use client";
import React from "react";
import { saveAs } from "file-saver";
import { generatePdf } from "@/lib/generatePdf";
import { Button } from "@/components/ui/button";

const DownloadPdfButton = ({ order, userName }: any) => {
  const handleDownloadPdf = async () => {
    const pdfBytes = await generatePdf(order, userName);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, `Order_${userName}.pdf`);
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className="border-primary hover:bg-primary hover:text-white z-50 "
      onClick={handleDownloadPdf}
    >
      Download Invoice
    </Button>
  );
};

export default DownloadPdfButton;