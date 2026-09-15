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
import CourseContent from "./CourseContent";
import { ICourse } from "@/app/types/course";

interface Props {
  course: ICourse;
}

const CourseDetails: React.FC<Props> = ({ course }) => {
  const discount =
    course.estimatedPrice && course.estimatedPrice > course.price
      ? Math.round(
          ((course.estimatedPrice - course.price) / course.estimatedPrice) *
            100,
        )
      : 0;

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 font-poppins sm:px-8 lg:px-10">
      <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-[#39c1f3]">
          Home
        </Link>

        <span>&rsaquo;</span>

        <Link href="/courses" className="hover:text-[#39c1f3]">
          Courses
        </Link>

        <span>&rsaquo;</span>

        <span className="max-w-xs truncate text-gray-900 dark:text-white">
          {course.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {course.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full border border-[#39c1f3]/20 bg-[#39c1f3]/10 px-2.5 py-1 text-xs font-semibold text-[#39c1f3]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mb-4 font-josefin text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
              {course.title}
            </h1>

            <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              <div className="flex items-center gap-1 text-amber-500">
                <span className="font-bold">{course.ratings.toFixed(1)}</span>

                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, index) => (
                    <AiFillStar key={index} size={15} />
                  ))}
                </div>

                <span className="font-normal text-gray-500 dark:text-gray-400">
                  ({course.reviews.length} reviews)
                </span>
              </div>

              <span>&bull;</span>

              <span>{course.purchased.toLocaleString()} students</span>

              <span>&bull;</span>

              <span className="capitalize">{course.level}</span>

              <span>&bull;</span>

              <div className="flex items-center gap-1">
                <HiOutlineGlobeAlt size={16} />
                <span>English</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-6 dark:border-gray-800 dark:bg-[#1a1d2e]/60">
            <h2 className="mb-4 font-josefin text-lg font-bold text-gray-900 dark:text-white">
              What you&apos;ll learn
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {course.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FaCheck className="mt-1 shrink-0 text-[#39c1f3]" size={13} />

                  <span className="text-xs leading-snug text-gray-700 dark:text-gray-300 sm:text-sm">
                    {benefit.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-josefin text-xl font-bold text-gray-900 dark:text-white">
              Course Curriculum
            </h2>

            <CourseContent courseData={course.courseData} />
          </div>

          <div>
            <h2 className="mb-3 font-josefin text-xl font-bold text-gray-900 dark:text-white">
              Requirements
            </h2>

            <ul className="list-inside list-disc space-y-2 text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
              {course.prerequisites.map((req, index) => (
                <li key={index}>{req.title}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#1a1d2e]">
            <h2 className="mb-4 font-josefin text-xl font-bold text-gray-900 dark:text-white">
              Course Information
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Skill Level
                </p>

                <p className="mt-1 text-sm font-semibold capitalize text-gray-900 dark:text-white">
                  {course.level}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Total Students
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {course.purchased.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Rating
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {course.ratings.toFixed(1)} / 5
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Lessons
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {course.courseData.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-[#1a1d2e]">
            <div
              className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-900"
              style={
                course.thumbnail
                  ? {
                      backgroundImage: `url(${course.thumbnail.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="relative z-10 text-center text-white">
                <div className="mx-auto mb-2 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform hover:scale-110">
                  <HiOutlinePlay size={30} className="ml-1 text-white" />
                </div>

                <span className="text-xs font-semibold tracking-wide">
                  Preview this course
                </span>
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-josefin text-3xl font-bold text-gray-900 dark:text-white">
                  {course.price === 0 ? "Free" : `Rs. ${course.price}`}
                </span>

                {course.estimatedPrice &&
                  course.estimatedPrice > course.price && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        Rs. {course.estimatedPrice}
                      </span>

                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">
                        {discount}% OFF
                      </span>
                    </>
                  )}
              </div>

              <div className="space-y-2.5">
                <Link
                  href={`/course-access/${course._id}`}
                  className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#39c1f3] px-4 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-[#25addf] hover:shadow-lg"
                >
                  Enroll Now
                </Link>

                <button
                  type="button"
                  className="w-full cursor-pointer rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Add to Wishlist
                </button>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-4 text-xs text-gray-600 dark:border-gray-800 dark:text-gray-300">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                  This course includes:
                </p>

                <div className="flex items-center gap-3">
                  <HiOutlineClock className="text-[#39c1f3]" size={16} />
                  <span>On-demand video lessons</span>
                </div>

                <div className="flex items-center gap-3">
                  <HiOutlineDocumentText className="text-[#39c1f3]" size={16} />
                  <span>Course resources</span>
                </div>

                <div className="flex items-center gap-3">
                  <HiOutlineAcademicCap className="text-[#39c1f3]" size={16} />
                  <span>Certificate of completion</span>
                </div>

                <div className="flex items-center gap-3">
                  <HiOutlineShieldCheck className="text-[#39c1f3]" size={16} />
                  <span>Full course access</span>
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