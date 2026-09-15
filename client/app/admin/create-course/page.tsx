"use client";

import React, { useState } from "react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineUpload, HiOutlineCheck } from "react-icons/hi";

const CreateCoursePage = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [level, setLevel] = useState("Intermediate");
  const [tags, setTags] = useState("React, TypeScript");
  const [benefits, setBenefits] = useState(["Master full-stack App Router architecture", "Deploy scalable cloud containers"]);
  const [prerequisites, setPrerequisites] = useState(["Basic ES6+ JavaScript knowledge"]);

  const [sections, setSections] = useState([
    {
      title: "Introduction & Setup",
      lessons: [{ title: "Course Roadmap", videoUrl: "https://youtube.com/watch?v=demo", duration: "10:00" }],
    },
  ]);

  const addBenefit = () => setBenefits([...benefits, ""]);
  const removeBenefit = (i: number) => setBenefits(benefits.filter((_, idx) => idx !== i));

  const addPrerequisite = () => setPrerequisites([...prerequisites, ""]);
  const removePrerequisite = (i: number) => setPrerequisites(prerequisites.filter((_, idx) => idx !== i));

  const addSection = () => {
    setSections([...sections, { title: "New Section", lessons: [{ title: "Lesson 1", videoUrl: "", duration: "10:00" }] }]);
  };

  const handlePublish = () => {
    alert("Course created and published successfully!");
  };

  return (
    <div className="space-y-8 font-Poppins max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-Josefin font-bold text-gray-900 dark:text-white">
          Create New Course
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Complete the 3-step setup to author, structure, and publish a new course
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
        {[
          { num: 1, label: "Course Info" },
          { num: 2, label: "Curriculum Content" },
          { num: 3, label: "Preview & Publish" },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-Josefin ${
                step === s.num
                  ? "bg-[#39c1f3] text-white shadow-sm"
                  : step > s.num
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400"
              }`}
            >
              {step > s.num ? <HiOutlineCheck size={16} /> : s.num}
            </div>
            <span className={`text-xs font-medium hidden sm:inline ${step === s.num ? "text-gray-900 dark:text-white font-semibold" : "text-gray-400"}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Info */}
      {step === 1 && (
        <div className="space-y-5 bg-white dark:bg-[#1a1d2e] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm text-xs">
          <div>
            <label className="block font-semibold mb-1 uppercase tracking-wider text-gray-700 dark:text-gray-300">Course Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modern Full-Stack Next.js 16"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 uppercase tracking-wider text-gray-700 dark:text-gray-300">Course Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed overview of what will be taught..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 uppercase tracking-wider text-gray-700 dark:text-gray-300">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="49"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 uppercase tracking-wider text-gray-700 dark:text-gray-300">Original Price ($)</label>
              <input
                type="number"
                value={estimatedPrice}
                onChange={(e) => setEstimatedPrice(e.target.value)}
                placeholder="129"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 uppercase tracking-wider text-gray-700 dark:text-gray-300">Skill Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 uppercase tracking-wider text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="React, Next.js, Cloud"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
              />
            </div>
          </div>

          {/* Benefits Dynamic */}
          <div>
            <label className="block font-semibold mb-2 uppercase tracking-wider text-gray-700 dark:text-gray-300">What students will learn</label>
            {benefits.map((b, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={b}
                  onChange={(e) => {
                    const newB = [...benefits];
                    newB[idx] = e.target.value;
                    setBenefits(newB);
                  }}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
                />
                <button type="button" onClick={() => removeBenefit(idx)} className="p-2 text-rose-500">
                  <HiOutlineTrash size={16} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addBenefit} className="text-xs font-semibold text-[#39c1f3] hover:underline flex items-center gap-1 mt-1">
              <HiOutlinePlus size={14} /> Add Benefit
            </button>
          </div>

          {/* Upload Placeholder */}
          <div>
            <label className="block font-semibold mb-1 uppercase tracking-wider text-gray-700 dark:text-gray-300">Course Thumbnail</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:border-[#39c1f3] cursor-pointer transition-colors">
              <HiOutlineUpload size={28} className="mx-auto text-gray-400 mb-2" />
              <p className="text-xs text-gray-500">Click to upload or drag image here (PNG, JPG, WebP)</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="py-2.5 px-6 rounded-lg bg-[#39c1f3] hover:bg-[#25addf] text-white font-semibold text-xs shadow-sm transition-colors"
            >
              Continue to Curriculum &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Content */}
      {step === 2 && (
        <div className="space-y-6 bg-white dark:bg-[#1a1d2e] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Curriculum Sections</h3>
            <button
              onClick={addSection}
              className="flex items-center gap-1 text-xs font-semibold text-[#39c1f3] hover:underline"
            >
              <HiOutlinePlus size={14} /> Add Section
            </button>
          </div>

          {sections.map((sec, sIdx) => (
            <div key={sIdx} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#151928] space-y-3">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => {
                    const newSec = [...sections];
                    newSec[sIdx].title = e.target.value;
                    setSections(newSec);
                  }}
                  className="font-semibold text-sm bg-transparent border-b border-gray-300 dark:border-gray-700 pb-1 text-gray-900 dark:text-white outline-none"
                />
              </div>

              {sec.lessons.map((les, lIdx) => (
                <div key={lIdx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white dark:bg-[#111827] p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <input
                    type="text"
                    value={les.title}
                    placeholder="Lesson Title"
                    className="px-2 py-1 bg-transparent outline-none text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={les.videoUrl}
                    placeholder="Video Embed URL"
                    className="px-2 py-1 bg-transparent outline-none text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={les.duration}
                    placeholder="Duration (e.g. 15:00)"
                    className="px-2 py-1 bg-transparent outline-none text-gray-900 dark:text-white"
                  />
                </div>
              ))}
            </div>
          ))}

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold"
            >
              &larr; Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="py-2.5 px-6 rounded-lg bg-[#39c1f3] hover:bg-[#25addf] text-white font-semibold text-xs shadow-sm transition-colors"
            >
              Continue to Preview &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Preview */}
      {step === 3 && (
        <div className="space-y-6 bg-white dark:bg-[#1a1d2e] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm text-xs">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#39c1f3]/10 text-[#39c1f3]">
              {level}
            </span>
            <h2 className="text-xl font-Josefin font-bold text-gray-900 dark:text-white mt-2">
              {title || "Untitled Course"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {description || "No description provided yet."}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#151928] flex items-center justify-between">
            <div>
              <span className="text-xl font-bold font-Josefin text-gray-900 dark:text-white">
                ${price || "0"}
              </span>
              {estimatedPrice && (
                <span className="text-xs line-through text-gray-400 ml-2">${estimatedPrice}</span>
              )}
            </div>
            <span className="text-xs text-gray-500">{sections.length} Sections Configured</span>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold"
            >
              &larr; Back
            </button>
            <button
              onClick={handlePublish}
              className="py-2.5 px-6 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md transition-colors"
            >
              Publish Course Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCoursePage;