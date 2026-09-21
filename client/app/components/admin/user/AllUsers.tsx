"use client";

import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/app/redux/features/auth/authApi";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import AddMemberModal from "./AddUserInTeamModel";
import toast from "react-hot-toast";

type Props = {
  isTeam?: boolean;
};

const AllUsers = ({ isTeam }: Props) => {
  const { data, isLoading, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const [active, setActive] = useState(false);

  const [updateUserRole] = useUpdateUserRoleMutation();

  const [selectedEditUser, setSelectedEditUser] = useState<{
    email: string;
    _id: string;
  } | null>(null);

  const availableUsers =
    data?.users?.filter(
      (user: any) => user.role !== "admin" && user.role !== "team",
    ) ?? [];

  const rows: any[] = [];

  if (data?.users) {
    if (isTeam) {
      data.users
        .filter((user: any) => user.role === "admin" || user.role === "team")
        .forEach((user: any) => {
          rows.push({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            courses: user.courses?.length ?? 0,
            createdAt: user.createdAt,
          });
        });
    } else {
      data.users.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: user.courses?.length ?? 0,
          createdAt: user.createdAt,
        });
      });
    }
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "courses",
      headerName: "Purchased Courses",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Joined At",
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
      flex: 0.5,
    },
  ];

  const handleDelete = (_id: string) => {};



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
        <p className="text-slate-500 dark:text-slate-400">Loading users...</p>
      </div>
    );
  }

  return (
    <>
      {active && (
        <AddMemberModal
          users={selectedEditUser ? [selectedEditUser] : availableUsers}
          onClose={() => setActive(false)}
          onSubmit={async (userId, role) => {
            try {
              await updateUserRole({
                id: userId,
                role,
              }).unwrap();

              toast.success("User role updated successfully");

              setActive(false);
              setSelectedEditUser(null);

              await refetch();
            } catch (error: any) {
              toast.error(error?.data?.message || "Failed to update user role");
            }
          }}
        />
      )}

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
            <h1 className="text-xl font-bold">
              {isTeam ? "Team Members" : "All Users"}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Total: {rows.length}
              </span>

              {isTeam && (
                <button
                  onClick={() => setActive(true)}
                  className="rounded-full bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Add New Member
                </button>
              )}
            </div>
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
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <tr
                      key={row.id}
                      className="
                        bg-white
                        transition-colors
                        hover:bg-slate-50
                        dark:bg-[#0d1526]
                        dark:hover:bg-[#111c30]
                      "
                    >
                      <td className="border border-slate-200 px-4 py-3 text-sm dark:border-slate-700">
                        {row.id}
                      </td>

                      <td className="border border-slate-200 px-4 py-3 text-sm font-medium dark:border-slate-700">
                        {row.name}
                      </td>

                      <td className="border border-slate-200 px-4 py-3 text-sm dark:border-slate-700">
                        {row.email}
                      </td>

                      <td className="border border-slate-200 px-4 py-3 text-sm capitalize dark:border-slate-700">
                        {row.role}
                      </td>

                      <td className="border border-slate-200 px-4 py-3 text-sm dark:border-slate-700">
                        {row.courses}
                      </td>

                      <td className="border border-slate-200 px-4 py-3 text-sm dark:border-slate-700">
                        {row.createdAt ? getTimeAgo(row.createdAt) : "Unknown"}
                      </td>

                      <td className="border border-slate-200 px-4 py-3 dark:border-slate-700">
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="rounded-md p-2 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>

                      <td className="border border-slate-200 px-4 py-3 dark:border-slate-700">
                        <button
                          onClick={() => {
                            setSelectedEditUser({
                              email: row.email,
                              _id: row.id,
                            });
                            setActive(true);
                          }}
                          className="inline-flex rounded-md p-2 text-blue-500 transition-colors hover:bg-blue-50 dark:hover:bg-blue-500/10"
                        >
                          <AiOutlineEdit size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="border border-slate-200 px-4 py-3 text-center text-sm dark:border-slate-700"
                    >
                      {isTeam ? "No team members found." : "No users found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
