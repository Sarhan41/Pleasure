import { Urbanist } from "next/font/google";

import Header from "./_components/Header-store";
import Footer from "./_components/Footer/Footer";
import { ToastProvider } from "./providers/toast-provider";
import ModalProvider from "./providers/modal-provider";
import Script from "next/script";

const font = Urbanist({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={`${font.className} overflow-x-hidden`}>
          <ModalProvider />
          <ToastProvider />
          <Header />
          <div className="mt-[104px] ">{children}</div>
          <Footer />
        </body>
      </html>
      <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
