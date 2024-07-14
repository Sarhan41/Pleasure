import { currentUser } from "@/lib/auth";
import { UserInfo } from "@/components/Auth/AuthUi/UserInfo";
import { CardWrapper } from "@/components/Auth/AuthUi/CardWrapper";

const MyProfilePage = async () => {
  const user = await currentUser();

  if(!user) {
    return  <CardWrapper
    headerLabel="You are Not Logged IN"
    backButtonLabel="Back to login"
    backButtonHref="/auth/login"
  >  </CardWrapper>
  }

  return ( 
    <UserInfo
      label="My Profile"
      user={user}
    />
   );
}
 
export default MyProfilePage;