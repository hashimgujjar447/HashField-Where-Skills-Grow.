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
    if (avatar) {
      return avatar;
    }

    if (typeof user?.avatar === "string") {
      return user.avatar;
    }

    if (user?.avatar?.url) {
      return user.avatar.url;
    }

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
      await updateUserInfo({ name }).unwrap();
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const isNameUnchanged = name.trim() === (user?.name || "").trim();

  return (
    <div className="w-full flex flex-col items-center py-10 px-6">
      {/* Avatar */}
      <div className="relative mb-8 group">
        <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-[#37a39a] ring-offset-4 ring-offset-white dark:ring-offset-gray-900 shadow-lg">
          <Image
            src={getAvatarSrc()}
            alt="Profile"
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        </div>

        {isUpdatingAvatar ? (
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#37a39a] rounded-full flex items-center justify-center shadow-md">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 bg-[#37a39a] hover:bg-[#2d8a82] rounded-full flex items-center justify-center shadow-md transition-colors duration-200 cursor-pointer"
          >
            <AiOutlineCamera size={16} className="text-white" />
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
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 font-Poppins">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#ffffff20] bg-white dark:bg-[#111827] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#37a39a] focus:border-transparent transition-all duration-200 font-Poppins text-sm"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 font-Poppins">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#ffffff10] bg-gray-50 dark:bg-[#0d1117] text-gray-400 dark:text-gray-500 cursor-not-allowed font-Poppins text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-[#1a2233] px-2 py-0.5 rounded font-Poppins">
              Locked
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isUpdatingInfo || isNameUnchanged}
          className="w-full py-3 px-6 rounded-lg font-semibold font-Poppins text-sm text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-md
            bg-gradient-to-r from-[#37a39a] to-[#2d8a82]
            hover:from-[#2d8a82] hover:to-[#237870]
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-[#37a39a] disabled:hover:to-[#2d8a82]"
        >
          {isUpdatingInfo ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Updating...
            </>
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
