// utils/generatePdf.js
import { OrderColumn } from "@/app/(admin)/dashboard/(routes)/orders/_components/order-types";
import html2pdf from "html2pdf.js";

const parseAndFormatDate = (dateString: string | Date) => {
  if (dateString instanceof Date) {
    dateString = dateString.toISOString(); // Convert Date to string
  } else if (typeof dateString !== "string") {
    throw new Error("Invalid date format");
  }

  const [datePart] = dateString.split("T");
  const [year] = datePart.split("-");

  return `${year}`;
};

export const generatePdf = (order: OrderColumn, userName: string) => {
  const element = document.createElement("div");

  const formattedDate = parseAndFormatDate(order.createdAt);

  element.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <p style="margin-bottom: 0;"><strong>Date:</strong> ${formattedDate}</p>
        </div>
        <div>
          <p style="margin-bottom: 0;"><strong>${
            order.isPaid ? "PREPAID" : "POSTPAID"
          }</strong></p>
        </div>
      </div>
      
      
      <div style="display: flex; justify-content: space-between; margin-top: 20px;">
        <div>
          <p><strong>Ship To:</strong><br>${order.address}</p>
          <p><strong>Phone:</strong> ${order.phone}</p>
          <p><strong>Email:</strong> ${order.email}</p>
        </div>
        <div style="text-align: right;">
          <p><strong>Ship From:</strong><br>30 RayChandnagar Opposite Sukan Mall,<br>Near Visat Circle, Motera, Sabarmati,<br>Ahmedabad, Gujarat, 380005</p>
        </div>
      </div>
      
      <div style="margin-top: 20px;">
        <p><strong>Total Payment:</strong> ₹${order.totalPayment}</p>
        <p><strong>Paid:</strong> ${order.isPaid ? "Yes" : "No"}</p>
        <p><strong>Status:</strong> ${order.status}</p>
      </div>
      
     
    </div>
  `;

  html2pdf()
    .from(element)
    .set({
      margin: 1,
      filename: `${userName}_${order.id}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .save();
};
