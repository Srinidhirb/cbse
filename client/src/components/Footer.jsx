import React from "react";
const Logo = "/assets/logo.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-12">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between gap-8">
          {/* Logo and Description */}
          <div className="w-full sm:w-1/3 md:w-1/4">
            <img src={Logo} alt="Logo" className="w-32 mb-3" />
            <p className="text-gray-300 text-sm">
              Our CBSE courses for 8th to 10th grade offer a comprehensive
              learning experience, combining expertly crafted content with
              interactive resources to help students excel.
            </p>
          </div>

          {/* Courses Links */}
          <div className="w-full sm:w-1/6 md:w-1/6">
            <h3 className="text-lg font-bold mb-3">Courses</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link
                  to="/courses"
                  className="hover:text-white transition-colors"
                >
                  Science 10
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-white transition-colors"
                >
                  Science 9
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-white transition-colors"
                >
                  Math 10
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-white transition-colors"
                >
                  Math 9
                </Link>
              </li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div className="w-full sm:w-1/6 md:w-1/6">
            <h3 className="text-lg font-bold mb-3">Helpful Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link
                  to="/courses"
                  className="hover:text-white transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-white transition-colors"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full sm:w-1/3 md:w-1/4">
            <h3 className="text-lg font-bold mb-3">Contact Us</h3>
            <p className="text-gray-300 text-sm">Phone: +91 91919191991</p>
            <p className="text-gray-300 text-sm">
              Email:{" "}
              <a
                href="mailto:abc@gmail.com"
                className="hover:text-white transition-colors"
              >
                abc@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-4 flex flex-wrap justify-between items-center text-sm">
          <p className="text-gray-400">© 2025 All Rights Reserved</p>
          <div className="flex space-x-6 mt-2 sm:mt-0">
            <a href="#facebook" className="hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#twitter" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#instagram" className="hover:text-white transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
