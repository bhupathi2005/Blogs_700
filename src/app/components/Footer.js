import React from "react";
import Link from "next/link"; // Next.js Link component for routing

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-10 px-6 font-sans">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h4 className="text-xl font-semibold mb-4">700 Sewage Cleaning Services UAE</h4>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about-us"
                className="text-white hover:text-yellow-400 transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-white hover:text-yellow-400 transition-colors duration-300"
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-white hover:text-yellow-400 transition-colors duration-300"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-white hover:text-yellow-400 transition-colors duration-300"
              >
                Our Projects
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>Electrical Safety</li>
            <li>Blog</li>
            <li>Energy Efficiency</li>
          </ul>
        </div>

        {/* Contact Now */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Contact Now</h4>
          <a
            href="tel:+971555989664"
            className="inline-block bg-[#FFA500] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-[#FF8C00] transform hover:scale-105"
          >
            Call Us Now
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-white mt-10 pt-6 text-center text-sm">
        <p>
          Copyright © 2025 700Sewag | Design by{" "}
          <Link
            href="https://www.linkedin.com/in/geddada-renuka-6aa213300/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400 transition-colors duration-300"
          >
            Renuka
          </Link>
          ,{" "}
          <Link
            href="https://www.linkedin.com/in/arikatla-bhupathi-naidu-02356828a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400 transition-colors duration-300"
          >
            Bhupathi
          </Link>
          ,{" "}
          <Link
            href="https://www.linkedin.com/in/nagababu-a-a20aa2269/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400 transition-colors duration-300"
          >
            Nagababu
          </Link>
        </p>

        <div className="mt-4 flex justify-center gap-6">
          <Link
            href="#terms"
            className="text-white hover:text-green-400 transition-colors duration-300"
          >
            Terms of Use
          </Link>
          <Link
            href="#privacy"
            className="text-white hover:text-green-400 transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="#cookies"
            className="text-white hover:text-green-400 transition-colors duration-300"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
