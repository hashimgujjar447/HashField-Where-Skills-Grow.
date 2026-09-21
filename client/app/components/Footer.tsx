"use client";

import React from "react";
import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-[#0b0f17] text-gray-300 pt-16 pb-8 mt-16">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link href="/" className="text-2xl font-Josefin font-[700] text-white">
              ELearn
            </Link>
            <p className="mt-4 text-sm font-Poppins leading-7 text-gray-400">
              Empowering learners worldwide with quality education. Join 500K+ students already learning with us.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-[#39c1f3] transition-colors"><FaTwitter size={18} /></a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-[#39c1f3] transition-colors"><FaFacebook size={18} /></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-[#39c1f3] transition-colors"><FaInstagram size={18} /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-[#39c1f3] transition-colors"><FaLinkedin size={18} /></a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-[#39c1f3] transition-colors"><FaYoutube size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-Josefin font-[600] text-[16px] mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[{ name: "Home", href: "/" }, { name: "Courses", href: "/courses" }, { name: "About Us", href: "/about" }, { name: "FAQ", href: "/faq" }, { name: "Privacy Policy", href: "/policy" }].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-Poppins text-gray-400 hover:text-[#39c1f3] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-Josefin font-[600] text-[16px] mb-4">Top Courses</h3>
            <ul className="space-y-3">
              {["Web Development", "React & Next.js", "Node.js & Express", "Python & AI", "Data Science", "UI/UX Design"].map((course) => (
                <li key={course}>
                  <Link href="/courses" className="text-sm font-Poppins text-gray-400 hover:text-[#39c1f3] transition-colors">
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-Josefin font-[600] text-[16px] mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiOutlineMail className="text-[#39c1f3] mt-0.5 shrink-0" size={18} />
                <span className="text-sm font-Poppins text-gray-400">support@elearn.com</span>
              </li>
              <li className="flex items-start gap-3">
                <HiOutlinePhone className="text-[#39c1f3] mt-0.5 shrink-0" size={18} />
                <span className="text-sm font-Poppins text-gray-400">+92 300 1234567</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm font-Poppins text-gray-400 mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 dark:bg-[#1a1d2e] border border-gray-700 dark:border-[#ffffff1c] rounded-l-[5px] text-white placeholder:text-gray-500 outline-none focus:border-[#39c1f3]"
                />
                <button className="px-4 py-2 bg-[#39c1f3] hover:bg-[#25addf] text-white text-sm font-Poppins rounded-r-[5px] transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-[#ffffff1c] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-Poppins text-gray-500">
            © {new Date().getFullYear()} ELearn. All rights reserved.
          </p>
          <p className="text-sm font-Poppins text-gray-500">
            Made with ❤️ by <span className="text-[#39c1f3]">HashField</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
