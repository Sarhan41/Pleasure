import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PDFDocument, rgb } from "pdf-lib";
import { v4 as uuidv4 } from "uuid";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { userId, orderItems, total, addressId } = body;

    const newOrder = await db.order.create({
      data: {
        id: uuidv4(),
        total,
        status: "pending",
        isPaid: false,
        addressId,
        userId,
        orderItems: {
          create: orderItems.map((item: any) => ({
            id: uuidv4(),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            productId: item.productId,
            sizeSKU: item.sizeSKU,
          })),
        },
      },
      include: {
        orderItems: true,
        user: true,
        address: true,
      },
    });

    const pdf = await createInvoicePdf(newOrder);
    const pdfFileName = `${newOrder.id}.pdf`;
    const pdfFilePath = path.join(process.cwd(), "public", "pdfs", pdfFileName);
    await fs.writeFile(pdfFilePath, pdf);

    const pdfUrl = `/pdfs/${pdfFileName}`;

    const updatedOrder = await db.order.update({
      where: { id: newOrder.id },
      data: { pdfUrl },
    });

    return NextResponse.json(updatedOrder, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function createInvoicePdf(order: any) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { orderItems, user, address } = order;

  page.drawText("Order Invoice", {
    x: 50,
    y: 350,
    size: 25,
    color: rgb(0, 0, 0),
  });
  page.drawText(`Order ID: ${order.id}`, { x: 50, y: 330, size: 12 });
  page.drawText(`Total: $${order.total}`, { x: 50, y: 310, size: 12 });
  page.drawText(`User: ${user.name}`, { x: 50, y: 290, size: 12 });
  page.drawText(`Address: ${address.addressLine1}, ${address.city}`, {
    x: 50,
    y: 270,
    size: 12,
  });

  orderItems.forEach((item: any, index: number) => {
    page.drawText(
      `${item.name} - ${item.size} - $${item.price} x${item.quantity}`,
      { x: 50, y: 250 - index * 20, size: 12 }
    );
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
