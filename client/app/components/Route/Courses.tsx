"use client";

import React from "react";
import Link from "next/link";
import CourseCard, { CourseCardProps } from "../Course/CourseCard";
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
    <section className="w-full py-16 bg-white dark:bg-[#0b0f17] font-poppins">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#39c1f3]">
              Curated Curriculum
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-josefin font-bold text-gray-900 dark:text-white mt-1">
              Popular Courses
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-lg">
              Explore high-impact courses structured by industry professionals
              to accelerate your career.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#39c1f3] hover:text-[#25addf] transition-colors"
          >
            Explore all 40K+ courses &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.courses.map((course) => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course.title}
              rating={course.ratings}
              students={course.purchased}
              price={course.price}
              originalPrice={course.estimatedPrice}
              level={course.level}
              tags={course.tags}
              thumbnail={course.thumbnail?.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
