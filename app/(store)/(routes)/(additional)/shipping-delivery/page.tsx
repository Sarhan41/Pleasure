import Container from "@/components/Store/container";
import { FaShippingFast, FaTruckMoving } from "react-icons/fa";

const ShippingAndDelivery = () => {
  return (
    <div className="bg-white lg:mt-14">
      <Container>
        <div className="px-4 lg:py-12 sm:px-6 lg:px-10">
          <h1 className="text-3xl font-bold text-primary border-b-4 border-primary pb-2 inline-block">
            Shipping and Delivery
          </h1>
          <div className="mt-8 text-lg space-y-8 leading-relaxed">
            <p>
              At <span className="font-semibold">Pleasure Lingerie</span>, we
              are committed to delivering your orders promptly and securely.
            </p>
            <div className="flex items-start space-x-4">
              <FaShippingFast className="text-primary mt-1" />
              <p>
                <span className="font-semibold">Shipping Time:</span> Orders are
                processed within 2-3 business days. Delivery times vary based on
                location and shipping method.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <FaTruckMoving className="text-primary mt-1" />
              <p>
                <span className="font-semibold">Delivery Partners:</span> We
                work with trusted courier partners to ensure timely delivery.
                You will receive tracking details once your order is dispatched.
              </p>
            </div>
            <p>
              Please ensure your shipping address is correct to avoid any
              delays. If you need to update your address, contact us
              immediately.
            </p>
            <p className="text-sm text-gray-600 mt-6">
              For any inquiries regarding shipping and delivery, please contact
              us at <span className="underline">delivery@pleasure.fashion</span>
              .
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShippingAndDelivery;
