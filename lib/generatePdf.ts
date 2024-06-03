import { PDFDocument, rgb, StandardFonts, drawLinesOfText } from "pdf-lib";
import { Order } from "@/types";

export async function generatePdf(order: Order) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();

  const fontSize = 24;
  const title = `Order ID: ${order.id}`;
  const total = `Total: ${order.total}`;
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

  // Draw table headers
  const headers = ['Product', 'Size', 'Color', 'Quantity', 'Price'];
  const tableStartY = height - 12 * fontSize;
  let yOffset = tableStartY;

  // Draw headers with border
  headers.forEach((header, i) => {
    page.drawText(header, {
      x: 50 + i * 100,
      y: yOffset,
      size: fontSize / 2,
      font,
      color: textColor,
    });

    // Draw top border
    page.drawLine({
      start: { x: 50 + i * 100, y: yOffset + fontSize / 4 },
      end: { x: 150 + i * 100, y: yOffset + fontSize / 4 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
  });

  yOffset -= fontSize;

  // Draw rows with borders
  for (const item of order.orderItems) {
    // Draw left border
    page.drawLine({
      start: { x: 50, y: yOffset },
      end: { x: 50, y: yOffset - fontSize },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    page.drawText(item.name, {
      x: 50,
      y: yOffset,
      size: fontSize / 2,
      font,
      color: textColor,
    });

    page.drawText(item.size, {
      x: 150,
      y: yOffset,
      size: fontSize / 2,
      font,
      color: textColor,
    });

    page.drawText(item.color ?? 'N/A', {
      x: 250,
      y: yOffset,
      size: fontSize / 2,
      font,
      color: textColor,
    });

    page.drawText(item.quantity.toString(), {
      x: 350,
      y: yOffset,
      size: fontSize / 2,
      font,
      color: textColor,
    });

    page.drawText(`${item.price}`, {
      x: 450,
      y: yOffset,
      size: fontSize / 2,
      font,
      color: textColor,
    });

    // Draw right border
    page.drawLine({
      start: { x: 550, y: yOffset },
      end: { x: 550, y: yOffset - fontSize },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    yOffset -= fontSize;

    // Draw bottom border
    page.drawLine({
      start: { x: 50, y: yOffset },
      end: { x: 550, y: yOffset },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
