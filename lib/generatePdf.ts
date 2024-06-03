// utils/generatePdf.js
import { Order } from "@/types";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generatePdf(order: Order) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();

  const fontSize = 24;
  const title = `Order ID: ${order.id}`;
  const total = `Total: ₹${order.total}`;
  const status = `Status: ${order.status}`;
  const paid = `Paid: ${order.isPaid ? "Yes" : "No"}`;

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const textColor = rgb(0, 0, 0);

  page.drawText(title, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font,
    color: textColor,
  });

  page.drawText(total, {
    x: 50,
    y: height - 6 * fontSize,
    size: fontSize,
    font,
    color: textColor,
  });

  page.drawText(status, {
    x: 50,
    y: height - 8 * fontSize,
    size: fontSize,
    font,
    color: textColor,
  });

  page.drawText(paid, {
    x: 50,
    y: height - 10 * fontSize,
    size: fontSize,
    font,
    color: textColor,
  });

  // Add products details
  let yOffset = height - 12 * fontSize;
  for (const item of order.orderItems) {
    const productDetails = `Product: ${item.name}, Size: ${item.size}, Color: ${item.color}, Quantity: ${item.quantity}, Price: ₹${item.price}`;
    page.drawText(productDetails, {
      x: 50,
      y: yOffset,
      size: fontSize / 1.5,
      font,
      color: textColor,
    });
    yOffset -= fontSize;
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}