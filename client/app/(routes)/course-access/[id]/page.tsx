"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import CourseSections from "@/app/components/Course/CourseSections";
import { useLoadUserQuery } from "@/app/redux/services/api";

const CourseAccessPage = () => {
  const params = useParams();
  const router = useRouter();

  const courseId = params?.id as string;

  const authUser = useSelector((state: RootState) => state.auth.user);
  const { data, isLoading, isError } = useLoadUserQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );

  const user = data?.user || authUser;

  const isUserEnrolled = user?.courses?.some((course: any) => {
    const enrolledId =
      course?.courseId?._id || course?.courseId || course?._id || course;
    return String(enrolledId) === String(courseId);
  });

  useEffect(() => {
    if (isLoading || !courseId) return;

    if (!user && (isError || !isLoading)) {
      router.replace("/");
      return;
    }

    if (user && !isUserEnrolled && !isLoading) {
      router.replace("/courses");
    }
  }, [user, isLoading, isError, courseId, isUserEnrolled, router]);

  if (isLoading || (!user && !isError)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#0a0f1c]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />
      </div>
    );
  }

  if (!user || !isUserEnrolled || !courseId) {
    return null;
  }

  return <CourseSections courseId={courseId} />;
};

export default CourseAccessPage;
