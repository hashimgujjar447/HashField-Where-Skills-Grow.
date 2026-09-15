"use client";

import React from "react";
import { HiOutlineUsers, HiOutlineAcademicCap, HiOutlineVideoCamera, HiOutlineStar } from "react-icons/hi";

const Stats = () => {
  const statsData = [
    {
      icon: HiOutlineUsers,
      number: "500K+",
      label: "Active Students",
      desc: "Empowering learners across 80+ countries",
    },
    {
      icon: HiOutlineVideoCamera,
      number: "40K+",
      label: "Online Courses",
      desc: "Comprehensive modules taught by leaders",
    },
    {
      icon: HiOutlineAcademicCap,
      number: "300+",
      label: "Expert Instructors",
      desc: "Verified industry veterans & engineers",
    },
    {
      icon: HiOutlineStar,
      number: "4.9/5",
      label: "Student Satisfaction",
      desc: "Over 120,000 five-star reviews",
    },
  ];

  return (
    <section className="w-full py-12 bg-gray-50/70 dark:bg-[#111622] border-y border-gray-200/60 dark:border-gray-800/60 font-Poppins">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-[#1a1d2e] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#39c1f3]/10 text-[#39c1f3] flex items-center justify-center shrink-0">
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-Josefin text-gray-900 dark:text-white">
                    {stat.number}
                  </h3>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-0.5">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                    {stat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;