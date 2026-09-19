"use client";

import React, { useState } from "react";
import CourseInformation, { type CourseInfoData } from "./CourseInformation";
import CourseOptions, { type BenefitOrPrerequisite } from "./CourseOptions";
import CourseContent, { type Section, defaultSection } from "./CourseContent";
import CoursePreview from "./CoursePreview";
import CourseSteps from "./CourseSteps";
import toast from "react-hot-toast";
import { useCreateCourseMutation } from "@/app/redux/services/courseApi";

const defaultInfo: CourseInfoData = {
  name: "",
  description: "",
  price: "",
  estimatedPrice: "",
  tags: "",
  level: "",
  demoUrl: "",
  thumbnail: "",
};

const CreateCourse: React.FC = () => {
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState<CourseInfoData>(defaultInfo);
  const [benefits, setBenefits] = useState<BenefitOrPrerequisite[]>([
    { title: "" },
  ]);
  const [prerequisites, setPrerequisites] = useState<BenefitOrPrerequisite[]>([
    { title: "" },
  ]);
  const [sections, setSections] = useState<Section[]>([defaultSection()]);
  const [isLoading, setIsLoading] = useState(false);

  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();

  const buildCourseData = () =>
    sections.flatMap((sec) =>
      sec.lectures.map((lec) => ({
        videoSection: sec.sectionTitle,
        title: lec.title,
        description: lec.description,
        videoUrl: lec.videoUrl,
        videoLength: Number(lec.videoLength) || 0,
        videoPlayer: lec.videoPlayer || "default",
        links: lec.links.filter((l) => l.url),
        suggestions: lec.suggestions ? [lec.suggestions] : [],
        questions: [],
      })),
    );

  const handleSubmit = () => {
    toast.success("Course content saved!");
  };

  const handleCourseCreate = async () => {
    setIsLoading(true);
    try {
      const payload = {
        title: courseInfo.name,
        description: courseInfo.description,
        price: Number(courseInfo.price),
        estimatedPrice: courseInfo.estimatedPrice
          ? Number(courseInfo.estimatedPrice)
          : undefined,
        tags: courseInfo.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        level: courseInfo.level,
        demoUrl: courseInfo.demoUrl,
        thumbnail: courseInfo.thumbnail,
        benefits: benefits.map((b) => ({ title: b.title })),
        prerequisites: prerequisites.map((p) => ({ title: p.title })),
        courseData: buildCourseData(),
      };

      console.log("Course Payload:", payload);

      await createCourse(payload).unwrap();
      toast.success("Course created successfully!");

      setCourseInfo(defaultInfo);
      setBenefits([{ title: "" }]);
      setPrerequisites([{ title: "" }]);
      setSections([defaultSection()]);
      setActive(0);
    } catch {
      toast.error("Failed to create course.");
    } finally {
      setIsLoading(false);
    }
  };

  const stepLabels = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          Create New Course
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Fill in each step below to publish your course on the platform.
        </p>
      </div>

      <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-start">
        <div className="w-full lg:flex-1">
          <div className="rounded-2xl bg-white dark:bg-[#131e36] p-4 sm:p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/30">
                {active + 1}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                  Step {active + 1} of 4
                </p>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {stepLabels[active]}
                </h2>
              </div>
            </div>

            {active === 0 && (
              <CourseInformation
                courseInfo={courseInfo}
                setCourseInfo={setCourseInfo}
                active={active}
                setActive={setActive}
              />
            )}
            {active === 1 && (
              <CourseOptions
                benefits={benefits}
                setBenefits={setBenefits}
                prerequisites={prerequisites}
                setPrerequisites={setPrerequisites}
                active={active}
                setActive={setActive}
              />
            )}
            {active === 2 && (
              <CourseContent
                sections={sections}
                setSections={setSections}
                active={active}
                setActive={setActive}
                handleSubmit={handleSubmit}
              />
            )}
            {active === 3 && (
              <CoursePreview
                active={active}
                setActive={setActive}
                courseInfo={courseInfo}
                benefits={benefits}
                prerequisites={prerequisites}
                sections={sections}
                handleCourseCreate={handleCourseCreate}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>

        <div className="w-full lg:w-[240px] xl:w-[260px]">
          <div className="sticky top-24 rounded-2xl bg-white dark:bg-[#131e36] p-4 sm:p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Progress
            </p>
            <CourseSteps active={active} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
