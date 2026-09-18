"use client";

import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {};

const AllCourses = (props: Props) => {
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
      field: "delete",
      headerName: "Delete",
      flex: 0.3,
    },
  ];

  const rows = [
    {
      id: "123",
      title: "React Course",
      rating: 4.5,
      purchased: 100,
    },
  ];

  const handleDelete = (id: string) => {
    console.log("Delete course:", id);
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] p-4">
      <div
        className="
          w-full h-full
          bg-white dark:bg-[#0d1526]
          rounded-lg
          shadow-lg
          p-5
          border border-slate-200 dark:border-slate-700
          text-black dark:text-white
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold">All Courses</h1>

          <span className="text-sm text-slate-500 dark:text-slate-400">
            Total: {rows.length}
          </span>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-[#111c30]">
                {columns.map((column) => (
                  <th
                    key={column.field}
                    className="
                      border border-slate-200 dark:border-slate-700
                      px-4 py-3
                      text-left
                      text-sm
                      font-semibold
                      text-slate-700 dark:text-slate-200
                    "
                  >
                    {column.headerName}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="
                    bg-white dark:bg-[#0d1526]
                    hover:bg-slate-50
                    dark:hover:bg-[#111c30]
                    transition-colors
                  "
                >
                  <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm">
                    {row.id}
                  </td>

                  <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm font-medium">
                    {row.title}
                  </td>

                  <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm">
                    ⭐ {row.rating}
                  </td>

                  <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm">
                    {row.purchased}
                  </td>

                  <td className="border border-slate-200 dark:border-slate-700 px-4 py-3">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="
                        p-2
                        rounded-md
                        text-red-500
                        hover:bg-red-50
                        dark:hover:bg-red-500/10
                        transition-colors
                      "
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
