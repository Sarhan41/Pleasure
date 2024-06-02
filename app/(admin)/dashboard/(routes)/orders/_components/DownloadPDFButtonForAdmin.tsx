// DownloadPdfButtonAdmin.tsx
import { Button } from "@/components/ui/button";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

async function generatePdfAdmin(order: any) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;
  const margin = 20;

  page.drawText(`Order ID: ${order.id}`, {
    x: margin,
    y: height - margin - fontSize,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
  page.drawText(`User Name: ${order.userName}`, {
    x: margin,
    y: height - margin - 2 * fontSize,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Total: $${order.totalPayment}`, {
    x: margin,
    y: height - margin - 3 * fontSize,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Status: ${order.status}`, {
    x: margin,
    y: height - margin - 4 * fontSize,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Paid: ${order.isPaid ? "Yes" : "No"}`, {
    x: margin,
    y: height - margin - 5 * fontSize,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  let yPosition = height - margin - 6 * fontSize;

  // @ts-ignore
  order.items.forEach((item) => {
    page.drawText(`Product: ${item.productName}`, {
      x: margin,
      y: yPosition,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    yPosition -= fontSize;
    page.drawText(`Size: ${item.size}`, {
      x: margin,
      y: yPosition,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    yPosition -= fontSize;
    page.drawText(`Quantity: ${item.quantity}`, {
      x: margin,
      y: yPosition,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    yPosition -= fontSize;
    page.drawText(`Price: $${item.price}`, {
      x: margin,
      y: yPosition,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    yPosition -= fontSize;
    yPosition -= fontSize;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `order_${order.id}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

const DownloadPdfButtonAdmin = ({ order }: any) => {
  return (
    <Button
      size="lg"
      variant="outline"
      className="border-primary hover:bg-primary hover:text-white z-50 "
      onClick={() => generatePdfAdmin(order)}
    >
      Download Invoice
    </Button>
  );
};

export default DownloadPdfButtonAdmin;
