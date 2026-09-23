"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CourseCard from "../../components/Course/CourseCard";
import Heading from "../../utils/Heading";
import { BiSearch, BiFilter } from "react-icons/bi";
import { useGetAllCoursesQuery } from "@/app/redux/services/courseApi";

const CoursesPage = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data, isLoading, isError } = useGetAllCoursesQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-[#0b0f17]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#39c1f3]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-[#0b0f17]">
        <p className="text-sm text-gray-500 dark:text-gray-400">Failed to load courses. Please refresh.</p>
      </div>
    );
  }

  const filteredCourses = data?.courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesLevel =
      selectedLevel === "All" || course.level === selectedLevel;

    const matchesPrice =
      selectedPrice === "All" ||
      (selectedPrice === "Free" && course.price === 0) ||
      (selectedPrice === "Paid" && course.price > 0);

    return matchesSearch && matchesLevel && matchesPrice;
  });

  const sortedCourses = [...(filteredCourses ?? [])].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.ratings - a.ratings;

      case "price-low":
        return a.price - b.price;

      case "price-high":
        return b.price - a.price;

      case "popular":
      default:
        return b.purchased - a.purchased;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-gray-900 dark:text-white font-poppins">
      <Heading
        title="Explore All Online Courses - ELearn"
        description="Browse through hundreds of tech, design, AI, and development courses."
        keywords="courses, online learning, react, nodejs, python, programming"
      />

      <Header open={open} setOpen={setOpen} activeItem={1} />

      <main className="flex-1 max-w-[1500px] w-full mx-auto px-5 sm:px-8 lg:px-10 py-10">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-josefin font-bold text-gray-900 dark:text-white">
            Course Catalog
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Discover cutting-edge courses designed by software architects and
            top tech mentors
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50 dark:bg-[#1a1d2e] p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-8">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, topic, or tech..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
            />

            <BiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111827]"
            >
              <BiFilter size={16} />
              Filters
            </button>

            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Sort by:</span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside
            className={`lg:block ${
              showMobileFilters ? "block" : "hidden"
            } space-y-6`}
          >
            <div className="p-5 bg-gray-50 dark:bg-[#1a1d2e] rounded-xl border border-gray-200 dark:border-gray-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Filters
                </h3>

                <button
                  onClick={() => {
                    setSelectedLevel("All");
                    setSelectedPrice("All");
                    setSearchQuery("");
                  }}
                  className="text-xs text-[#39c1f3] hover:underline"
                >
                  Reset
                </button>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Skill Level
                </h4>

                <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                  {["All", "Beginner", "Intermediate", "Advanced"].map(
                    (level) => (
                      <label
                        key={level}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="level"
                          checked={selectedLevel === level}
                          onChange={() => setSelectedLevel(level)}
                          className="text-[#39c1f3] focus:ring-[#39c1f3]"
                        />

                        <span>{level}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Pricing
                </h4>

                <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                  {["All", "Free", "Paid"].map((price) => (
                    <label
                      key={price}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPrice === price}
                        onChange={() => setSelectedPrice(price)}
                        className="text-[#39c1f3] focus:ring-[#39c1f3]"
                      />

                      <span>{price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {sortedCourses.length === 0 ? (
              <div className="p-12 text-center rounded-xl bg-gray-50 dark:bg-[#1a1d2e] border border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No courses found matching your criteria. Try adjusting your
                  filters or search terms.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCourses.map((course) => (
                  <CourseCard key={course._id} {...course} />
                ))}
              </div>
            )}

            <div className="flex items-center justify-center gap-2 mt-12 text-xs">
              <button className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                Previous
              </button>

              <button className="px-3 py-1.5 rounded-lg bg-[#39c1f3] text-white font-semibold">
                1
              </button>

              <button className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                2
              </button>

              <button className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                3
              </button>

              <button className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoursesPage;
