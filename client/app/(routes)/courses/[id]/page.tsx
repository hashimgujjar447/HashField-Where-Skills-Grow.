"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CourseDetails from "../../../components/Course/CourseDetails";
import Heading from "../../../utils/Heading";
import { useGetSingleCourseWithOutAuthQuery } from "@/app/redux/services/courseApi";

const CourseDetailPage = () => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const courseId = params && typeof params.id === "string" ? params.id : "";


  const { data, isLoading, isError } =
    useGetSingleCourseWithOutAuthQuery(courseId);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading course...</p>
      </div>
    );
  }

  if (isError || !data?.course) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Course not found or failed to load.</p>
      </div>
    );
  }

  const course = data.course;

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-[#0b0f17] dark:text-white">
      <Heading
        title={`${course.title} - ELearn`}
        description={course.description}
        keywords={course.tags.join(", ")}
      />

      <Header open={open} setOpen={setOpen} activeItem={1} />

      <main className="flex-1">
        <CourseDetails course={course} />
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailPage;