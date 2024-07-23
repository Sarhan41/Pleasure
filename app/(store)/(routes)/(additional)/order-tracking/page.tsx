import Container from "@/components/Store/container";
import { FaSearch } from "react-icons/fa";

const OrderTracking = () => {
  return (
    <div className="bg-white lg:mt-14">
      <Container>
        <div className="px-4 lg:py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-primary">Order Tracking</h1>
          <div className="mt-4 text-lg space-y-6">
            <p>
              Track your order to stay updated on its status and estimated
              delivery time. Enter your order number below:
            </p>
            <form className="mt-4 flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
              <input
                type="text"
                className="border p-2 rounded flex-grow"
                placeholder="Order Number"
              />
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded flex items-center justify-center"
              >
                <FaSearch className="mr-2" /> Track
              </button>
            </form>
            <p>
              If you have any questions about your order or need further
              assistance, please contact our customer service team at
              support@example.com. Provide your order number for quicker
              assistance.
            </p>
            <h2 className="text-xl font-bold text-primary">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">How can I track my order?</h3>
                <p>
                  Enter your order number above and click the &quot;Track&quot; button.
                  You will see the current status and estimated delivery date.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  What if I don&apos;t have my order number?
                </h3>
                <p>
                  You can find your order number in the confirmation email
                  sent to you after your purchase. If you cannot find it, please
                  contact our support team.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Can I change my shipping address?
                </h3>
                <p>
                  Once your order has been shipped, we cannot change the
                  shipping address. Please contact us as soon as possible if you
                  need to make changes before shipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderTracking;
