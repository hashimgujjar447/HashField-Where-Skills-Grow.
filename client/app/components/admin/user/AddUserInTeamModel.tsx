"use client";

import React, { useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AddMemberModalProps {
  users: User[];
  onClose: () => void;
  onSubmit?: (userId: string, role: string) => void;
}

const AddMemberModal = ({ users, onClose, onSubmit }: AddMemberModalProps) => {
  const [selectedUser, setSelectedUser] = useState(
    users.length > 0 ? users[0]._id : "",
  );
  const [role, setRole] = useState("user");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser) return;
    console.log("Selected User ID:", selectedUser);

    onSubmit?.(selectedUser, role);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-[#0d1526]">
        <h2 className="mb-6 text-center text-xl font-bold text-gray-900 dark:text-white">
          Add New Member
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="h-12 w-full rounded-md border border-gray-400 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#39c1f3] dark:border-gray-600 dark:bg-[#111827] dark:text-white"
          >
            <option value="">Select User</option>

            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </select>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-12 w-full rounded-md border border-gray-400 bg-white px-3 text-sm text-gray-900 outline-none focus:border-[#39c1f3] dark:border-gray-600 dark:bg-[#111827] dark:text-white"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 flex-1 rounded-md border border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-11 flex-1 rounded-md bg-[#39c1f3] text-sm font-semibold text-white transition hover:bg-[#25addf]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
