"use client";

import React, { useState } from "react";
import { HiOutlineChevronDown, HiOutlinePlay, HiOutlineLockClosed } from "react-icons/hi";

export interface Lesson {
  title: string;
  duration: string;
  isPreview?: boolean;
}

export interface CourseSection {
  title: string;
  lessons: Lesson[];
}

interface Props {
  courseData: CourseSection[];
}

const CourseContent: React.FC<Props> = ({ courseData }) => {
  const [openSections, setOpenSections] = useState<number[]>([0]);

  const toggleSection = (index: number) => {
    if (openSections.includes(index)) {
      setOpenSections(openSections.filter((i) => i !== index));
    } else {
      setOpenSections([...openSections, index]);
    }
  };

  return (
    <div className="w-full space-y-3 font-Poppins">
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pb-2">
        <span>{courseData.length} sections &bull; {courseData.reduce((acc, s) => acc + s.lessons.length, 0)} lectures</span>
        <button
          onClick={() => {
            if (openSections.length === courseData.length) {
              setOpenSections([]);
            } else {
              setOpenSections(courseData.map((_, i) => i));
            }
          }}
          className="text-[#39c1f3] font-medium hover:underline cursor-pointer"
        >
          {openSections.length === courseData.length ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {courseData.map((section, sIndex) => {
        const isOpen = openSections.includes(sIndex);
        return (
          <div
            key={sIndex}
            className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#1a1d2e]"
          >
            <button
              onClick={() => toggleSection(sIndex)}
              className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-[#151824] hover:bg-gray-100 dark:hover:bg-[#1c2033] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <HiOutlineChevronDown
                  className={`text-gray-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  size={18}
                />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Section {sIndex + 1}: {section.title}
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {section.lessons.length} lessons
              </span>
            </button>

            {isOpen && (
              <div className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {section.lessons.map((lesson, lIndex) => (
                  <div
                    key={lIndex}
                    className="flex items-center justify-between p-3.5 px-5 hover:bg-gray-50 dark:hover:bg-[#181c2b] transition-colors text-xs text-gray-700 dark:text-gray-300"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.isPreview ? (
                        <HiOutlinePlay className="text-[#39c1f3]" size={16} />
                      ) : (
                        <HiOutlineLockClosed className="text-gray-400" size={16} />
                      )}
                      <span className={lesson.isPreview ? "font-medium text-gray-900 dark:text-white" : ""}>
                        {lesson.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {lesson.isPreview && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#39c1f3]/10 text-[#39c1f3] rounded border border-[#39c1f3]/20">
                          Preview
                        </span>
                      )}
                      <span className="text-gray-400">{lesson.duration}</span>
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