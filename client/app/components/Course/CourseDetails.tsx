"use client";

import React from "react";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import {
  HiOutlinePlay,
  HiOutlineGlobeAlt,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import CourseContent, { CourseSection } from "./CourseContent";

export interface CourseDetailType {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorTitle?: string;
  instructorBio?: string;
  rating: number;
  reviewsCount?: number;
  students: number;
  price: number;
  originalPrice?: number;
  level: string;
  language?: string;
  lastUpdated?: string;
  tags: string[];
  benefits: string[];
  prerequisites: string[];
  courseData: CourseSection[];
}

interface Props {
  course: CourseDetailType;
}

const CourseDetails: React.FC<Props> = ({ course }) => {
  return (
    <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-10 py-10 font-Poppins">
      <nav className="text-xs text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#39c1f3]">Home</Link>
        <span>&rsaquo;</span>
        <Link href="/courses" className="hover:text-[#39c1f3]">Courses</Link>
        <span>&rsaquo;</span>
        <span className="text-gray-900 dark:text-white truncate max-w-xs">{course.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {course.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#39c1f3]/10 text-[#39c1f3] border border-[#39c1f3]/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-Josefin font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <span>{course.rating.toFixed(1)}</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar key={i} size={15} />
                  ))}
                </div>
                <span className="text-gray-500 dark:text-gray-400 font-normal">
                  ({course.reviewsCount || 420} reviews)
                </span>
              </div>

              <span>&bull;</span>
              <span>{course.students.toLocaleString()} students</span>
              <span>&bull;</span>
              <span>Created by <span className="font-semibold text-gray-900 dark:text-white">{course.instructor}</span></span>
              <span>&bull;</span>
              <div className="flex items-center gap-1">
                <HiOutlineGlobeAlt size={16} />
                <span>{course.language || "English"}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-[#1a1d2e]/60">
            <h2 className="text-lg font-Josefin font-bold text-gray-900 dark:text-white mb-4">
              What you&apos;ll learn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <FaCheck className="text-[#39c1f3] mt-1 shrink-0" size={13} />
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-snug">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-Josefin font-bold text-gray-900 dark:text-white mb-4">
              Course Curriculum
            </h2>
            <CourseContent courseData={course.courseData} />
          </div>

          <div>
            <h2 className="text-xl font-Josefin font-bold text-gray-900 dark:text-white mb-3">
              Requirements
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              {course.prerequisites.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1d2e]">
            <h2 className="text-xl font-Josefin font-bold text-gray-900 dark:text-white mb-4">
              Your Instructor
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#39c1f3] to-[#37a39a] flex items-center justify-center text-white text-xl font-bold font-Josefin shrink-0 shadow-md">
                {course.instructor.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {course.instructor}
                </h3>
                <p className="text-xs text-[#39c1f3] font-medium mb-2">
                  {course.instructorTitle || "Senior Software Engineer & Educator"}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {course.instructorBio ||
                    "Passionate engineer with over 8 years of production experience building high-scale web platforms. Committed to making technical concepts approachable, practical, and enjoyable for students worldwide."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1d2e] shadow-xl overflow-hidden">
            <div className="relative h-52 bg-gray-900 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="relative z-10 text-center text-white">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 hover:scale-110 transition-transform cursor-pointer">
                  <HiOutlinePlay size={30} className="ml-1 text-white" />
                </div>
                <span className="text-xs font-semibold tracking-wide">Preview this course</span>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-Josefin font-bold text-gray-900 dark:text-white">
                  {course.price === 0 ? "Free" : `$${course.price}`}
                </span>
                {course.originalPrice && (
                  <span className="text-sm line-through text-gray-400">
                    ${course.originalPrice}
                  </span>
                )}
                {course.originalPrice && (
                  <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <div className="space-y-2.5">
                <Link
                  href={`/course-access/${course.id}`}
                  className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-[#39c1f3] hover:bg-[#25addf] text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Enroll Now
                </Link>
                <button
                  type="button"
                  className="w-full py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Add to Wishlist
                </button>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300">
                <p className="font-semibold text-gray-900 dark:text-white text-xs uppercase tracking-wider">
                  This course includes:
                </p>
                <div className="flex items-center gap-3">
                  <HiOutlineClock className="text-[#39c1f3]" size={16} />
                  <span>24 hours on-demand video</span>
                </div>
                <div className="flex items-center gap-3">
                  <HiOutlineDocumentText className="text-[#39c1f3]" size={16} />
                  <span>38 downloadable resources</span>
                </div>
                <div className="flex items-center gap-3">
                  <HiOutlineAcademicCap className="text-[#39c1f3]" size={16} />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3">
                  <HiOutlineShieldCheck className="text-[#39c1f3]" size={16} />
                  <span>Full lifetime access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;