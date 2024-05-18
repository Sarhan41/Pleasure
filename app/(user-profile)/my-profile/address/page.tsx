import { currentUser } from "@/lib/auth";
import { UserInfo } from "@/components/Auth/AuthUi/UserInfo";
import { db } from "@/lib/db";
import { AddressInfo } from "@/components/Auth/AuthUi/AddressInfo";

const MyProfileAddressPage = async () => {
  const user = await currentUser();

  const addresses = await db.address.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (

<AddressInfo label="My Addresses" addresses={addresses} />

   );
}
 
export default MyProfileAddressPage;