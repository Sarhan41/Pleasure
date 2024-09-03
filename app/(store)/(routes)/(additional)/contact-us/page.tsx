import Container from "@/components/Store/container";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 lg:mt-14">
      <Container>
        <div className="px-4 lg:py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary border-b-4 border-primary inline-block pb-2">
            Contact Us
          </h1>
          <div className="mt-8 text-lg space-y-8">
            <p className="leading-relaxed text-gray-700">
              We're here to help with any questions or concerns you may have. 
              Feel free to reach out to us via the following methods:
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaPhone className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600">+91 8155085865</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">contact@pleasure.fashion</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600">
                    30, Raychandnagar, Opp. Shukan Mall, <br />
                    Nr. Visat Circle, Sabarmati, <br />
                    Ahmedabad, Gujarat, 380005
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our customer service team is available Monday through Friday, from 9 AM to 6 PM IST. We strive to respond to all inquiries within 24 hours.
            </p>
            <p className="text-sm text-gray-500">
              Follow us on social media for the latest updates and promotions.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
