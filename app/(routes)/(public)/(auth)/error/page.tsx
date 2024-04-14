import { CardWrapper } from "@/components/Auth/AuthUi/Card";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const AuthErrrorPagge = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center ">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default AuthErrrorPagge;
