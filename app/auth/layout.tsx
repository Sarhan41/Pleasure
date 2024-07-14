import CheckoutHeader from "../(store)/_components/Header-store/Checkout";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CheckoutHeader userId="" />
      <div className="h-full flex items-center justify-center">{children}</div>
    </>
  );
};

export default AuthLayout;
