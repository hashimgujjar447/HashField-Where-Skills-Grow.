"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";

const initialCourses = [
  { id: "1", title: "Complete Modern React & Next.js 16 Mastery", instructor: "Ahmad Ali", students: 14200, price: "$49.00", rating: 4.9, status: "Published" },
  { id: "2", title: "Node.js, Express & Microservices", instructor: "Sara Khan", students: 9800, price: "$39.00", rating: 4.8, status: "Published" },
  { id: "3", title: "Python, AI & Data Science Complete Bootcamp", instructor: "Usman Tariq", students: 24500, price: "Free", rating: 4.9, status: "Published" },
  { id: "4", title: "MongoDB & Redis Enterprise Caching", instructor: "Zainab Noor", students: 6300, price: "$29.00", rating: 4.7, status: "Draft" },
  { id: "5", title: "Modern UI/UX Design with Figma", instructor: "Hamza Raza", students: 11200, price: "$34.00", rating: 4.8, status: "Published" },
];

const CoursesAdminPage = () => {
  const [courses, setCourses] = useState(initialCourses);

  const toggleStatus = (id: string) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, status: c.status === "Published" ? "Draft" : "Published" } : c))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this course permanently?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6 font-Poppins">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-Josefin font-bold text-gray-900 dark:text-white">
            Course Management ({courses.length})
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Review live courses, update lesson content, and toggle publishing status
          </p>
        </div>

        <Link
          href="/admin/create-course"
          className="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-[#39c1f3] hover:bg-[#25addf] text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <HiOutlinePlus size={16} />
          Create Course
        </Link>
      </div>

      <div className="bg-white dark:bg-[#1a1d2e] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#151928] text-gray-400 uppercase tracking-wider">
              <th className="p-4">Title</th>
              <th className="p-4">Instructor</th>
              <th className="p-4">Enrolled Students</th>
              <th className="p-4">Price</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="p-4 font-semibold text-gray-900 dark:text-white max-w-xs truncate">
                  {course.title}
                </td>
                <td className="p-4">{course.instructor}</td>
                <td className="p-4 font-semibold">{course.students.toLocaleString()}</td>
                <td className="p-4 font-bold">{course.price}</td>
                <td className="p-4 font-semibold text-amber-500">{course.rating} ★</td>
                <td className="p-4">
                  <button
                    onClick={() => toggleStatus(course.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold cursor-pointer ${
                      course.status === "Published"
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                    }`}
                  >
                    {course.status}
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/courses/${course.id}`}
                      className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-[#39c1f3]"
                      title="Preview course"
                    >
                      <HiOutlineEye size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-rose-500"
                      title="Delete course"
                    >
                      <HiOutlineTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesAdminPage;