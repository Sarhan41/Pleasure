import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import { OrderColumn } from "./order-types";

const generatePdf = (order: OrderColumn, userName: string) => {
  const element = document.createElement("div");
  element.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="text-align: center;">Invoice</h1>
      <div>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Ship To:</strong> ${order.address}</p>
        <p><strong>Ship From:</strong>30 RayChandnagar Opposite Sukan Mall, Near Visat Circle, Motera,                                  Sabarmati, Ahemdabad, Gujarat, 380005</p>
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
          <h1>${index + 1}.</h1>
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
      filename: `${userName}_${order.id}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .save();
};

const DownloadPdfButtonAdmin = ({ order , userName}: { order: OrderColumn , userName: string}) => (
  <Button
    onClick={() => generatePdf(order, userName)}
    size="lg"
    variant="outline"
    className="border-primary hover:bg-primary hover:text-white z-50 w-full"
  >
    Download PDF
  </Button>
);

export default DownloadPdfButtonAdmin;
