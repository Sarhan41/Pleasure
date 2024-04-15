import { currentUser } from "@/lib/auth";
import { UserInfo } from "@/components/Auth/AuthUi/UserInfo";

const MyProfilePage = async () => {
  const user = await currentUser();

  return ( 
    <UserInfo
      label="My Profile"
      user={user}
    />
   );
}
 
export default MyProfilePage;