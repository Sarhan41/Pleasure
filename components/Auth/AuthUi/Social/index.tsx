import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = () => {
    signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex flex-col items-center w-full gap-y-4">
      <div className="flex items-center w-full gap-y-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <div className="px-4 text-sm text-gray-600 font-medium">or</div>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <Button
        size="lg"
        className="w-full flex items-center justify-center gap-x-2"
        variant="outline"
        onClick={onClick}
      >
        <FcGoogle className="h-5 w-5" />
        <span>Sign in with Google</span>
      </Button>
    </div>
  );
};
