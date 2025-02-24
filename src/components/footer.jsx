import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Logo and Details */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-[80px] w-[80px] rounded-full mb-4"
            />
            <p className="text-sm text-gray-400 text-center md:text-left">
              Crystal Beauty Clear PVT LTD
            </p>
            <p className="text-sm text-gray-400 text-center md:text-left">
              Transforming beauty with clarity and elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-PrimaryGold text-lg font-bold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-PrimaryGold transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-400 hover:text-PrimaryGold transition-colors duration-300"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-PrimaryGold transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-PrimaryGold transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-PrimaryGold text-lg font-bold mb-4">
              Contact Us
            </h3>
            <p className="text-gray-400">Email: info@crystalbeauty.com</p>
            <p className="text-gray-400">Phone: +94 123 456 789</p>
            <p className="text-gray-400">Address: 123 Beauty St, Colombo, Sri Lanka</p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-PrimaryGold text-lg font-bold mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-PrimaryGold transition-colors duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-PrimaryGold transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-PrimaryGold transition-colors duration-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-PrimaryGold transition-colors duration-300"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Crystal Beauty Clear PVT LTD. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}