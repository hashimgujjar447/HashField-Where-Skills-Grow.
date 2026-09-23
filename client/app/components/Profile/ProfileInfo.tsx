"use client";

import React, { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useUpdateUserInfoMutation,
  useUpdateUserAvatarMutation,
} from "@/app/redux/features/auth/authApi";
import toast from "react-hot-toast";

type User = {
  name?: string;
  email?: string;
  avatar?: { url?: string; public_id?: string } | string;
};

type Props = {
  user: User | null;
  avatar: string | null;
  setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
};

const ProfileInfo: FC<Props> = ({ user, avatar, setAvatar }) => {
  const [name, setName] = useState(user?.name || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateUserInfo, { isLoading: isUpdatingInfo }] =
    useUpdateUserInfoMutation();
  const [updateUserAvatar, { isLoading: isUpdatingAvatar }] =
    useUpdateUserAvatarMutation();

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  const getAvatarSrc = () => {
    if (avatar) return avatar;
    if (typeof user?.avatar === "string") return user.avatar;
    if (user?.avatar?.url) return user.avatar.url;
    return "/assets/avatar.jfif";
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setAvatar(base64);
      try {
        await updateUserAvatar({ avatar: base64 }).unwrap();
        toast.success("Avatar updated successfully");
      } catch {
        toast.error("Failed to update avatar");
        setAvatar(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    try {
      await updateUserInfo({ name: name.trim() }).unwrap();
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const isNameUnchanged = name.trim() === (user?.name || "").trim();

  return (
    <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] p-4 sm:p-8 shadow-sm font-Poppins min-w-0">
      <div className="mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-lg sm:text-xl font-bold font-Josefin text-gray-900 dark:text-white">
          Profile Information
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Update your account photo and personal details
        </p>
      </div>

      <div className="flex flex-col items-center w-full">
        {/* Avatar with edit button */}
        <div className="relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-[#39c1f3]/30 shadow-md">
            <Image
              src={getAvatarSrc()}
              alt="Profile"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>

          {isUpdatingAvatar ? (
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#39c1f3] rounded-full flex items-center justify-center shadow-md">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload photo"
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#39c1f3] hover:bg-[#25addf] rounded-full flex items-center justify-center shadow-md transition-colors duration-200 cursor-pointer text-white"
            >
              <AiOutlineCamera size={16} />
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 sm:space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0b0f17] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#39c1f3] focus:ring-1 focus:ring-[#39c1f3] transition-all text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-[#0d121c] text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
                Locked
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdatingInfo || isNameUnchanged}
            className="w-full py-3 px-6 rounded-xl font-medium text-sm text-white transition-all flex items-center justify-center gap-2 shadow-sm bg-[#39c1f3] hover:bg-[#25addf] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isUpdatingInfo ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
