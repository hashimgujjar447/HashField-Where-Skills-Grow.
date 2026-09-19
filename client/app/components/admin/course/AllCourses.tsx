"use client";

import {
  useDeleteCourseMutation,
  useGetAllCoursesForAdminQuery,
} from "@/app/redux/services/courseApi";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

type Props = {};

const AllCourses = (props: Props) => {
  const { data, isLoading, refetch } = useGetAllCoursesForAdminQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const [deleteCourse] = useDeleteCourseMutation();

  const courses = data?.courses ?? [];

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "title",
      headerName: "Course Title",
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Ratings",
      flex: 0.5,
    },
    {
      field: "purchased",
      headerName: "Purchased",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.3,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.3,
    },
  ];

  const handleDelete = async (id: string) => {
    console.log("Delete course:", id);
    if (!id) {
      toast.error("Course ID is missing. Cannot delete the course.");
      return;
    }
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id).unwrap();
        toast.success("Course deleted successfully");
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete the course");
      }
    }
  };

  const handleEdit = (id: string) => {
    console.log("Edit course:", id);
  };

  const getTimeAgo = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();

    const diffInSeconds = Math.floor(
      (now.getTime() - created.getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      return "Just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }

    const diffInYears = Math.floor(diffInDays / 365);

    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] w-full p-4">
      <div
        className="
          h-full w-full
          rounded-lg
          border border-slate-200
          bg-white
          p-5
          text-black
          shadow-lg
          dark:border-slate-700
          dark:bg-[#0d1526]
          dark:text-white
        "
      >
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-xl font-bold">All Courses</h1>

          <span className="text-sm text-slate-500 dark:text-slate-400">
            Total: {courses.length}
          </span>
        </div>

        <div className="w-full overflow-x-auto rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-[#111c30]">
                {columns.map((column) => (
                  <th
                    key={column.field}
                    className="
                      border border-slate-200
                      px-4 py-3
                      text-left
                      text-sm
                      font-semibold
                      text-slate-700
                      dark:border-slate-700
                      dark:text-slate-200
                    "
                  >
                    {column.headerName}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr
                    key={course._id}
                    className="
                      bg-white
                      transition-colors
                      hover:bg-slate-50
                      dark:bg-[#0d1526]
                      dark:hover:bg-[#111c30]
                    "
                  >
                    <td className="border border-slate-200 px-4 py-3 text-sm dark:border-slate-700">
                      {course._id}
                    </td>

                    <td className="border border-slate-200 px-4 py-3 text-sm font-medium dark:border-slate-700">
                      {course.title}
                    </td>

                    <td className="border border-slate-200 px-4 py-3 text-sm dark:border-slate-700">
                      ⭐ {course.ratings}
                    </td>

                    <td className="border border-slate-200 px-4 py-3 text-sm dark:border-slate-700">
                      {course.purchased}
                    </td>

                    <td className="border border-slate-200 px-4 py-3 text-sm dark:border-slate-700">
                      {getTimeAgo(course.createdAt.toString())}
                    </td>
                    <td className="border border-slate-200 px-4 py-3 dark:border-slate-700">
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="
                          rounded-md
                          p-2
                          text-red-500
                          transition-colors
                          hover:bg-red-50
                          dark:hover:bg-red-500/10
                        "
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>

                    <td className="border border-slate-200 px-4 py-3 dark:border-slate-700">
                      <Link
                        href={`/admin/edit-course/${course._id}`}
                        className="
                          rounded-md
                          p-2
                          text-blue-500
                          transition-colors
                          hover:bg-blue-50
                          dark:hover:bg-blue-500/10
                        "
                      >
                        <AiOutlineEdit size={20} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="
                      border border-slate-200
                      px-4 py-3
                      text-center
                      text-sm
                      dark:border-slate-700
                    "
                  >
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
