import { db } from "@/lib/db";
import { AddressForm } from "./components/AddressForm";

const AddressPage = async ({ params }: { params: { addressId: string } }) => {
  const address = await db.address.findUnique({
    where: {
      id: params.addressId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <AddressForm initialData={address} />
      </div>
    </div>
  );
};

export default AddressPage;
