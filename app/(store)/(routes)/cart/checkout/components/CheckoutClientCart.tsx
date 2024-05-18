"use client";
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
import Script from "next/script";
import { LoaderCircle } from "lucide-react";
import axios from 'axios';

interface CheckoutClientCartProps {
  prices: number[];
  quantities: number[];
}

const CheckoutClientCart: React.FC<CheckoutClientCartProps> = ({
  quantities,
  prices,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const [loading1, setLoading1] = useState(true);
  const [loading, setLoading] = useState(false);
  const idRef = useRef<string | null>(null);
  const [orderTotal, setOrderTotal] = useState<number>(0);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < prices.length; i++) {
      total += prices[i] * quantities[i];
    }
    setOrderTotal(total + total * 0.05 + 29);
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

  useEffect(() => {
    createOrderId();
  }, [createOrderId]);

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const orderId = idRef.current;
    console.log(orderId);
    try {
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: orderTotal * 100,
        currency: "INR",
        name: "Payment",
        description: "Payment",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("/api/dashboard/verify", data);
          const res = result.data;
          if (res.isOk) {
            alert(res.message);
            await axios.post("/api/dashboard/create-order", {
              orderId,
              total: orderTotal,
              status: "Pending",
              isPaid: true,
              // Add other necessary order details here
            });
          } else {
            alert(res.message);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      setLoading(false);
      paymentObject.open();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading1)
    return (
      <div className="container h-screen flex justify-center items-center">
        <LoaderCircle className=" animate-spin h-20 w-20 text-primary" />
      </div>
    );

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <section className="container h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Checkout
        </h1>
        <Card className="max-w-[25rem] space-y-8">
          <CardHeader>
            <CardTitle className="my-4">Continue</CardTitle>
            <CardDescription>
              By clicking on pay you&apos;ll purchase your products for a total of Rs{" "}
              {orderTotal}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={processPayment}>
              <Button className="w-full" type="submit">
                {loading ? "...loading" : "Pay"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex">
            <p className="text-sm text-muted-foreground underline underline-offset-4">
              Please read the terms and conditions.
            </p>
          </CardFooter>
        </Card>
      </section>
    </>
  );
};

export default CheckoutClientCart;
