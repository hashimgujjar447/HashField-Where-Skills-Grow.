"use client";

import React, { useState } from "react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineCheck } from "react-icons/hi";

const LayoutManagerPage = () => {
  const [activeTab, setActiveTab] = useState<"banner" | "faq" | "categories">("banner");

  // Banner State
  const [bannerTitle, setBannerTitle] = useState("Improve Your Online Learning Experience Better Instantly");
  const [bannerSubtitle, setBannerSubtitle] = useState("We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them.");

  // Categories State
  const [categories, setCategories] = useState([
    "Web Development", "React & Next.js", "Node.js & Express", "Python & AI", "DevOps & Cloud", "UI/UX Design",
  ]);
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const removeCategory = (name: string) => {
    setCategories(categories.filter((c) => c !== name));
  };

  return (
    <div className="space-y-6 font-Poppins max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-Josefin font-bold text-gray-900 dark:text-white">
          Layout Customization Manager
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Dynamically manage landing page banners, homepage categories, and FAQ entries
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 text-xs border-b border-gray-200 dark:border-gray-800 pb-3">
        {[
          { key: "banner", label: "Hero Banner" },
          { key: "categories", label: "Course Categories" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-lg font-semibold uppercase tracking-wider transition-colors ${
              activeTab === tab.key
                ? "bg-[#39c1f3] text-white"
                : "bg-white dark:bg-[#1a1d2e] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Banner Tab */}
      {activeTab === "banner" && (
        <div className="p-6 rounded-xl bg-white dark:bg-[#1a1d2e] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4 text-xs">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Homepage Hero Banner Configuration
          </h3>

          <div>
            <label className="block font-semibold mb-1 uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Hero Headline
            </label>
            <textarea
              rows={2}
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Hero Subtitle
            </label>
            <textarea
              rows={3}
              value={bannerSubtitle}
              onChange={(e) => setBannerSubtitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
            />
          </div>

          <button
            onClick={() => alert("Banner configuration saved!")}
            className="flex items-center gap-2 py-2.5 px-6 rounded-lg bg-[#39c1f3] hover:bg-[#25addf] text-white font-semibold text-xs shadow-sm transition-colors"
          >
            <HiOutlineCheck size={16} /> Save Banner
          </button>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <div className="p-6 rounded-xl bg-white dark:bg-[#1a1d2e] border border-gray-200 dark:border-gray-800 shadow-sm space-y-5 text-xs">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Manage Search Categories
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Cybersecurity, Rust, Flutter..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
            />
            <button
              onClick={addCategory}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#39c1f3] hover:bg-[#25addf] text-white font-semibold"
            >
              <HiOutlinePlus size={16} /> Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-800 dark:text-gray-200"
              >
                <span>{cat}</span>
                <button
                  onClick={() => removeCategory(cat)}
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <HiOutlineTrash size={14} />
                </button>
              </span>
            ))}
          </div>

          <div className="pt-3">
            <button
              onClick={() => alert("Categories saved successfully!")}
              className="flex items-center gap-2 py-2.5 px-6 rounded-lg bg-[#39c1f3] hover:bg-[#25addf] text-white font-semibold text-xs shadow-sm transition-colors"
            >
              <HiOutlineCheck size={16} /> Save Categories
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutManagerPage;