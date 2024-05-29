import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { ExtendedUser } from "@/next-auth";
import toast from "react-hot-toast";
import { CartItems } from "@prisma/client";
import Link from "next/link";

interface CheckoutClientCartProps {
  user?: ExtendedUser;
  prices: number[];
  quantities: number[];
  AddressId: string;
  products: CartItems[];
}

const CheckoutClientCart: React.FC<CheckoutClientCartProps> = ({
  user,
  quantities,
  prices,
  AddressId,
  products,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const [loading1, setLoading1] = useState(true);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
    "razorpay"
  );
  const idRef = useRef<string | null>(null);
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [razorpayReady, setRazorpayReady] = useState(false);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < prices.length; i++) {
      total += prices[i] * quantities[i];
    }
    const calculatedOrderTotal = total + total * 0.05 + 29;
    setOrderTotal(calculatedOrderTotal);
    console.log(`Order Total Calculated: ${calculatedOrderTotal}`);
  }, [prices, quantities]);

  const createOrderId = useCallback(async () => {
    try {
      const response = await axios.post("/api/dashboard/order", {
        amount: orderTotal * 100,
      });

      const id = response.data.orderId;
      idRef.current = id;
      setLoading1(false);
    } catch (error) {
      console.error("There was a problem with your axios operation:", error);
    }
  }, [orderTotal]);

  const loadRazorpayScript = useCallback(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayReady(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      setRazorpayReady(false);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    loadRazorpayScript();
  }, [loadRazorpayScript]);

  useEffect(() => {
    if (paymentMethod === "cod" || razorpayReady) {
      setLoading(false);
    }
  }, [paymentMethod, razorpayReady]);

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (paymentMethod === "razorpay") {
      if (!idRef.current) {
        await createOrderId();
      }

      setLoading(true);
      const orderId = idRef.current;
      console.log(orderId);
      try {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderTotal * 100,
          currency: "INR",
          name: "Payment",
          description: "Payment",
          order_id: orderId,
          handler: async function (response: any) {
            setVerifying(true);
            const data = {
              orderCreationId: orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post("/api/dashboard/verify", data);
            const res = result.data;
            setVerifying(false);
            if (res.isOk) {
              toast.success(res.message);
              await axios.post("/api/dashboard/create-order", {
                orderId: idRef.current,
                total: orderTotal,
                status: "Pending",
                isPaid: true,
                userId: user?.id,
                addressId: AddressId,
                products: products.map((product) => ({
                  productId: product.productId,
                  price: product.Price,
                  quantity: product.quantity,
                  size: product.sizeName,
                  color: product.color,
                  sizeSKU: product.SKUvalue,
                })),
              });
              router.push("/orders/success");
            } else {
              toast.error(res.message);
            }
          },
          theme: {
            color: "#3399cc",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", function (response: any) {
          toast.error(response.error.description);
        });
        setLoading(false);
        paymentObject.open();
      } catch (error) {
        console.error(error);
        toast.error("Payment processing failed");
      }
    } else if (paymentMethod === "cod") {
      try {
        await axios.post("/api/dashboard/create-order", {
          orderId: idRef.current,
          total: orderTotal,
          status: "Pending",
          isPaid: false,
          userId: user?.id,
          addressId: AddressId,
          products: products.map((product) => ({
            productId: product.productId,
            price: product.Price,
            quantity: product.quantity,
            size: product.sizeName,
            color: product.color,
            sizeSKU: product.SKUvalue,
          })),
        });
        toast.success("Order placed successfully. Pay cash on delivery.");
        router.push("/orders/success");
      } catch (error) {
        console.error("Error placing order for COD:", error);
        toast.error("Order placement failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <section className="container flex flex-col justify-center items-center gap-10 py-12">
        <Card className="max-w-[25rem] w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold my-4">Checkout</CardTitle>
            <CardDescription>
              Please choose a payment method to complete your purchase of Rs{" "}
              {orderTotal}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={processPayment}>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    className="mr-2"
                  />
                  Pay with Razorpay
                </label>
                <label className="flex items-center mt-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mr-2"
                  />
                  Cash on Delivery
                </label>
              </div>
              <Button
                className="w-full"
                type="submit"
                disabled={
                  (paymentMethod === "razorpay" && !razorpayReady) ||
                  loading ||
                  verifying
                }
              >
                {loading
                  ? "Loading..."
                  : verifying
                  ? "Please wait, payment getting verified..."
                  : !razorpayReady && paymentMethod === "razorpay"
                  ? "Loading Razorpay..."
                  : paymentMethod === "razorpay"
                  ? "Pay Now"
                  : "Place Order"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default CheckoutClientCart;
