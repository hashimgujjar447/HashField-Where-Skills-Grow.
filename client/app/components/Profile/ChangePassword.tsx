"use client";

import { useUpdateUserPasswordMutation } from "@/app/redux/features/auth/authApi";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateUserPassword, { isLoading }] = useUpdateUserPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      confirmPassword.length === 0
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await updateUserPassword({
        currentPassword: oldPassword,
        newPassword,
      }).unwrap();

      toast.success("Password updated successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-12 font-poppins">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#39c1f3]/10">
            <HiOutlineLockClosed size={27} className="text-[#39c1f3]" />
          </div>

          <h1 className="font-josefin text-3xl font-bold text-white">
            Change Password
          </h1>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            Update your password to keep your account secure.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="rounded-2xl border border-gray-800 bg-[#111827] p-6 shadow-xl sm:p-8"
        >
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300">
                Current Password
              </label>

              <div className="relative">
                <HiOutlineLockClosed
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="h-12 w-full rounded-lg border border-gray-700 bg-[#0b0f17] pl-11 pr-12 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-[#39c1f3] focus:ring-2 focus:ring-[#39c1f3]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#39c1f3]"
                >
                  {showOldPassword ? (
                    <HiOutlineEyeOff size={19} />
                  ) : (
                    <HiOutlineEye size={19} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300">
                New Password
              </label>

              <div className="relative">
                <HiOutlineLockClosed
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="h-12 w-full rounded-lg border border-gray-700 bg-[#0b0f17] pl-11 pr-12 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-[#39c1f3] focus:ring-2 focus:ring-[#39c1f3]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#39c1f3]"
                >
                  {showNewPassword ? (
                    <HiOutlineEyeOff size={19} />
                  ) : (
                    <HiOutlineEye size={19} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-gray-300">
                Confirm New Password
              </label>

              <div className="relative">
                <HiOutlineLockClosed
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="h-12 w-full rounded-lg border border-gray-700 bg-[#0b0f17] pl-11 pr-12 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-[#39c1f3] focus:ring-2 focus:ring-[#39c1f3]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#39c1f3]"
                >
                  {showConfirmPassword ? (
                    <HiOutlineEyeOff size={19} />
                  ) : (
                    <HiOutlineEye size={19} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-lg bg-[#39c1f3] text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#25addf] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-xs text-gray-600">
          Never share your password with anyone.
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
