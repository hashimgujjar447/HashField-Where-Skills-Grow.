"use client";

import React from "react";
import { useParams } from "next/navigation";
import CoursePlayer from "../../../components/Course/CoursePlayer";

const CourseAccessPage = () => {
  const params = useParams();
  const courseId = (params?.id as string) || "1";

  return <CoursePlayer courseId={courseId} />;
};

export default CourseAccessPage;