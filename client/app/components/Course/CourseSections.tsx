"use client";

import { useGetCourseContentQuery } from "@/app/redux/services/courseApi";
import React, { useState } from "react";
import CourseContentMedia from "./CourseContentMedia";
import { ICourseData } from "@/app/types/course";

type Props = {
  courseId: string;
};

type CourseContentBySection = Record<string, ICourseData[]>;

const CourseSections: React.FC<Props> = ({ courseId }) => {
  const { data, isLoading, isError } = useGetCourseContentQuery(courseId);
  const [activeVideo, setActiveVideo] = useState(0);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#0a0f1c]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#39c1f3] dark:border-slate-700" />
      </div>
    );
  }

  if (isError || !data?.content) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        Failed to load course content. Please try again.
      </div>
    );
  }

  const courseContent = data.content as CourseContentBySection;

  if (Object.keys(courseContent).length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        This course has no content yet.
      </div>
    );
  }

  return (
    <CourseContentMedia
      data={courseContent}
      id={courseId}
      activeVideo={activeVideo}
      setActiveVideo={setActiveVideo}
    />
  );
};

export default CourseSections;
