// utils/generatePdf.js
import { OrderColumn } from "@/app/(admin)/dashboard/(routes)/orders/_components/order-types";
import { Order } from "@/types";
import html2pdf from "html2pdf.js";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generatePdf(order: OrderColumn , userName: string | undefined | null) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();

  const element = document.createElement("div");
  element.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="text-align: center;">Order Details</h1>
      <div>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Total Payment:</strong> ₹${order.totalPayment}</p>
        <p><strong>Paid:</strong> ${order.isPaid ? "Yes" : "No"}</p>
        <p><strong>Status:</strong> ${order.status}</p>
      </div>
      <h2>Products:</h2>
      <div>
        ${order.items
          .map(
            (item, index) => `
          <div style="display: flex; margin-bottom: 10px; align-items: center;">
            <img src="${item.imageUrl}" alt="${item.productName}" style="width: 50px; height: 50px; margin-right: 10px;">
            <div>
              <p><strong>${item.productName}</strong></p>
              <p>Size: ${item.size}</p>
              <p>Quantity: ${item.quantity}</p>
              <p>Price: ₹${item.price}</p>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;

  html2pdf()
    .from(element)
    .set({
      margin: 1,
      filename: `order-details_${order.id}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .save();
};

export default generatePdf;
