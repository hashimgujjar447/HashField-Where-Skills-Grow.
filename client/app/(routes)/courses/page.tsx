"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CourseCard, { CourseCardProps } from "../../components/Course/CourseCard";
import Heading from "../../utils/Heading";
import { BiSearch, BiFilter } from "react-icons/bi";

const allCourses: CourseCardProps[] = [
  {
    id: "1",
    title: "Complete Modern React & Next.js 16 Full-Stack Mastery",
    instructor: "Ahmad Ali",
    rating: 4.9,
    students: 14200,
    price: 49,
    originalPrice: 129,
    level: "Intermediate",
    tags: ["React", "Next.js"],
    thumbnailColor: "#6366f1",
  },
  {
    id: "2",
    title: "Node.js, Express & Microservices: The Enterprise Architecture",
    instructor: "Sara Khan",
    rating: 4.8,
    students: 9800,
    price: 39,
    originalPrice: 99,
    level: "Advanced",
    tags: ["Node.js", "Backend"],
    thumbnailColor: "#10b981",
  },
  {
    id: "3",
    title: "Python, AI & Data Science Complete Hands-on Bootcamp",
    instructor: "Usman Tariq",
    rating: 4.9,
    students: 24500,
    price: 0,
    originalPrice: 89,
    level: "Beginner",
    tags: ["Python", "AI"],
    thumbnailColor: "#3b82f6",
  },
  {
    id: "4",
    title: "MongoDB & High-Scale Database Design with Redis Caching",
    instructor: "Zainab Noor",
    rating: 4.7,
    students: 6300,
    price: 29,
    originalPrice: 79,
    level: "Intermediate",
    tags: ["MongoDB", "Redis"],
    thumbnailColor: "#f59e0b",
  },
  {
    id: "5",
    title: "Modern UI/UX Design with Figma: From Wireframe to Code",
    instructor: "Hamza Raza",
    rating: 4.8,
    students: 11200,
    price: 34,
    originalPrice: 89,
    level: "Beginner",
    tags: ["Figma", "UI/UX"],
    thumbnailColor: "#ec4899",
  },
  {
    id: "6",
    title: "Docker, Kubernetes & Cloud DevOps Pipeline Engineering",
    instructor: "Bilal Ahmed",
    rating: 4.9,
    students: 8400,
    price: 59,
    originalPrice: 149,
    level: "Advanced",
    tags: ["DevOps", "Docker"],
    thumbnailColor: "#0ea5e9",
  },
  {
    id: "7",
    title: "TypeScript Deep Dive: Advanced Types & Design Patterns",
    instructor: "Mariam Javed",
    rating: 4.9,
    students: 7800,
    price: 25,
    originalPrice: 69,
    level: "Intermediate",
    tags: ["TypeScript", "Frontend"],
    thumbnailColor: "#7c3aed",
  },
  {
    id: "8",
    title: "REST & GraphQL API Engineering with Security Best Practices",
    instructor: "Ahmad Ali",
    rating: 4.7,
    students: 5100,
    price: 45,
    originalPrice: 119,
    level: "Advanced",
    tags: ["GraphQL", "APIs"],
    thumbnailColor: "#14b8a6",
  },
];

const CoursesPage = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    const matchesPrice =
      selectedPrice === "All" ||
      (selectedPrice === "Free" && course.price === 0) ||
      (selectedPrice === "Paid" && course.price > 0);
    return matchesSearch && matchesLevel && matchesPrice;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-gray-900 dark:text-white font-Poppins">
      <Heading
        title="Explore All Online Courses - ELearn"
        description="Browse through hundreds of tech, design, AI, and development courses."
        keywords="courses, online learning, react, nodejs, python, programming"
      />

      <Header open={open} setOpen={setOpen} activeItem={1} />

      <main className="flex-1 max-w-[1500px] w-full mx-auto px-5 sm:px-8 lg:px-10 py-10">
        {/* Top Title Banner */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-Josefin font-bold text-gray-900 dark:text-white">
            Course Catalog
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Discover cutting-edge courses designed by software architects and top tech mentors
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50 dark:bg-[#1a1d2e] p-4 rounded-xl border border-gray-200 dark:border-gray-800 mb-8">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, topic, or tech..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
            />
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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

        {/* Main Grid: Sidebar Filters + Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filters */}
          <aside className={`lg:block ${showMobileFilters ? "block" : "hidden"} space-y-6`}>
            <div className="p-5 bg-gray-50 dark:bg-[#1a1d2e] rounded-xl border border-gray-200 dark:border-gray-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Filters</h3>
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

              {/* Level Filter */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Skill Level
                </h4>
                <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                  {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
                    <label key={lvl} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        checked={selectedLevel === lvl}
                        onChange={() => setSelectedLevel(lvl)}
                        className="text-[#39c1f3] focus:ring-[#39c1f3]"
                      />
                      <span>{lvl}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Pricing
                </h4>
                <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                  {["All", "Free", "Paid"].map((pr) => (
                    <label key={pr} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPrice === pr}
                        onChange={() => setSelectedPrice(pr)}
                        className="text-[#39c1f3] focus:ring-[#39c1f3]"
                      />
                      <span>{pr}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Courses Grid */}
          <div className="lg:col-span-3">
            {filteredCourses.length === 0 ? (
              <div className="p-12 text-center rounded-xl bg-gray-50 dark:bg-[#1a1d2e] border border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No courses found matching your criteria. Try adjusting your filters or search terms.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            )}

            {/* Pagination Mock */}
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