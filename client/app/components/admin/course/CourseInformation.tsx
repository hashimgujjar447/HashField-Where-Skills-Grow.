"use client";

import React, { useRef } from "react";
import { Upload, X } from "lucide-react";
import { useGetCategoriesDataQuery } from "@/app/redux/features/layout/layoutApi";

export interface CourseInfoData {
  name: string;
  description: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: string;
  categories: string;
}

type Props = {
  courseInfo: CourseInfoData;
  setCourseInfo: (data: CourseInfoData) => void;
  active: number;
  setActive: (v: number) => void;
};

const CourseInformation: React.FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const { data, isLoading, isError } = useGetCategoriesDataQuery("categories");

  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value });
  };

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setCourseInfo({ ...courseInfo, thumbnail: reader.result as string });
    reader.readAsDataURL(file);
  };

  const removeThumbnail = () => setCourseInfo({ ...courseInfo, thumbnail: "" });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !courseInfo.name ||
      !courseInfo.description ||
      !courseInfo.price ||
      !courseInfo.tags ||
      !courseInfo.level ||
      !courseInfo.demoUrl ||
      !courseInfo.categories
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setActive(active + 1);
  };

  const inputCls =
    "w-full rounded-xl border border-slate-200 dark:border-slate-700 " +
    "bg-white dark:bg-[#1a2540] text-slate-900 dark:text-white " +
    "placeholder-slate-400 dark:placeholder-slate-500 " +
    "px-4 py-3 text-sm outline-none " +
    "focus:border-indigo-500 dark:focus:border-indigo-400 " +
    "focus:ring-2 focus:ring-indigo-500/20 transition";

  return (
    <div className="w-full">
      <form onSubmit={handleNext} className="space-y-5 sm:space-y-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Course Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={courseInfo.name}
            onChange={handleChange}
            placeholder="e.g. MERN Stack LMS platform with Next 13"
            className={inputCls}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Course Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={courseInfo.description}
            onChange={handleChange}
            rows={5}
            placeholder="Write something amazing…"
            className={inputCls + " resize-none"}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Course Price <span className="text-red-500">*</span>
            </label>
            <input
              name="price"
              type="number"
              min="0"
              value={courseInfo.price}
              onChange={handleChange}
              placeholder="29"
              className={inputCls}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Estimated Price{" "}
              <span className="text-slate-400 dark:text-slate-500 font-normal">
                (optional)
              </span>
            </label>
            <input
              name="estimatedPrice"
              type="number"
              min="0"
              value={courseInfo.estimatedPrice}
              onChange={handleChange}
              placeholder="79"
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Course Tags <span className="text-red-500">*</span>
            </label>
            <input
              name="tags"
              value={courseInfo.tags}
              onChange={handleChange}
              placeholder="MERN, Next 13, Socket.io, Tailwind CSS, LMS"
              className={inputCls}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Course Categories <span className="text-red-500">*</span>
            </label>

            <select
              name="categories"
              value={courseInfo.categories}
              onChange={handleChange}
              className={inputCls}
            >
              <option
                value=""
                className="bg-white text-slate-900 dark:bg-[#1a2540] dark:text-white"
              >
                Select category
              </option>

              {data?.layout?.categories?.map((category: any) => (
                <option
                  key={category._id}
                  value={category._id}
                  className="bg-white text-slate-900 dark:bg-[#1a2540] dark:text-white"
                >
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Course Level <span className="text-red-500">*</span>
            </label>
            <select
              name="level"
              value={courseInfo.level}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="">Select level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Demo URL <span className="text-red-500">*</span>
            </label>
            <input
              name="demoUrl"
              value={courseInfo.demoUrl}
              onChange={handleChange}
              placeholder="YouTube or Vimeo video ID"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Course Thumbnail
          </label>

          {courseInfo.thumbnail ? (
            <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
              <img
                src={courseInfo.thumbnail}
                alt="Thumbnail preview"
                className="h-48 sm:h-56 w-full object-cover"
              />
              <button
                type="button"
                onClick={removeThumbnail}
                aria-label="Remove thumbnail"
                className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 transition"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#1a2540] py-8 sm:py-10 transition hover:border-indigo-400 dark:hover:border-indigo-500"
            >
              <Upload
                size={28}
                className="text-slate-400 dark:text-slate-500"
              />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Click to upload thumbnail
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                PNG, JPG, WEBP up to 4 MB
              </span>
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleThumbnail}
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto rounded-xl bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
