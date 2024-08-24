import Container from "@/components/Store/container";
import { FaRegCheckCircle, FaExclamationCircle } from "react-icons/fa";

const ReturnPolicy = () => {
  return (
    <div className="bg-white lg:mt-14">
      <Container>
        <div className="px-4 lg:py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-primary">Exchange Policy</h1>
          <div className="mt-4 text-lg space-y-6">
            <p>
              At our store, customer satisfaction is our top priority. We understand that sometimes things don’t work out, and we want to make sure you are happy with your purchase.
            </p>
            <div className="flex items-start space-x-2">
              <FaRegCheckCircle className="text-primary mt-1" />
              <p>We do not accept Exchange on panties for hygiene reasons.</p>
            </div>
            <div className="flex items-start space-x-2">
              <FaRegCheckCircle className="text-primary mt-1" />
              <p>Other items like sports bras, camisoles, pajamas, and shorts can be Exchanged within 7 days of purchase.</p>
            </div>
            <div className="flex items-start space-x-2">
              <FaRegCheckCircle className="text-primary mt-1" />
              <p>Items must be unworn, unwashed, and in their original condition.</p>
            </div>
            {/* <div className="flex items-start space-x-2">
              <FaRegCheckCircle className="text-primary mt-1" />
              <p>Refunds will be processed to the original method of payment.</p>
            </div> */}
            {/* <div className="flex items-start space-x-2">
              <FaRegCheckCircle className="text-primary mt-1" />
              <p>Shipping costs are non-refundable.</p>
            </div> */}
            <p>
              To initiate a return, please contact our customer service team at returns@pleasure.fashion with your order number and reason for return. Our team will provide you with further instructions.
            </p>
            <p>
              Thank you for shopping with us. We appreciate your business and are here to help if you have any questions or concerns about our Exchange policy.
            </p>
            {/* <p className="text-sm text-gray-600">
              <FaExclamationCircle className="inline-block text-red-500 mr-1" /> Note: This return policy is subject to change without notice.
            </p> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ReturnPolicy;
