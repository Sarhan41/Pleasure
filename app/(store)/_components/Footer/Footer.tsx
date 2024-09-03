import { TwitterLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaWhatsapp as Whatsapp,
  FaFacebook as Facebook,
  FaInstagram as Instagram,
  // FaPinterest, // Commented out as per request
} from "react-icons/fa";
import { SiRazorpay } from "react-icons/si"; // Razorpay icon

const Footer: React.FC = () => {
  const Address = (
    <>
      30, Raychandnagar, Opp. Shukan Mall, <br />
      Nr. Visat Circle, Sabarmati, <br />
      Ahmedabad, Gujarat, 380005
    </>
  );

  const footerLinks = {
    "Sport Bras": [
      {
        text: "Hot Pink",
        route:
          "Hot Pink White Skin Black Red Maroon Grey Cotton Spandex Stretchable Womens Sports Bra (Pack of 2) Buy Any 3 Pcs",
      },
      { text: "Purple Maroon", route: "Spandex Purple Maroon Sports Bra" },
      { text: "Blue Printed", route: "Blue Printed Designer Sports Bra" },
    ],
    Panties: [
      {
        text: "Julia",
        route:
          "Hipster Modal Cotton Panties In Red Violet Ruby Pink (Pack Of 3) JULIA",
      },
      {
        text: "Berly",
        route:
          "Hipster Midrise Modal Stretch Stripe Panties In Red Black Rani Pink (Pack of 3) BERLY",
      },
      {
        text: "Pearl",
        route:
          "High Waist Full Coverage Printed in Dark Grey Navy Blue Maroon Panties (pack of 3) 100 Cotton PEARL",
      },
    ],
    NightSuit: [
      {
        text: "White",
        route:
          "/Hipster Modal Cotton Panties In Red Violet Ruby Pink (Pack Of 3) JULIA",
      },
      {
        text: "Pink",
        route:
          "Hipster Midrise Modal Stretch Stripe Panties In Red Black Rani Pink (Pack of 3) BERLY",
      },
      {
        text: "Grey",
        route:
          "High Waist Full Coverage Printed in Dark Grey Navy Blue Maroon Panties (pack of 3) 100 Cotton PEARL",
      },
    ],
    "Active Wear": [
      {
        text: "Hot Pink",
        route:
          "Hot Pink White Skin Black Red Maroon Grey Cotton Spandex Stretchable Womens Sports Bra (Pack of 2) Buy Any 3 Pcs",
      },
      { text: "Purple Maroon", route: "Spandex Purple Maroon Sports Bra" },
      { text: "Blue Printed", route: "Blue Printed Designer Sports Bra" },
    ],
  };

  const QuickLinks = [
    { text: "Home", route: "/" },
    { text: "Blog", route: "/blog" },
    { text: "About Us", route: "/about" },
    { text: "Order Track", route: "/order-tracking" },
    { text: "Contact Us", route: "/contact-us" },
    { text: "Shipping Policy", route: "/shipping-delivery" },
    { text: "Exchange Policy", route: "/exchange-policy" },
    { text: "Terms & Conditions", route: "/terms-condition" },
  ];
  const SocialLinks = [
    {
      text: "Whatsapp",
      route: `https://wa.me/918155085865?text=Hello%20there!`,
      icon: <Whatsapp className="h-8 w-8 hover:text-primary" />,
    },
    {
      text: "Facebook",
      route: "/facebook",
      icon: <Facebook className="h-8 w-8 hover:text-primary" />,
    },
    {
      text: "Instagram",
      route: "https://www.instagram.com/pleasure.fashion_/",
      icon: <Instagram className="h-8 w-8 hover:text-primary" />,
    },
    // Commented out as per request
    // {
    //   text: "Pinterest",
    //   route: "www.pinterest.com",
    //   icon: <FaPinterest className="h-8 w-8 hover:text-primary" />,
    // },
    // {
    //   text: "Twitter",
    //   route: "/www.X.com",
    //   icon: <TwitterLogoIcon className="h-8 w-8 hover:text-primary" />,
    // },
  ];

  return (
    <>
      {/* <div>
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category} className="m-2">
            <h2 className="text-white text-lg font-semibold mb-4 border-t-2 border-b-2 border-primary">
              {category}
            </h2>
            <ul className="text-secondary">
              {links.map((link, index) => (
                <li key={index} className="mb-2 hover:text-primary">
                  <Link prefetch={true}
                    aria-label="Link"
                    href={`/product/${link.route.replace(/\s+/g, "-")}`}
                    passHref
  rel="noopener noreferrer"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}

      <div className="bg-pink-500 w-full overflow-hidden flex justify-center items-center py-4 mt-24 text-center">
        <Link prefetch={true} aria-label="Link" href="/">
          <Image
            src="/logo-text.jpg"
            height={48}
            width={298}
            alt=""
            className="object-cover"
          />
        </Link>
      </div>
      <footer className="bg-black py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-x-12 lg:gap-x-">
            {/* Quick Links */}
            <div className="m-2">
              <h2 className="text-white w-fit text-lg font-semibold mb-4 border-t-2 border-b-2 border-primary">
                Quick Links
              </h2>
              <ul className="text-secondary">
                {QuickLinks.map((link, index) => (
                  <li key={index} className="mb-2 hover:text-primary">
                    <Link prefetch={true} aria-label="Link"  href={link.route}>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Support */}
            <div className="m-2 lg:ml-96">
              <h2 className="text-white text-lg font-semibold mb-4 w-fit border-t-2 border-b-2 border-primary">
                Support
              </h2>
              <div className="text-secondary w-full">
                <p className="mb-2 lg:whitespace-nowrap">
                  Contact us: contact@pleasure.fashion
                </p>
                <p className="mb-2 lg:whitespace-nowrap">
                  Phone: +91 8155085865
                </p>
                <div className="flex gap-4 mt-4">
                  {SocialLinks.map((link, index) => (
                    <Link prefetch={true}
                      aria-label="Link"
                      key={`social-${index}`}
                      href={link.route}
                      className="text-white flex gap-6"
                    >
                      {link.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Additional Section (if any) */}
            {/* ... */}
          </div>
          <div className="mt-12 border-t-2 pt-8 border-primary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-x-12 lg:gap-x-">
              {/* Registered Office Address */}
              <div>
                <h1 className="text-white border-b-2 w-fit mb-4 border-primary">
                  REGISTERED OFFICE ADDRESS
                </h1>
                <h1 className="text-base font-bold uppercase text-white">
                  Pleasure
                </h1>
                <p className="text-gray-200">{Address}</p>
              </div>
              {/* Payment Options */}
              <div className="text-white lg:ml-96 w-full max-sm:mt-4">
                <h1 className="border-b-2 mb-4 w-fit border-primary">
                  PAYMENT OPTIONS
                </h1>
                <div className="flex items-center gap-2">
                  <SiRazorpay className="h-8 w-8" />
                  <span>Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
