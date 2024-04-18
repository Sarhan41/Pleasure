import { Urbanist } from "next/font/google";

import Header from "./_components/Header-store/Header";
import Footer from "./_components/Footer/Footer";
import { ToastProvider } from "./providers/toast-provider";
import ModalProvider from "./providers/modal-provider";

const font = Urbanist({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <Header />
        {children}
        {/* <Footer /> */}
        </body>
    </html>
  );
}
