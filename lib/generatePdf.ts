import { Order } from "@/types";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generatePdf(order: any) {
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
    `Total: ${order.total}`,
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

  // Billing Address (Assuming it's the same as shipping for this example)
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
  order.orderItems.forEach((item : any, index : any) => {
    const itemInfo = `${index + 1}. ${item.name} (Size: ${item.size}, Color: ${item.color}, Quantity: ${item.quantity}, Price: ${item.price})`;
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
  return pdfBytes;
}
