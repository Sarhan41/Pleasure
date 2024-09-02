import Link from "next/link";
import { FaLock, FaUserShield, FaPhone, FaEnvelope } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl text-primary font-bold mb-4">Privacy Policy</h1>
        <hr className="border-t-2 border-gray-300 w-1/4 mx-auto" />
      </header>

      <section className="mb-12">
        <h2 className="text-2xl text-primary font-semibold mb-4">
          <FaLock className="inline mr-2" />
          Introduction
        </h2>
        <p>
          Welcome to Pleasure lingerie. We are committed to protecting your
          personal information and your right to privacy. If you have any
          questions or concerns about this privacy notice or our practices with
          regard to your personal information, please contact us at
          contact@pleasure.fashion.
        </p>
        <p>
          When you visit our website{" "}
          <Link prefetch={true}
            href="https://pleasure.fashion"
            className="text-blue-500 hover:underline"
          >
            https://www.pleasure.fashion
          </Link>
          , and use our services, you trust us with your personal information.
          We take your privacy very seriously. In this privacy notice, we seek
          to explain to you in the clearest way possible what information we
          collect, how we use it, and what rights you have in relation to it.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl text-primary font-semibold mb-4">
          <FaUserShield className="inline mr-2" />
          Information We Collect
        </h2>
        <p>
          We collect personal information that you voluntarily provide to us
          when you register on the Website, express an interest in obtaining
          information about us or our products and services, when you
          participate in activities on the Website, or otherwise when you
          contact us.
        </p>
        <p>
          Personal Information Provided by You. The personal information that we
          collect depends on the context of your interactions with us and the
          Website, the choices you make, and the products and features you use.
          The personal information we collect may include the following:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Names</li>
          <li>Phone numbers</li>
          <li>Email addresses</li>
          <li>Mailing addresses</li>
          <li>Billing addresses</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl text-primary font-semibold mb-4">
          <FaUserShield className="inline mr-2" />
          How We Use Your Information
        </h2>
        <p>
          We use personal information collected via our Website for a variety of
          business purposes described below. We process your personal
          information for these purposes in reliance on our legitimate business
          interests, in order to enter into or perform a contract with you, with
          your consent, and/or for compliance with our legal obligations. We
          indicate the specific processing grounds we rely on next to each
          purpose listed below.
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>To facilitate account creation and logon process.</li>
          <li>To send administrative information to you.</li>
          <li>To fulfill and manage your orders.</li>
          <li>To deliver and facilitate delivery of services to the user.</li>
          <li>To respond to user inquiries/offer support to users.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl text-primary font-semibold mb-4">
          <FaUserShield className="inline mr-2" />
          Will Your Information Be Shared With Anyone?
        </h2>
        <p>
          We only share information with your consent, to comply with laws, to
          provide you with services, to protect your rights, or to fulfill
          business obligations.
        </p>
        <p>
          We may process or share your data that we hold based on the following
          legal basis:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>
            Consent: We may process your data if you have given us specific
            consent to use your personal information for a specific purpose.
          </li>
          <li>
            Legitimate Interests: We may process your data when it is reasonably
            necessary to achieve our legitimate business interests.
          </li>
          <li>
            Performance of a Contract: Where we have entered into a contract
            with you, we may process your personal information to fulfill the
            terms of our contract.
          </li>
          <li>
            Legal Obligations: We may disclose your information where we are
            legally required to do so in order to comply with applicable law,
            governmental requests, a judicial proceeding, court order, or legal
            process, such as in response to a court order or a subpoena
            (including in response to public authorities to meet national
            security or law enforcement requirements).
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl text-primary font-semibold mb-4">
          <FaUserShield className="inline mr-2" />
          How Long Do We Keep Your Information?
        </h2>
        <p>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than the
          period of time in which users have an account with us.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl text-primary font-semibold mb-4">
          <FaUserShield className="inline mr-2" />
          Data Breach
        </h2>
        <p>
          A privacy breach occurs when there is unauthorized access to or
          collection, use, disclosure, or disposal of personal information. You
          will be notified about data breaches when Pleasure lingerie believes
          you are likely to be at risk or serious harm. In the event that
          Pleasure lingerie becomes aware of a security breach which has
          resulted or may result in unauthorized access, use or disclosure of
          personal information, Pleasure lingerie will promptly investigate the
          matter and notify the applicable Supervisory Authority no later than
          72 hours after having become aware of it, unless the personal data
          breach is unlikely to result in a risk to the rights and freedoms of
          natural persons.
        </p>
      </section>

      <footer className="text-center mt-12">
        <hr className="border-t-2 border-gray-300 w-1/4 mx-auto mb-4" />
        <p className="mb-2">
          <FaPhone className="inline mr-2" /> Contact us: +91 8155085865
        </p>
        <p>
          <FaEnvelope className="inline mr-2" /> Email: contact@pleasure.fashion
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
