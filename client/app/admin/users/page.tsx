"use client";

import React, { useState } from "react";
import { HiOutlineSearch, HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";

const initialUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin", courses: 5, joined: "Aug 12, 2026" },
  { id: "2", name: "Ahmad Ali", email: "ahmad@example.com", role: "user", courses: 3, joined: "Aug 18, 2026" },
  { id: "3", name: "Sara Khan", email: "sara@example.com", role: "user", courses: 6, joined: "Aug 22, 2026" },
  { id: "4", name: "Usman Tariq", email: "usman@example.com", role: "user", courses: 2, joined: "Aug 29, 2026" },
  { id: "5", name: "Zainab Noor", email: "zainab@example.com", role: "admin", courses: 8, joined: "Sep 01, 2026" },
  { id: "6", name: "Bilal Sheikh", email: "bilal@example.com", role: "user", courses: 1, joined: "Sep 04, 2026" },
];

const UsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const toggleRole = (id: string) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, role: u.role === "admin" ? "user" : "admin" } : u))
    );
  };

  return (
    <div className="space-y-6 font-Poppins">
      <div>
        <h1 className="text-2xl sm:text-3xl font-Josefin font-bold text-gray-900 dark:text-white">
          Manage Users ({users.length})
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Inspect user accounts, assign admin roles, and track course enrollments
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#1a1d2e] p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
          />
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Filter Role:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="user">Students (Users)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#151928] text-gray-400 uppercase tracking-wider">
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Courses Enrolled</th>
              <th className="p-4">Joined Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="p-4 font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#39c1f3] to-[#37a39a] text-white flex items-center justify-center font-bold text-xs">
                    {user.name[0]}
                  </div>
                  <span>{user.name}</span>
                </td>
                <td className="p-4 text-gray-500">{user.email}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      user.role === "admin"
                        ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                        : "bg-[#39c1f3]/10 text-[#39c1f3] border border-[#39c1f3]/20"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4 font-semibold">{user.courses}</td>
                <td className="p-4 text-gray-500">{user.joined}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => toggleRole(user.id)}
                      title="Toggle role between user and admin"
                      className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-[#39c1f3]"
                    >
                      <HiOutlinePencilAlt size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      title="Delete user"
                      className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-rose-500"
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

export default UsersPage;