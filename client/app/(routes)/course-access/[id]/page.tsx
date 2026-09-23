"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import CourseSections from "@/app/components/Course/CourseSections";
import { useLoadUserQuery } from "@/app/redux/services/api";

const CourseAccessPage = () => {
  const params = useParams();
  const router = useRouter();

  const courseId = params?.id as string;

  const { data, isLoading, isError } = useLoadUserQuery({});

  useEffect(() => {
    if (isLoading || !courseId) return;

    if (isError || !data?.user) {
      router.replace("/login");
      return;
    }

    const isUserEnrolled = data.user.courses?.some(
      (course: { courseId: string }) => String(course.courseId) === String(courseId),
    );

    if (!isUserEnrolled) {
      router.replace("/courses");
    }
  }, [data, isLoading, isError, courseId, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#0a0f1c]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />
      </div>
    );
  }

  if (isError || !data?.user || !courseId) {
    return null;
  }

  const isUserEnrolled = data.user.courses?.some(
    (course: { courseId: string }) => String(course.courseId) === String(courseId),
  );

  if (!isUserEnrolled) {
    return null;
  }

  return <CourseSections courseId={courseId} />;
};

export default CourseAccessPage;
