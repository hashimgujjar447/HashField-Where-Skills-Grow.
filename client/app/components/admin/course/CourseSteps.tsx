"use client";

import React from "react";
import { Check } from "lucide-react";

const steps = [
  "Course Information",
  "Course Options",
  "Course Content",
  "Course Preview",
];

type Props = { active: number };

const CourseSteps: React.FC<Props> = ({ active }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {steps.map((step, idx) => {
        const isDone = idx < active;
        const isCurrent = idx === active;

        return (
          <div key={step} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`
                  flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                  text-sm font-bold ring-2 transition-all duration-300
                  ${
                    isDone
                      ? "bg-indigo-600 ring-indigo-600 text-white"
                      : isCurrent
                      ? "bg-indigo-600 ring-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/30"
                      : "bg-white dark:bg-[#131e36] ring-slate-200 dark:ring-slate-700 text-slate-400 dark:text-slate-500"
                  }
                `}
              >
                {isDone ? <Check size={15} strokeWidth={3} /> : idx + 1}
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={`
                    mt-1 w-0.5 flex-1 min-h-[24px] sm:min-h-[28px] rounded-full transition-all duration-500
                    ${isDone || isCurrent
                      ? "bg-indigo-500 dark:bg-indigo-600"
                      : "bg-slate-200 dark:bg-slate-700"
                    }
                  `}
                />
              )}
            </div>

            <div className="pt-1 pb-4 sm:pb-6">
              <p
                className={`
                  text-sm font-medium transition-colors
                  ${
                    isCurrent
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : isDone
                      ? "text-slate-700 dark:text-slate-300"
                      : "text-slate-400 dark:text-slate-500"
                  }
                `}
              >
                {step}
              </p>
              {isCurrent && (
                <p className="mt-0.5 text-xs text-indigo-400 dark:text-indigo-500">
                  In progress
                </p>
              )}
              {isDone && (
                <p className="mt-0.5 text-xs text-emerald-500">
                  Completed
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseSteps;
