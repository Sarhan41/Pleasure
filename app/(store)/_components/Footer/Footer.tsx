import { TwitterLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaWhatsapp as Whatsapp,
  FaFacebook as Facebook,
  FaInstagram as Instagram,
  FaPinterest,
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
      { text: "white ", route: "/product/White" },
      { text: "Link 2", route: "/link2" },
      { text: "Link 3", route: "/link3" },
      { text: "red", route: "/product/Red-Suit" },
    ],
    Panties: [
      {
        text: "Julia",
        route:
          "/product/Hipster Modal Cotton Panties In Red Violet Ruby Pink (Pack Of 3) JULIA",
      },
      {
        text: "Berly",
        route:
          "/product/Hipster-Midrise-Modal-Stretch-Stripe-Panties-In-Red-Black-Rani-Pink-(Pack-of-3)-BERLY",
      },
      {
        text: "Pearl",
        route:
          "product/High-Waist-Full-Coverage-Printed-in-Dark-Grey-Navy-Blue-Maroon-Panties-(pack-of-3)-100-Cotton-PEARL",
      },
    ],
    NightSuit: [
      { text: "Link X", route: "/linkX" },
      { text: "Link Y", route: "/linkY" },
      { text: "Link Z", route: "/linkZ" },
    ],
    "Active Wear": [
      { text: "Link Alpha", route: "/linkAlpha" },
      { text: "Link Beta", route: "/linkBeta" },
      { text: "Link Gamma", route: "/linkGamma" },
    ],
  };

  const QuickLinks = [
    { text: "Home", route: "/" },
    { text: "blog", route: "/blog" },
    { text: "About Us", route: "/about" },
    { text: "Contact Us", route: "/contact" },
    { text: "Privacy Policy", route: "/privacy" },
    { text: "Terms & Conditions", route: "/terms" },
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
      route: "www.instagram.com",
      icon: <Instagram className="h-8 w-8 hover:text-primary" />,
    },
    {
      text: "Pinterest",
      route: "www.pinterest.com",
      icon: <FaPinterest className="h-8 w-8 hover:text-primary" />,
    },
    {
      text: "Twitter",
      route: "/www.X.com",
      icon: <TwitterLogoIcon className="h-8 w-8 hover:text-primary" />,
    },
  ];

  return (
    <>
      <div className="bg-pink-500 w-full overflow-hidden flex justify-center items-center py-4 mt-24 text-center">
        <Image
          src="/logo-text.jpg"
          height={48}
          width={298}
          alt=""
          className="object-cover"
        />
      </div>
      <footer className="bg-black py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 md:gap-x-12">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="m-2">
                <h2 className="text-white text-lg font-semibold mb-4 border-t-2 border-b-2 border-primary">
                  {category}
                </h2>
                <ul className="text-secondary">
                  {links.map((link, index) => (
                    <li key={index} className="mb-2 hover:text-primary">
                      <Link href={link.route} passHref>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="m-2">
              <h2 className="text-white text-lg font-semibold mb-4 border-t-2 border-b-2 border-primary">
                Quick Links
              </h2>
              <ul className="text-secondary">
                {QuickLinks.map((link, index) => (
                  <li key={index} className="mb-2 hover:text-primary">
                    <Link href={link.route}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between mx-12 max-sm:flex-col gap-12 border-t-2 mt-8 p-8 border-primary items-start">
          {/* Address */}
          <div>
            <h1 className="text-white border-b-2 mb-4 border-primary">
              REGISTERED OFFICE ADDRESS
            </h1>
            <p className="text-gray-200">{Address}</p>
          </div>
          {/* Support */}
          <div>
            <h1 className="text-white border-b-2 mb-4 border-primary">
              SUPPORT
            </h1>
            <div className="text-white flex flex-col gap-4">
              <div>
                <p className="mb-2">Contact us: contact@pleasure.com</p>
                <p className="mb-2">Phone: +91 8155086856</p>
                <div className="flex gap-4">
                  {SocialLinks.map((link, index) => (
                    <Link
                      target="_blank"
                      key={index}
                      href={link.route}
                      className="text-white mt-4 flex gap-6"
                    >
                      {link.icon} {/* Here, the icon is added */}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Details */}

          {/* Payment Options */}
          <div className="text-white">
            <h1 className="border-b-2 mb-4 border-primary">PAYMENT OPTIONS</h1>
            <div className="flex items-center gap-2">
              <SiRazorpay className="h-8 w-8" />
              <span>Razorpay</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
