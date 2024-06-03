// DownloadPdfButtonAdmin.tsx
import { Button } from "@/components/ui/button";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { OrderColumn, OrderItem } from "./order-types"; // Import types

async function generatePdfAdmin(order: OrderColumn) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;
  const titleFontSize = 20;
  const headerFontSize = 14;
  const margin = 20;

  // Title
  page.drawText("Invoice", {
    x: width / 2 - 40,
    y: height - margin - titleFontSize,
    size: titleFontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Order Information
  let yPosition = height - margin - 2 * titleFontSize - 20;
  const orderInfo = [
    `Order ID: ${order.id}`,
    `User Name: ${order.userName}`,
    `Email: ${order.email}`,
    `Phone: ${order.phone}`,
    `Total: $${order.totalPayment}`,
    `Status: ${order.status}`,
    `Paid: ${order.isPaid ? "Yes" : "No"}`,
  ];

  orderInfo.forEach((info) => {
    page.drawText(info, {
      x: margin,
      y: yPosition,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
  });

  // Shipping Address
  page.drawText("Shipping Address:", {
    x: margin,
    y: yPosition - 10,
    size: headerFontSize,
    font,
    color: rgb(0, 0, 0),
  });
  yPosition -= 30;
  page.drawText(order.address, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Billing Address
  yPosition -= 40;
  page.drawText("Billing Address:", {
    x: margin,
    y: yPosition - 10,
    size: headerFontSize,
    font,
    color: rgb(0, 0, 0),
  });
  yPosition -= 30;
  page.drawText(order.address, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  // Product List
  yPosition -= 50;
  page.drawText("Products:", {
    x: margin,
    y: yPosition - 10,
    size: headerFontSize,
    font,
    color: rgb(0, 0, 0),
  });

  yPosition -= 30;
  order.items.forEach((item: OrderItem, index: number) => {
    const itemInfo = `${index + 1}. ${item.productName} (Size: ${
      item.size
    }, Quantity: ${item.quantity}, Price: $${item.price})`;
    page.drawText(itemInfo, {
      x: margin,
      y: yPosition,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `invoice_${order.id}.pdf`;
  link.click();
}

const DownloadPdfButtonAdmin = ({ order }: { order: OrderColumn }) => (
  <Button
    onClick={() => {
      generatePdfAdmin(order);
    }}
    size="lg"
    variant="outline"
    className="border-primary hover:bg-primary hover:text-white z-50 w-full"
  >
    Download PDF
  </Button>
);

export default DownloadPdfButtonAdmin;
