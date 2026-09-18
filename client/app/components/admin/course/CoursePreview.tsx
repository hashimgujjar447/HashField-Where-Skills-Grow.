"use client";

import React from "react";
import {
  CheckCircle,
  BookOpen,
  Video,
  Tag,
  Star,
  Link as LinkIcon,
  DollarSign,
  Layers,
  ChevronRight,
} from "lucide-react";
import type { CourseInfoData } from "./CourseInformation";
import type { BenefitOrPrerequisite } from "./CourseOptions";
import type { Section } from "./CourseContent";

type Props = {
  active: number;
  setActive: (v: number) => void;
  courseInfo: CourseInfoData;
  benefits: BenefitOrPrerequisite[];
  prerequisites: BenefitOrPrerequisite[];
  sections: Section[];
  handleCourseCreate: () => void;
  isLoading?: boolean;
};

const CoursePreview: React.FC<Props> = ({
  active,
  setActive,
  courseInfo,
  benefits,
  prerequisites,
  sections,
  handleCourseCreate,
  isLoading = false,
}) => {
  const discount =
    courseInfo.estimatedPrice &&
    Number(courseInfo.estimatedPrice) > Number(courseInfo.price)
      ? Math.round(
          ((Number(courseInfo.estimatedPrice) - Number(courseInfo.price)) /
            Number(courseInfo.estimatedPrice)) *
            100
        )
      : null;

  const totalLectures = sections.reduce((s, sec) => s + sec.lectures.length, 0);
  const totalMinutes = sections.reduce(
    (s, sec) =>
      s + sec.lectures.reduce((ls, l) => ls + (Number(l.videoLength) || 0), 0),
    0
  );

  return (
    <div className="w-full space-y-6">
      {courseInfo.thumbnail ? (
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={courseInfo.thumbnail}
            alt={courseInfo.name}
            className="h-52 w-full object-cover sm:h-64"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-xl font-bold text-white sm:text-2xl line-clamp-2">
              {courseInfo.name || "Course Title"}
            </h1>
            {courseInfo.level && (
              <span className="mt-1 inline-block rounded-full bg-indigo-600/80 px-3 py-0.5 text-xs font-semibold text-white">
                {courseInfo.level}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1a2540]">
          <p className="text-slate-400 dark:text-slate-500">No thumbnail uploaded</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            ${courseInfo.price || "0"}
          </span>
          {courseInfo.estimatedPrice && (
            <span className="text-lg text-slate-400 line-through">
              ${courseInfo.estimatedPrice}
            </span>
          )}
          {discount && (
            <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              {discount}% off
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <BookOpen size={13} className="text-indigo-500" />
            {sections.length} {sections.length === 1 ? "section" : "sections"}
          </span>
          <span className="flex items-center gap-1">
            <Video size={13} className="text-violet-500" />
            {totalLectures} {totalLectures === 1 ? "lecture" : "lectures"}
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="text-amber-500" />
            {(totalMinutes / 60).toFixed(1)} hrs
          </span>
          <span className="flex items-center gap-1">
            <Layers size={13} className="text-emerald-500" />
            {courseInfo.level || "All levels"}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131e36] p-4">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white">
          <BookOpen size={15} className="text-indigo-500" /> Description
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
          {courseInfo.description || (
            <span className="italic text-slate-400">No description provided</span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131e36] p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white">
            <Tag size={15} className="text-violet-500" /> Tags
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {courseInfo.tags
              ? courseInfo.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-3 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-300"
                    >
                      {tag}
                    </span>
                  ))
              : <span className="text-xs text-slate-400">No tags</span>}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131e36] p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white">
            <LinkIcon size={15} className="text-emerald-500" /> Demo URL
          </h3>
          <p className="break-all text-sm text-indigo-600 dark:text-indigo-400">
            {courseInfo.demoUrl || "—"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131e36] p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white">
            <CheckCircle size={15} className="text-emerald-500" /> What You&apos;ll Learn
          </h3>
          <ul className="space-y-1.5">
            {benefits.filter((b) => b.title).map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle size={13} className="mt-0.5 shrink-0 text-emerald-500" />
                {b.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131e36] p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white">
            <DollarSign size={15} className="text-amber-500" /> Prerequisites
          </h3>
          <ul className="space-y-1.5">
            {prerequisites.filter((p) => p.title).map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                {p.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131e36] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white">
            <Video size={15} className="text-indigo-500" /> Course Curriculum
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {sections.length} {sections.length === 1 ? "section" : "sections"} · {totalLectures} {totalLectures === 1 ? "lecture" : "lectures"} · {(totalMinutes / 60).toFixed(1)} hrs total
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {sections.map((sec, si) => (
            <div key={si}>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#0f1a30] px-5 py-3">
                <BookOpen size={14} className="shrink-0 text-indigo-500" />
                <span className="text-sm font-semibold text-slate-800 dark:text-white flex-1">
                  {sec.sectionTitle || `Section ${si + 1}`}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {sec.lectures.length} {sec.lectures.length === 1 ? "lecture" : "lectures"}
                </span>
              </div>

              {sec.lectures.map((lec, li) => (
                <div
                  key={li}
                  className="flex items-center gap-3 px-5 py-2.5 pl-8 sm:pl-10 hover:bg-slate-50 dark:hover:bg-[#0f1a30] transition-colors"
                >
                  <ChevronRight size={13} className="shrink-0 text-slate-300 dark:text-slate-600" />
                  <Video size={13} className="shrink-0 text-violet-400" />
                  <span className="flex-1 truncate text-sm text-slate-700 dark:text-slate-300">
                    {lec.title || `Lecture ${li + 1}`}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
                    {lec.videoLength ? `${lec.videoLength} min` : "—"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={() => setActive(active - 1)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 px-6 sm:px-8 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={handleCourseCreate}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 sm:px-8 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Creating…
            </>
          ) : (
            "Create Course"
          )}
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
