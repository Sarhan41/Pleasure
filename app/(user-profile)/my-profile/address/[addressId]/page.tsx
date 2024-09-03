import { db } from "@/lib/db";
import { AddressForm } from "./components/AddressForm";

// Define cache function
const getAddress = (async (addressId: string) => {
  return await db.address.findUnique({
    where: {
      id: addressId,
    },
  });
});

const AddressPage = async ({ params }: { params: { addressId: string } }) => {
  const address = await getAddress(params.addressId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <AddressForm initialData={address} />
      </div>
    </div>
  );
};

export default AddressPage;
