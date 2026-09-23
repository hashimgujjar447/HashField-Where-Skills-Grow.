"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlinePlay, HiOutlineAcademicCap, HiOutlineBookOpen } from "react-icons/hi";
import { useGetAllCoursesQuery } from "@/app/redux/services/courseApi";
import { useLoadUserQuery } from "@/app/redux/services/api";

type Props = {
  user?: any;
};

const EnrolledCourses: React.FC<Props> = ({ user: initialUser }) => {
  const { data: userData } = useLoadUserQuery({}, { refetchOnMountOrArgChange: true });
  const { data: coursesData, isLoading: coursesLoading } = useGetAllCoursesQuery();

  const user = userData?.user || initialUser;

  const userCourseIds = React.useMemo(() => {
    const list = user?.courses || [];
    return new Set(
      list.map((c: any) => String(c.courseId || c._id || c))
    );
  }, [user]);

  const allCourses = coursesData?.courses || [];

  const enrolledCourses = React.useMemo(() => {
    return allCourses.filter((course) => userCourseIds.has(String(course._id)));
  }, [allCourses, userCourseIds]);

  return (
    <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] p-4 sm:p-8 shadow-sm font-Poppins min-w-0">
      <div className="mb-6 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-Josefin text-gray-900 dark:text-white">
            Enrolled Courses ({enrolledCourses.length})
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Access your active courses and continue learning
          </p>
        </div>

        {enrolledCourses.length > 0 && (
          <Link
            href="/courses"
            className="text-xs font-semibold text-[#39c1f3] hover:underline"
          >
            Browse More &rarr;
          </Link>
        )}
      </div>

      {coursesLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-64 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0b0f17] animate-pulse"
            />
          ))}
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#39c1f3]/10 text-[#39c1f3] flex items-center justify-center mb-4">
            <HiOutlineAcademicCap size={32} />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
            No Enrolled Courses Yet
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mb-6">
            You haven&apos;t enrolled in any courses yet. Browse our catalog to find your next skill!
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-xl bg-[#39c1f3] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#25addf] shadow-sm"
          >
            <span>Explore Courses</span>
            <span>&rarr;</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="flex flex-col bg-gray-50 dark:bg-[#0b0f17] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all hover:shadow-md"
            >
              <div
                className="h-36 w-full relative overflow-hidden bg-gray-900 flex items-center justify-center"
                style={
                  course.thumbnail?.url
                    ? {
                        backgroundImage: `url(${course.thumbnail.url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : undefined
                }
              >
                {!course.thumbnail?.url && (
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <HiOutlinePlay size={20} className="ml-0.5" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
                  {course.level || "Course"}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <HiOutlineBookOpen className="text-[#39c1f3]" size={15} />
                    <span>{course.courseData?.length || 0} Lessons</span>
                  </div>
                </div>

                <Link
                  href={`/course-access/${course._id}`}
                  className="w-full py-2.5 px-4 text-center rounded-lg bg-[#39c1f3] hover:bg-[#25addf] text-white text-xs font-medium transition-colors shadow-sm"
                >
                  Continue Learning &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;