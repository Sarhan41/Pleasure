import { Urbanist } from "next/font/google";
import Header from "./_components/Header-store";
import Footer from "./_components/Footer/Footer";
import { ToastProvider } from "./providers/toast-provider";
import ModalProvider from "./providers/modal-provider";
import Script from "next/script";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

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
          <div className="mt-[104px]">{children}</div>
          <Footer />
          {/* WhatsApp Button */}
          <Link
            href="https://wa.me/+918155085865" // Replace with your phone number
            className="fixed bottom-4 right-4 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={36} />
          </Link>
        </body>
      </html>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </>
  );
}
