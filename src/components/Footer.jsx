import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 mt-12 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-start gap-8">
          {/* Logo and Description */}
          <div className="w-full md:w-1/5">
            <h2 className="text-lg font-bold mb-2">LOGO</h2>
            <p>
              Our CBSE courses for 8th to 10th grade offer a comprehensive
              learning experience, combining expertly crafted content with
              interactive resources to help students.
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-1/12">
            <h3 className="text-lg font-bold mb-2">Courses</h3>
            <ul className="space-y-2">
              <li><a href="#courses" className="hover:underline">Science  10</a></li>
              <li><a href="#faq" className="hover:underline">Science  9</a></li>
              <li><a href="#register" className="hover:underline">Math   10</a></li>
              <li><a href="#contact" className="hover:underline">Math   9 Us</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/12">
            <h3 className="text-lg font-bold mb-2">Helpful Links</h3>
            <ul className="space-y-2">
              <li><a href="#courses" className="hover:underline">Courses</a></li>
              <li><a href="#faq" className="hover:underline">FAQ</a></li>
              <li><a href="#register" className="hover:underline">Register</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact and Subscribe */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-2">Contact Us</h3>
            <p>Phone: +91 91919191991</p>
            <p>Mail: <a href="mailto:abc@gmail.com" className="hover:underline">abc@gmail.com</a></p>
            
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-wrap justify-between items-center">
          <p className="text-sm">© 2025 All Rights Reserved</p>
          <div className="flex space-x-4">
            <a href="#facebook" className="hover:underline">Facebook</a>
            <a href="#twitter" className="hover:underline">Twitter</a>
            <a href="#instagram" className="hover:underline">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
