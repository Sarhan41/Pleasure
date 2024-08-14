import Image from "next/image";
import Link from "next/link";
import DownloadPdfButton from "./DownloadPDFButton";
import CancellationButton from "./CancellationButton";

interface OrderItemProps {
  id: string;
  totalPayment: number;
  status: string;
  isPaid: boolean;
  items: {
    productName: string;
    imageUrl: string;
    size: string;
    color: { name: string; value: string }[];
    quantity: number;
    price: number;
  }[];
}

interface OrderItemComponentProps {
  order: OrderItemProps;
  userName: string | null | undefined;
}

const OrderItem: React.FC<OrderItemComponentProps> = ({ order, userName }) => {
  return (
    <div key={order.id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Order ID: {order.id}</h2>
      <p className="text-xl font-semibold mb-2">Total: ₹{order.totalPayment}</p>
      <p className="text-xl font-semibold mb-2">Status: {order.status}</p>
      <p className="text-xl font-semibold mb-4">
        Paid: {order.isPaid ? "Yes" : "No"}
      </p>
      <h3 className="text-xl font-bold mb-4">Products:</h3>
      <ul className="divide-y divide-gray-200">
        {order.items.map((item, index) => {
          const productName = item.productName.replace(/\s+/g, "-");
          return (
            <Link
              area-label="Link"
              href={`/product/${productName}`}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <li className="py-4 w-fit flex items-center">
                <Image
                  src={item.imageUrl}
                  alt=""
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div className="ml-4">
                  <p className="text-lg font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">
                    Colors: {item.color.map((color) => color.name).join(", ")}
                  </p>
                  <div className="flex space-x-1">
                    {item.color.map((color, idx) => (
                      <span
                        key={idx}
                        style={{ backgroundColor: color.value }}
                        className="block h-4 w-4 rounded-sm border border-gray-600"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <div className="flex">

      <DownloadPdfButton order={order} userName={userName} />
      <CancellationButton />
      </div>
    </div>
  );
};

export default OrderItem;
