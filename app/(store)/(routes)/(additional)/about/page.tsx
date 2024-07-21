import Container from "@/components/Store/container";
import { FaHeart, FaGlobe, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-white lg:mt-14">
      <Container>
        <div className="px-4 lg:py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-primary w-fit border-b-black">
            About Us
          </h1>
          <div className="mt-4 text-lg space-y-6">
            <p>
              Welcome to our PLEASURE's site where we sell high-quality ladies'
              undergarments. Our mission is to provide the best products and
              customer service.
            </p>
            <div className="flex items-start space-x-2">
              <FaHeart className="text-primary mt-1" />
              <p>
                We are committed to providing comfortable, stylish, and durable
                undergarments for women of all sizes and shapes.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <FaGlobe className="text-primary mt-1" />
              <p>
                Our products are sourced from top manufacturers around the world
                to ensure the highest quality.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <FaUsers className="text-primary mt-1" />
              <p>
                We believe in empowering women by providing products that make
                them feel confident and comfortable.
              </p>
            </div>
            <p>
              Our team is dedicated to ensuring you have a great shopping
              experience with us. From the moment you browse our site to the
              time you receive your order, we are here to assist you with any
              questions or concerns.
            </p>
            <h2 className="text-xl border-b-2 w-fit border-b-black font-bold text-primary">
              Our Values
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Quality</h3>
                <p>
                  We never compromise on quality. Our products are made with the
                  finest materials and craftsmanship.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Customer Satisfaction</h3>
                <p>
                  Your satisfaction is our priority. We strive to provide
                  excellent customer service and a seamless shopping experience.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Innovation</h3>
                <p>
                  We continuously innovate our products to meet the evolving
                  needs of our customers.
                </p>
              </div>
            </div>
            <p>
              Thank you for choosing us. We look forward to serving you and
              helping you find the perfect undergarments to suit your needs.
            </p>
            <p className="text-sm text-gray-600">
              For any inquiries, please contact us at contact@example.com. We
              are here to help!
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
