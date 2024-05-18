import CheckoutHeader from "../(store)/_components/Header-store/CheckoutHeader";
import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-screen w-full flex flex-col gap-y-10 items-center justify-center  mb-20">
      <CheckoutHeader />
      <div className="mt-44" >

      <Navbar />
      </div>
      {children}
    </div>
  );
};

export default ProtectedLayout;
