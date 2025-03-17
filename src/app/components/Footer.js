// components/Footer.js
import React from "react";
import Link from "next/link"; // Next.js Link component for routing

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-8 px-4 font-sans mb-0">
      <div className="flex flex-wrap justify-between gap-8 max-w-screen-xl mx-auto">
        {/* Company Info and Social Media */}
        <div className="flex-1 min-w-[200px]">
          <p className="text-lg">700 Sewage Cleaning Services UAE</p>
        </div>

        {/* Company Links */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-xl mb-4">Company</h4>
          <ul>
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
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-xl mb-4">Resources</h4>
          <ul>
            <li>Electrical Safety</li>
            <li>Blog</li>
            <li>Energy Efficiency</li>
          </ul>
        </div>

        {/* Contact Now Section */}
        <div className="flex-1 min-w-[200px]">
          <h4 className="text-xl mb-4">Contact Now</h4>
          <a
            href="tel:+971555989664"
            className="inline-block bg-yellow-400 text-black font-bold py-2 px-4 rounded-full transition-all duration-300 hover:bg-green-600 transform hover:scale-105"
          >
            Call Us Now
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white mt-8 pt-4 text-center text-sm">
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

        <div className="mt-2 flex justify-center gap-4">
          <Link
            href="#terms"
            className="text-white hover:text-green-600 transition-colors duration-300"
          >
            Term of use
          </Link>
          <Link
            href="#privacy"
            className="text-white hover:text-green-600 transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="#cookies"
            className="text-white hover:text-green-600 transition-colors duration-300"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
