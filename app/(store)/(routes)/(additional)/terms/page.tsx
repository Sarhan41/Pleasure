import { Phone } from "lucide-react";
import { FaShoppingCart, FaCheck, FaPhone, FaEnvelope } from "react-icons/fa";

export default function TermsConditions() {
  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl text-primary font-bold mb-4">
          Terms & Conditions
        </h1>
        <hr className="border-t-2 border-gray-300 w-1/4 mx-auto" />
      </header>

      <section className="mb-12">
        <h2 className="text-2xl text-primary font-semibold mb-4">
          <FaCheck className="inline mr-2" />
          Acceptance of Terms
        </h2>
        <p>
          By accessing and using our e-commerce website, you agree to comply
          with and be bound by these Terms & Conditions.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl text-primary font-semibold mb-4">
          <FaShoppingCart className="inline mr-2" />
          Product Orders
        </h2>
        <p>
          All orders are subject to product availability and confirmation of the
          order price. We reserve the right to refuse or cancel any order.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl text-primary font-semibold mb-4">
          <FaCheck className="inline mr-2" />
          Pricing and Payment
        </h2>
        <p>
          Prices for products are subject to change without notice. Payment must
          be made at the time of purchase.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl text-primary font-semibold mb-4">
          <FaCheck className="inline mr-2" />
          Shipping and Delivery
        </h2>
        <p>
          We aim to deliver products within the estimated delivery time, but
          delays may occur. We are not responsible for any delay in delivery.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl text-primary font-semibold mb-4">
          <FaCheck className="inline mr-2" />
          Returns and Refunds
        </h2>
        <p>
          You may return products within 14 days of receipt for a refund or
          exchange. Products must be unused and in their original packaging.
        </p>
      </section>

      <footer className="text-center mt-12">
        <hr className="border-t-2 border-gray-300 w-1/4 mx-auto mb-4" />
        <p className="mb-2">
          <Phone className="inline mr-2" /> Contact us:+91 8155085865
        </p>
        <p>
          <FaEnvelope className="inline mr-2" /> Email: contact@pleasure.fashion
        </p>
      </footer>
    </div>
  );
}
