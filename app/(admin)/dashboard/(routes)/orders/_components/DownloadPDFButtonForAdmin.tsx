import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import { OrderColumn } from "./order-types";

const parseAndFormatDate = (dateString: string) => {
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

const DownloadPdfButtonAdmin = ({
  order,
  userName,
}: {
  order: OrderColumn;
  userName: string;
}) => (
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


// PRODUCT IN PDF IF IN CASE NEEDED
{/* <h2 style="margin-top: 20px;">Products:</h2>
<div>
  ${order.items
    .map(
      (item, index) => `
    <div style="display: flex; margin-bottom: 10px; align-items: center;">
      <h1>${index + 1}.</h1>
      <img src="${item.imageUrl}" alt="${
        item.productName
      }" style="width: 50px; height: 50px; margin-right: 10px;">
      <div>
        <p><strong>${item.productName}</strong></p>
        <p>Size: ${item.size}</p>
        <p>Colors: ${item.color.map((color) => color.name).join(", ")}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: ₹${item.price}</p>
      </div>
    </div>
  `
    )
    .join("")}
</div> */}