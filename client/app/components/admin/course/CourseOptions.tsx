"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";

export interface BenefitOrPrerequisite {
  title: string;
}

type Props = {
  benefits: BenefitOrPrerequisite[];
  setBenefits: (v: BenefitOrPrerequisite[]) => void;
  prerequisites: BenefitOrPrerequisite[];
  setPrerequisites: (v: BenefitOrPrerequisite[]) => void;
  active: number;
  setActive: (v: number) => void;
};

const inputCls =
  "flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-slate-700 " +
  "bg-white dark:bg-[#1a2540] text-slate-900 dark:text-white " +
  "placeholder-slate-400 dark:placeholder-slate-500 " +
  "px-4 py-3 text-sm outline-none " +
  "focus:border-indigo-500 dark:focus:border-indigo-400 " +
  "focus:ring-2 focus:ring-indigo-500/20 transition";

const CourseOptions: React.FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updated = [...benefits];
    updated[index] = { title: value };
    setBenefits(updated);
  };

  const addBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const removeBenefit = (index: number) => {
    if (benefits.length === 1) return;
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const handlePrerequisiteChange = (index: number, value: string) => {
    const updated = [...prerequisites];
    updated[index] = { title: value };
    setPrerequisites(updated);
  };

  const addPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const removePrerequisite = (index: number) => {
    if (prerequisites.length === 1) return;
    setPrerequisites(prerequisites.filter((_, i) => i !== index));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const allFilled =
      benefits.every((b) => b.title.trim() !== "") &&
      prerequisites.every((p) => p.title.trim() !== "");
    if (!allFilled) {
      alert("Please fill in all benefit and prerequisite fields.");
      return;
    }
    setActive(active + 1);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleNext} className="space-y-6 sm:space-y-8">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            What are the benefits for students in this course?
          </label>
          {benefits.map((item, idx) => (
            <div key={`benefit-${idx}`} className="flex items-center gap-2">
              <input
                value={item.title}
                onChange={(e) => handleBenefitChange(idx, e.target.value)}
                placeholder="You will be able to build a full stack LMS platform…"
                className={inputCls}
              />
              {benefits.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBenefit(idx)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                  title="Remove benefit"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addBenefit}
            className="flex items-center gap-2 rounded-xl border border-dashed border-indigo-400 dark:border-indigo-600 px-4 py-2.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition"
          >
            <Plus size={16} />
            Add Benefit
          </button>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            What are the prerequisites for starting this course?
          </label>
          {prerequisites.map((item, idx) => (
            <div key={`prerequisite-${idx}`} className="flex items-center gap-2">
              <input
                value={item.title}
                onChange={(e) => handlePrerequisiteChange(idx, e.target.value)}
                placeholder="You need basic knowledge of MERN stack"
                className={inputCls}
              />
              {prerequisites.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePrerequisite(idx)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                  title="Remove prerequisite"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addPrerequisite}
            className="flex items-center gap-2 rounded-xl border border-dashed border-indigo-400 dark:border-indigo-600 px-4 py-2.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition"
          >
            <Plus size={16} />
            Add Prerequisite
          </button>
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
            type="submit"
            className="rounded-xl bg-indigo-600 px-6 sm:px-8 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseOptions;
