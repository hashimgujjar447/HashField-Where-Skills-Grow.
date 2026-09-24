"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 dark:bg-[#0b0f17] text-gray-300 pt-16 pb-8 mt-16 border-t border-gray-800 dark:border-slate-800/80">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Socials */}
          <div>
            <Link
              href="/"
              className="text-2xl font-Poppins font-bold text-white tracking-tight"
            >
              Hash<span className="text-[#39c1f3]">Field</span>
            </Link>
            <p className="mt-4 text-sm font-Poppins leading-7 text-gray-400">
              Empowering learners worldwide with quality education. Master modern web development, data science, and design with HashField.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com/hashimgujjar447"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 dark:bg-slate-800/80 text-gray-300 hover:text-white hover:bg-[#39c1f3] dark:hover:bg-[#39c1f3] transition-all duration-200"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-hashim-45b54b326/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 dark:bg-slate-800/80 text-gray-300 hover:text-white hover:bg-[#0a66c2] dark:hover:bg-[#0a66c2] transition-all duration-200"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="mailto:hashimgujjar4447@gmail.com"
                aria-label="Email"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 dark:bg-slate-800/80 text-gray-300 hover:text-white hover:bg-[#ea4335] dark:hover:bg-[#ea4335] transition-all duration-200"
              >
                <HiOutlineMail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-Josefin font-[600] text-[16px] mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Courses", href: "/courses" },
                { name: "About Us", href: "/about" },
                { name: "FAQ", href: "/faq" },
                { name: "Privacy Policy", href: "/policy" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-Poppins text-gray-400 hover:text-[#39c1f3] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Courses */}
          <div>
            <h3 className="text-white font-Josefin font-[600] text-[16px] mb-4 tracking-wide">
              Top Categories
            </h3>
            <ul className="space-y-3">
              {[
                "Web Development",
                "React & Next.js",
                "Node.js & Express",
                "Python & AI",
                "Data Science",
                "UI/UX Design",
              ].map((course) => (
                <li key={course}>
                  <Link
                    href="/courses"
                    className="text-sm font-Poppins text-gray-400 hover:text-[#39c1f3] transition-colors"
                  >
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-Josefin font-[600] text-[16px] mb-4 tracking-wide">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hashimgujjar4447@gmail.com"
                  className="flex items-center gap-3 text-sm font-Poppins text-gray-400 hover:text-[#39c1f3] transition-colors group"
                >
                  <HiOutlineMail
                    className="text-[#39c1f3] shrink-0 group-hover:scale-110 transition-transform"
                    size={20}
                  />
                  <span>hashimgujjar4447@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+923093185090"
                  className="flex items-center gap-3 text-sm font-Poppins text-gray-400 hover:text-[#39c1f3] transition-colors group"
                >
                  <HiOutlinePhone
                    className="text-[#39c1f3] shrink-0 group-hover:scale-110 transition-transform"
                    size={20}
                  />
                  <span>+92 309 3185090</span>
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-sm font-Poppins text-gray-400 mb-2">
                Subscribe to our newsletter
              </p>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 dark:bg-[#1a1d2e] border border-gray-700 dark:border-slate-700/80 rounded-l-lg text-white placeholder:text-gray-500 outline-none focus:border-[#39c1f3] transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#39c1f3] hover:bg-[#25addf] text-white text-sm font-Poppins font-medium rounded-r-lg transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="border-t border-gray-800 dark:border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-Poppins text-gray-500">
            © {new Date().getFullYear()} HashField. All rights reserved.
          </p>
          <p className="text-sm font-Poppins text-gray-500">
            Designed & Developed with ❤️ by{" "}
            <a
              href="https://github.com/hashimgujjar447"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#39c1f3] font-medium hover:underline"
            >
              Muhammad Hashim
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
