"use client";

import React from "react";
import { AiFillStar } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Tariq Mansoor",
    role: "Full-Stack Engineer at TechCorp",
    avatarBg: "from-blue-500 to-indigo-600",
    rating: 5,
    course: "React & Next.js Mastery",
    feedback:
      "The practical, real-world patterns taught in these courses helped me land a senior engineering role within 3 months. The quality of code walkthroughs is unparalleled.",
  },
  {
    name: "Alina Siddiqui",
    role: "Data Analyst at FinGrowth",
    avatarBg: "from-emerald-400 to-teal-600",
    rating: 5,
    course: "Python & AI Bootcamp",
    feedback:
      "Transitioning from non-tech to data science felt intimidating until I joined ELearn. The step-by-step assignments and active Q&A forum made everything click.",
  },
  {
    name: "Kashif Rehman",
    role: "DevOps Engineer",
    avatarBg: "from-amber-400 to-orange-500",
    rating: 5,
    course: "Docker & Cloud DevOps",
    feedback:
      "Zero fluff, pure substance. Deploying microservices with resilient caching was explained better here than in university degree programs.",
  },
  {
    name: "Zoya Haider",
    role: "Product Designer",
    avatarBg: "from-pink-500 to-rose-600",
    rating: 5,
    course: "UI/UX with Figma",
    feedback:
      "Loved how design thinking and developer handoff were prioritized together. My design portfolio improved tenfold after completing this track.",
  },
  {
    name: "Farhan Qureshi",
    role: "Backend Architect",
    avatarBg: "from-purple-500 to-violet-600",
    rating: 5,
    course: "Node.js Microservices",
    feedback:
      "The deep dive into event-driven patterns, Redis queue management, and JWT session handling is golden. Highly recommended for every serious dev.",
  },
  {
    name: "Mahnoor Aslam",
    role: "CS Student & Intern",
    avatarBg: "from-cyan-400 to-blue-600",
    rating: 5,
    course: "Modern Web Development",
    feedback:
      "Having full lifetime access and downloadable lesson assets allowed me to study at my own pace during semester exams. 10/10 experience!",
  },
];

const Reviews = () => {
  return (
    <section className="w-full py-20 bg-gray-50/60 dark:bg-[#111622] font-Poppins border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#39c1f3]">
            Student Stories
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-Josefin font-bold text-gray-900 dark:text-white mt-1">
            Loved by 500,000+ Learners
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
            See how ELearn courses are empowering developers, designers, and tech innovators worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#1a1d2e] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <AiFillStar key={i} size={15} />
                    ))}
                  </div>
                  <FaQuoteLeft className="text-gray-200 dark:text-gray-700" size={18} />
                </div>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic mb-6">
                  &ldquo;{t.feedback}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-tr ${t.avatarBg} flex items-center justify-center text-white text-xs font-bold font-Josefin shrink-0 shadow-sm`}
                >
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {t.role}
                  </p>
                  <p className="text-[10px] text-[#39c1f3] font-medium">
                    {t.course}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;