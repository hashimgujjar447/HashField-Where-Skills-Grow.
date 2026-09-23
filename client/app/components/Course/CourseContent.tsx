"use client";

import React, { useMemo, useState } from "react";
import { HiOutlineChevronDown, HiOutlinePlay } from "react-icons/hi";
import { ICourseDataPreview } from "@/app/types/course";

interface Props {
  courseData: ICourseDataPreview[];
}

const CourseContent: React.FC<Props> = ({ courseData }) => {
  const filteredSection = useMemo(() => {
    return courseData.reduce(
      (sections: Record<string, ICourseDataPreview[]>, course) => {
        if (!sections[course.videoSection]) {
          sections[course.videoSection] = [];
        }

        sections[course.videoSection].push(course);

        return sections;
      },
      {},
    );
  }, [courseData]);

  const sectionNames = Object.keys(filteredSection);

  const [openSection, setOpenSection] = useState<string | null>(
    sectionNames[0] || null,
  );

  if (courseData.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-500 dark:border-gray-800 dark:bg-[#1a1d2e] dark:text-gray-400">
        No course content available.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      {sectionNames.map((sectionName, sectionIndex) => {
        const sectionData = filteredSection[sectionName];

        const isOpen = openSection === sectionName;

        return (
          <div
            key={sectionName}
            className="border-b border-gray-200 last:border-b-0 dark:border-gray-800"
          >
            <button
              type="button"
              onClick={() => setOpenSection(isOpen ? null : sectionName)}
              className="flex w-full items-center justify-between gap-4 bg-gray-50 px-5 py-4 text-left transition-colors hover:bg-gray-100 dark:bg-[#1a1d2e] dark:hover:bg-gray-800"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#39c1f3]/10 text-xs font-semibold text-[#39c1f3]">
                  {sectionIndex + 1}
                </span>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {sectionName}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {sectionData.length}{" "}
                    {sectionData.length === 1 ? "lecture" : "lectures"}
                  </p>
                </div>
              </div>

              <HiOutlineChevronDown
                size={18}
                className={`shrink-0 text-gray-500 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="space-y-2 bg-white px-5 pb-5 pt-3 dark:bg-[#111827]">
                {sectionData.map((content, index) => (
                  <div
                    key={content._id}
                    className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-[#1a1d2e]"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#39c1f3]/10 text-xs font-semibold text-[#39c1f3]">
                      {index + 1}
                    </div>

                    <HiOutlinePlay
                      size={18}
                      className="mt-1 shrink-0 text-[#39c1f3]"
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {content.title}
                      </h4>

                      {content.description && (
                        <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:text-sm">
                          {content.description}
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                        <span>Lecture {index + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContent;
