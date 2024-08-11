import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/Auth/AuthUi/LogoutButton";
import { LoginButton } from "../../Desktop/Userlogin/Button/loginButton";
import { SignUpButton } from "../../Desktop/Userlogin/Button/signupButton";
import Link from "next/link";

interface FirstRowUserProps {
  userId: string | null | undefined;
  userName: string | null | undefined;
  toggleSidebar: () => void;
}

const FirstRowUser = ({
  userName,
  userId,
  toggleSidebar,
}: FirstRowUserProps) => {
  return (
    <div className="flex flex-col items-center p-4 border-b border-gray-200 bg-white shadow-md sticky top-0 z-50">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">
          {userName ? (
            <>
              Welcome, {userName} to the{" "}
              <span className="text-primary">PLEASURE</span> Store
            </>
          ) : (
            <>
              Welcome to the <span className="text-primary">PLEASURE</span>{" "}
              Store
            </>
          )}
        </h1>
      </div>
      <div className="flex flex-col gap-4 mt-4 w-full">
        {userId ? (
          <div className="flex flex-col gap-4 w-full">
            <Link area-label="Link" href="/my-profile" onClick={toggleSidebar}>
              <Button
                size="lg"
                variant="outline"
                className="border-primary hover:bg-primary hover:text-white w-full"
              >
                My Profile
              </Button>
            </Link>
            <Link area-label="Link" href="/wishlist" onClick={toggleSidebar}>
              <Button
                size="lg"
                variant="outline"
                className="border-primary hover:bg-primary hover:text-white w-full"
              >
                Wishlist
              </Button>
            </Link>
            <Link
              area-label="Link"
              href="/my-profile/orders"
              onClick={toggleSidebar}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-primary hover:bg-primary hover:text-white w-full"
              >
                My Orders
              </Button>
            </Link>
            <Link
              area-label="Link"
              href="/order-tracking"
              onClick={toggleSidebar}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-primary hover:bg-primary hover:text-white w-full"
              >
                Track My Order
              </Button>
            </Link>
            <LogoutButton>
              <Button
                size="lg"
                variant="outline"
                className="border-primary hover:bg-primary hover:text-white w-full"
                onClick={toggleSidebar}
              >
                Logout
              </Button>
            </LogoutButton>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <LoginButton>
              <Button
                variant="outline"
                className="border-primary hover:bg-primary hover:text-white w-full"
                size="lg"
                onClick={toggleSidebar}
              >
                Sign in
              </Button>
            </LoginButton>
            <SignUpButton>
              <Button
                size="lg"
                variant="outline"
                className="border-primary hover:bg-primary hover:text-white w-full"
                onClick={toggleSidebar}
              >
                Create an account
              </Button>
            </SignUpButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstRowUser;
