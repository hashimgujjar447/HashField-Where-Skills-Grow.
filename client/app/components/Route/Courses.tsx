"use client";

import React from "react";
import Link from "next/link";
import CourseCard from "../Course/CourseCard";
import { useGetAllCoursesQuery } from "@/app/redux/services/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetAllCoursesQuery();

  if (isLoading) {
    return <div>Loading courses...</div>;
  }

  if (isError) {
    return <div>Failed to load courses.</div>;
  }

  return (
    <section className="w-full bg-white py-16 font-poppins dark:bg-[#0b0f17]">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#39c1f3]">
              Curated Curriculum
            </span>

            <h2 className="mt-1 font-josefin text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
              Popular Courses
            </h2>

            <p className="mt-2 max-w-lg text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
              Explore high-impact courses structured by industry professionals
              to accelerate your career.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#39c1f3] transition-colors hover:text-[#25addf]"
          >
            Explore all courses &rarr;
          </Link>
        </div>

        {data?.courses.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No courses available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data?.courses.map((course) => (
              <CourseCard key={course._id} {...course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;
