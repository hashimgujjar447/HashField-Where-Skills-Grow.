"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseInformation, { type CourseInfoData } from "./CourseInformation";
import CourseOptions, { type BenefitOrPrerequisite } from "./CourseOptions";
import CourseContent, { type Section, type Lecture, defaultSection } from "./CourseContent";
import CoursePreview from "./CoursePreview";
import CourseSteps from "./CourseSteps";
import toast from "react-hot-toast";
import {
  useEditCourseMutation,
  useGetAllCoursesForAdminQuery,
} from "@/app/redux/services/courseApi";

const defaultInfo: CourseInfoData = {
  name: "",
  description: "",
  price: "",
  estimatedPrice: "",
  tags: "",
  level: "",
  demoUrl: "",
  thumbnail: "",
  categories: "",
};

type Props = {
  id: string;
};

const EditCourse: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const { data: allCourses, isLoading } = useGetAllCoursesForAdminQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const [editCourse, { isLoading: isUpdating }] = useEditCourseMutation();

  const selectedCourse = allCourses?.courses.find(
    (course) => course._id === id,
  );

  const [active, setActive] = useState(0);

  const [courseInfo, setCourseInfo] = useState<CourseInfoData>(defaultInfo);

  const [benefits, setBenefits] = useState<BenefitOrPrerequisite[]>([
    { title: "" },
  ]);

  const [prerequisites, setPrerequisites] = useState<BenefitOrPrerequisite[]>([
    { title: "" },
  ]);

  const [sections, setSections] = useState<Section[]>([defaultSection()]);

  useEffect(() => {
    if (!selectedCourse) return;

    setCourseInfo({
      name: selectedCourse.title || "",
      description: selectedCourse.description || "",
      price: selectedCourse.price?.toString() || "",
      estimatedPrice: selectedCourse.estimatedPrice?.toString() || "",
      tags: Array.isArray(selectedCourse.tags)
        ? selectedCourse.tags.join(", ")
        : "",
      level: selectedCourse.level || "",
      demoUrl: selectedCourse.demoUrl || "",
      thumbnail: selectedCourse.thumbnail?.url || "",
      categories: selectedCourse.categories || "",
    });


    setBenefits(
      Array.isArray(selectedCourse.benefits) && selectedCourse.benefits.length
        ? selectedCourse.benefits.map((benefit) => ({
            title: benefit.title || "",
          }))
        : [{ title: "" }],
    );

    setPrerequisites(
      Array.isArray(selectedCourse.prerequisites) &&
        selectedCourse.prerequisites.length
        ? selectedCourse.prerequisites.map((prerequisite) => ({
            title: prerequisite.title || "",
          }))
        : [{ title: "" }],
    );

    if (
      Array.isArray(selectedCourse.courseData) &&
      selectedCourse.courseData.length
    ) {
      const courseSections = selectedCourse.courseData.reduce(
        (acc: Section[], lecture) => {
          const sectionTitle = lecture.videoSection || "Untitled Section";

          const existingSection = acc.find(
            (section) => section.sectionTitle === sectionTitle,
          );

          const lectureData: Lecture = {
            title: lecture?.title || "",
            description: lecture?.description || "",
            videoUrl: lecture?.videoUrl || "",
            videoLength: String(lecture?.videoLength ?? ""),
            videoPlayer: lecture?.videoPlayer || "default",
            links: Array.isArray(lecture?.links)
              ? lecture?.links?.map((link: any) => ({
                  title: link?.title || "",
                  url: link?.url || "",
                }))
              : [{ title: "", url: "" }],
            suggestions: Array.isArray(lecture.suggestions)
              ? lecture.suggestions[0] || ""
              : lecture.suggestions || "",
            collapsed: false,
            questions: lecture?.questions || [],
          };

          if (existingSection) {
            existingSection.lectures.push(lectureData);
          } else {
            acc.push({
              sectionTitle,
              lectures: [lectureData],
              collapsed: false,
            });
          }

          return acc;
        },
        [],
      );

      setSections(courseSections.length ? courseSections : [defaultSection()]);
    } else {
      setSections([defaultSection()]);
    }
  }, [selectedCourse]);

  const buildCourseData = () =>
    sections.flatMap((section) =>
      section.lectures.map((lecture) => ({
        videoSection: section.sectionTitle,
        title: lecture.title,
        description: lecture.description,
        videoUrl: lecture.videoUrl,
        videoLength: Number(lecture.videoLength) || 0,
        videoPlayer: lecture.videoPlayer || "default",
        links: lecture.links.filter(
          (link) => link.title?.trim() && link.url?.trim(),
        ),
        suggestions: lecture.suggestions ? [lecture.suggestions] : [],
        questions: lecture.questions || [],
      })),
    );

  const handleSubmit = () => {
    setActive(3);
  };

  const handleCourseUpdate = async () => {
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
          .map((tag) => tag.trim())
          .filter(Boolean),
        level: courseInfo.level,
        demoUrl: courseInfo.demoUrl,
        thumbnail: courseInfo.thumbnail,
        benefits: benefits
          .filter((benefit) => benefit.title.trim())
          .map((benefit) => ({
            title: benefit.title.trim(),
          })),
        prerequisites: prerequisites
          .filter((prerequisite) => prerequisite.title.trim())
          .map((prerequisite) => ({
            title: prerequisite.title.trim(),
          })),
        courseData: buildCourseData(),
      };

      await editCourse({ id, data: payload }).unwrap();
      toast.success("Course updated successfully!");
      router.push("/admin/courses");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update course.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Loading course...</p>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-500">Course not found.</p>
      </div>
    );
  }

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
          Edit Course
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Update your course information and content.
        </p>
      </div>

      <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-start">
        <div className="w-full lg:flex-1">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 dark:bg-[#131e36] dark:ring-slate-800 sm:p-6">
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
                handleCourseCreate={handleCourseUpdate}
                isLoading={isUpdating}
                isEdit={true}
              />
            )}
          </div>
        </div>

        <div className="w-full lg:w-[240px] xl:w-[260px]">
          <div className="sticky top-24 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 dark:bg-[#131e36] dark:ring-slate-800 sm:p-6">
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

export default EditCourse;
