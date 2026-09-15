"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Stats from "../../components/Route/Stats";
import Heading from "../../utils/Heading";
import { HiOutlineLightBulb, HiOutlineGlobe, HiOutlineUserGroup, HiOutlineSparkles } from "react-icons/hi";

const teamMembers = [
  { name: "Muhammad Hashim", role: "Founder & Lead Architect", initials: "MH", bg: "from-blue-600 to-cyan-500" },
  { name: "Sara Khan", role: "Head of Backend Engineering", initials: "SK", bg: "from-emerald-500 to-teal-600" },
  { name: "Ahmad Ali", role: "Lead Frontend Instructor", initials: "AA", bg: "from-indigo-500 to-purple-600" },
  { name: "Zainab Noor", role: "Database & Cloud Mentor", initials: "ZN", bg: "from-amber-500 to-orange-600" },
  { name: "Hamza Raza", role: "Design Systems & UX Lead", initials: "HR", bg: "from-pink-500 to-rose-600" },
  { name: "Bilal Ahmed", role: "DevOps & Infrastructure Lead", initials: "BA", bg: "from-cyan-500 to-blue-600" },
];

const AboutPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-gray-900 dark:text-white font-Poppins">
      <Heading
        title="About Us - ELearn Learning Platform"
        description="Learn about ELearn mission, our dedicated team, and our vision for global tech education."
        keywords="about us, elearn mission, instructors, education platform"
      />

      <Header open={open} setOpen={setOpen} activeItem={2} />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-gray-50 dark:from-[#111622] to-white dark:to-[#0b0f17] text-center px-5">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#39c1f3]">Our Story & Mission</span>
            <h1 className="text-3xl sm:text-5xl font-Josefin font-bold mt-3 mb-6 text-gray-900 dark:text-white">
              Democratizing World-Class Tech Education
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              At ELearn, we believe high-caliber engineering education shouldn&apos;t be reserved for elite institutions. We build structured, project-driven learning tracks that empower ambitious developers to build real software.
            </p>
          </div>
        </section>

        {/* Stats */}
        <Stats />

        {/* Values Grid */}
        <section className="py-20 max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#39c1f3]">Core Values</span>
            <h2 className="text-2xl sm:text-3xl font-Josefin font-bold mt-1 text-gray-900 dark:text-white">
              The Principles That Guide Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: HiOutlineLightBulb, title: "Practical First", desc: "Every lecture builds toward real production software, not toy examples." },
              { icon: HiOutlineGlobe, title: "Global Access", desc: "Affordable and accessible learning materials tailored for students worldwide." },
              { icon: HiOutlineUserGroup, title: "Active Community", desc: "Engaged forums, real instructor replies, and peer review support." },
              { icon: HiOutlineSparkles, title: "Always Modern", desc: "Curricula constantly updated to reflect current enterprise standards." },
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-white dark:bg-[#1a1d2e] border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#39c1f3]/10 text-[#39c1f3] flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50/60 dark:bg-[#111622] border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#39c1f3]">Leadership</span>
              <h2 className="text-2xl sm:text-3xl font-Josefin font-bold mt-1 text-gray-900 dark:text-white">
                Meet the Instructors & Creators
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-[#1a1d2e] border border-gray-100 dark:border-gray-800 shadow-sm"
                >
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-tr ${member.bg} flex items-center justify-center text-white text-base font-bold font-Josefin shadow-sm shrink-0`}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-xs text-[#39c1f3] font-medium">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;