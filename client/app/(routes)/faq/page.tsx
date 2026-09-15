"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Heading from "../../utils/Heading";
import { HiOutlineChevronDown, HiOutlineSearch } from "react-icons/hi";

const faqItems = [
  {
    q: "How do I enroll in a course on ELearn?",
    a: "Browse our course catalog, click on your desired course to view curriculum and preview lectures, then click 'Enroll Now'. Once registered or signed in, access is granted instantly to your dashboard.",
  },
  {
    q: "What payment methods are supported?",
    a: "We support all major credit cards, debit cards, PayPal, and regional mobile payment options via our encrypted payment gateways.",
  },
  {
    q: "Can I request a refund if a course isn't right for me?",
    a: "Yes! We offer a 14-day money-back guarantee on all courses, provided less than 25% of the curriculum has been completed.",
  },
  {
    q: "Are the courses self-paced or do they have fixed schedules?",
    a: "All ELearn courses are 100% self-paced. Once enrolled, you have 24/7 lifetime access to all lectures, project files, and future updates.",
  },
  {
    q: "Do I receive a certificate upon course completion?",
    a: "Yes. Once you complete 100% of the lessons and mandatory quizzes, an industry-recognized, shareable digital certificate of completion is automatically generated.",
  },
  {
    q: "How can I ask questions if I get stuck on a coding lesson?",
    a: "Every lesson has a dedicated Q&A discussion tab right under the video player. You can post questions with code snippets, and our mentors or fellow students reply within 24 hours.",
  },
  {
    q: "Can I download course videos for offline viewing?",
    a: "Supplementary resources, cheat sheets, and source code repositories are fully downloadable. Videos are streamed in high-definition through our video player.",
  },
  {
    q: "Are courses updated when new versions of libraries are released?",
    a: "Yes! When major framework updates launch (like Next.js 16 or Tailwind v4), our instructors add update modules or revise existing lessons at no extra cost.",
  },
];

const FaqPage = () => {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqItems.filter(
    (item) =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-gray-900 dark:text-white font-Poppins">
      <Heading
        title="FAQ - Frequently Asked Questions | ELearn"
        description="Find answers to common questions about enrollment, courses, certificates, and platform access."
        keywords="faq, questions, support, elearn help"
      />

      <Header open={open} setOpen={setOpen} activeItem={4} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#39c1f3]">Help & Support</span>
          <h1 className="text-3xl sm:text-4xl font-Josefin font-bold mt-2 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-lg mx-auto">
            Everything you need to know about our courses, certificates, and student benefits.
          </p>

          {/* Search Input */}
          <div className="relative max-w-md mx-auto mt-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1d2e] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
            />
            <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1d2e] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-transparent hover:bg-gray-50 dark:hover:bg-[#151928] transition-colors cursor-pointer"
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.q}
                  </span>
                  <HiOutlineChevronDown
                    className={`text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#39c1f3]" : ""}`}
                    size={20}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800/80">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FaqPage;