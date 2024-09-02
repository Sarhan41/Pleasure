import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { AddressInfo } from "@/components/Auth/AuthUi/AddressInfo";
import { unstable_cache as cache } from "next/cache";

// Define cache function
const getAddresses = cache(async (userId: string | undefined) => {
  return await db.address.findMany({
    where: {
      userId,
    },
  });
});

const MyProfileAddressPage = async () => {
  const user = await currentUser();
  if (!user) {
    // Handle case where user is not authenticated
    return <div>User not authenticated</div>;
  }

  const addresses = await getAddresses(user.id);

  return <AddressInfo label="My Addresses" addresses={addresses} />;
};

export default MyProfileAddressPage;
