"use client";

import React, { useState } from "react";
import { HiOutlineChevronDown, HiOutlinePlay } from "react-icons/hi";
import { ICourseDataPreview } from "@/app/types/course";

interface Props {
  courseData: ICourseDataPreview[];
}

const CourseContent: React.FC<Props> = ({ courseData }) => {
  const [openSection, setOpenSection] = useState<string | null>(
    courseData[0]?._id || null,
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
      {courseData.map((content, index) => {
        const isOpen = openSection === content._id;

        return (
          <div
            key={content._id}
            className="border-b border-gray-200 last:border-b-0 dark:border-gray-800"
          >
            <button
              type="button"
              onClick={() => setOpenSection(isOpen ? null : content._id)}
              className="flex w-full items-center justify-between gap-4 bg-gray-50 px-5 py-4 text-left transition-colors hover:bg-gray-100 dark:bg-[#1a1d2e] dark:hover:bg-gray-800"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#39c1f3]/10 text-xs font-semibold text-[#39c1f3]">
                  {index + 1}
                </span>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {content.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {content.videoSection}
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
              <div className="bg-white px-5 pb-5 pt-3 dark:bg-[#111827]">
                <div className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                  <HiOutlinePlay
                    size={18}
                    className="mt-0.5 shrink-0 text-[#39c1f3]"
                  />

                  <div>
                    <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300 sm:text-sm">
                      {content.description}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      Preview content
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContent;
