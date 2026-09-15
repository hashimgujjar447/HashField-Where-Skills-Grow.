"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Heading from "../../utils/Heading";

const sections = [
  { id: "collection", title: "Information We Collect" },
  { id: "usage", title: "How We Use Your Data" },
  { id: "sharing", title: "Data Sharing & Disclosure" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "security", title: "Data Protection & Security" },
  { id: "rights", title: "Your Privacy Rights" },
  { id: "contact", title: "Contact Information" },
];

const PolicyPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-gray-900 dark:text-white font-Poppins">
      <Heading
        title="Privacy Policy - ELearn"
        description="Read the ELearn privacy policy to understand how your data is protected and utilized."
        keywords="privacy policy, terms, data security"
      />

      <Header open={open} setOpen={setOpen} activeItem={3} />

      <main className="flex-1 max-w-[1500px] w-full mx-auto px-5 sm:px-8 lg:px-10 py-12">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#39c1f3]">Legal & Compliance</span>
          <h1 className="text-3xl sm:text-4xl font-Josefin font-bold text-gray-900 dark:text-white mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Last updated: September 2026 &bull; Effective immediately
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Table of Contents Sticky */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 p-5 rounded-xl bg-gray-50 dark:bg-[#1a1d2e] border border-gray-200 dark:border-gray-800 space-y-2 text-xs">
              <p className="font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                Contents
              </p>
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block py-1 text-gray-600 dark:text-gray-400 hover:text-[#39c1f3] transition-colors"
                >
                  {sec.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Policy Text Content */}
          <div className="lg:col-span-3 space-y-8 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <section id="collection" className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white font-Josefin">
                1. Information We Collect
              </h2>
              <p>
                When you create an account on ELearn, we collect standard registration details such as your full name, email address, and encrypted authentication credentials. For course purchases, transactions are handled through certified PCI-compliant gateways; we do not store raw card numbers.
              </p>
            </section>

            <section id="usage" className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white font-Josefin">
                2. How We Use Your Data
              </h2>
              <p>
                We use collected information to maintain your course progression, authenticate your account, distribute system notifications, issue completion certificates, and optimize platform responsiveness.
              </p>
            </section>

            <section id="sharing" className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white font-Josefin">
                3. Data Sharing & Disclosure
              </h2>
              <p>
                ELearn does not sell, rent, or trade your personal information to third-party marketing companies. Data is only communicated with essential cloud service providers (e.g., Redis session caching, email distribution) required to operate the application.
              </p>
            </section>

            <section id="cookies" className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white font-Josefin">
                4. Cookies & Tracking
              </h2>
              <p>
                We use secure HTTP-only cookies to store authentication tokens (Access & Refresh tokens) and theme preferences (light/dark mode). These cookies are essential for system security and seamless browsing.
              </p>
            </section>

            <section id="security" className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white font-Josefin">
                5. Data Protection & Security
              </h2>
              <p>
                We implement industry-standard AES encryption, bcrypt password hashing with salt rounds, and token rotation to prevent unauthorized intrusion and safeguard user records.
              </p>
            </section>

            <section id="rights" className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white font-Josefin">
                6. Your Privacy Rights
              </h2>
              <p>
                You retain the right to request a full copy of your account data, update inaccurate information, or permanently delete your account profile at any time through your dashboard settings.
              </p>
            </section>

            <section id="contact" className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white font-Josefin">
                7. Contact Information
              </h2>
              <p>
                For questions or inquiries regarding our privacy standards, please reach out to our team at{" "}
                <span className="text-[#39c1f3] font-medium">privacy@elearn.com</span>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PolicyPage;