"use client";

import React from "react";
import Link from "next/link";
import { HiOutlinePlay } from "react-icons/hi";

const enrolled = [
  {
    id: "1",
    title: "Complete Modern React & Next.js 16 Full-Stack Mastery",
    instructor: "Ahmad Ali",
    progress: 65,
    lastLesson: "Building Custom Hooks with TypeScript",
    thumbnailColor: "#6366f1",
  },
  {
    id: "2",
    title: "Node.js, Express & Microservices: The Enterprise Architecture",
    instructor: "Sara Khan",
    progress: 30,
    lastLesson: "Redis Caching Strategy & Invalidation",
    thumbnailColor: "#10b981",
  },
  {
    id: "3",
    title: "Python, AI & Data Science Complete Hands-on Bootcamp",
    instructor: "Usman Tariq",
    progress: 100,
    lastLesson: "Course Completed & Certificate Issued",
    thumbnailColor: "#3b82f6",
  },
];

const EnrolledCourses = () => {
  return (
    <div className="space-y-6 font-Poppins">
      <div>
        <h2 className="text-xl font-Josefin font-bold text-gray-900 dark:text-white">
          Enrolled Courses ({enrolled.length})
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Pick up where you left off and track your lecture progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrolled.map((course) => (
          <div
            key={course.id}
            className="flex flex-col bg-white dark:bg-[#1a1d2e] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
          >
            <div
              className="h-32 w-full p-4 flex items-end justify-between relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${course.thumbnailColor}dd, ${course.thumbnailColor}55, #0b0f17)`,
              }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <HiOutlinePlay size={20} className="ml-0.5" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-black/40 text-white backdrop-blur-md">
                {course.progress}% Completed
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Instructor: {course.instructor}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-2 overflow-hidden">
                  <div
                    className="bg-[#39c1f3] h-full rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-gray-400 mb-4">
                  Next: <span className="text-gray-700 dark:text-gray-300 font-medium">{course.lastLesson}</span>
                </p>
              </div>

              <Link
                href={`/course-access/${course.id}`}
                className="w-full py-2.5 px-4 text-center rounded-lg bg-[#39c1f3] hover:bg-[#25addf] text-white text-xs font-medium transition-colors shadow-sm"
              >
                {course.progress === 100 ? "Review Course" : "Continue Lecture"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;