import { currentUser } from "@/lib/auth";
import CheckoutHeader from "../(store)/_components/Header-store/Checkout";
import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const user = await currentUser();
  const userId = user?.id;

  return (
    <div className="h-fit w-screen flex flex-col items-center justify-center mb-20">
      <CheckoutHeader userId={userId} />
      <div className="w-full px-4 sm:px-10 md:px-16 mt-4 lg:px-24 xl:px-40">
        <Navbar />
      </div>
      <div className="flex-grow w-full mt-4 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
