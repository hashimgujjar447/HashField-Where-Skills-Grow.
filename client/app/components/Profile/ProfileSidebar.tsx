"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { HiOutlineUser } from "react-icons/hi";

type Props = {
  user: Record<string, any> | null;
  avatar: string | null;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
  logoutHandler?: () => void;
};

const ProfileSidebar: React.FC<Props> = ({
  user,
  avatar,
  setActiveTab,
  activeTab,
  logoutHandler,
}) => {
  const avatarSrc =
    avatar ||
    (typeof user?.avatar === "string" ? user.avatar : user?.avatar?.url) ||
    "/assets/avatar.jfif";

  const menuItems = [
    {
      id: 1,
      label: "Account",
      fullLabel: "My Account",
      icon: <HiOutlineUser size={18} />,
    },
    {
      id: 2,
      label: "Password",
      fullLabel: "Change Password",
      icon: <RiLockPasswordLine size={18} />,
    },
    {
      id: 3,
      label: "Courses",
      fullLabel: "Enrolled Courses",
      icon: <SiCoursera size={18} />,
    },
  ];

  return (
    <div className="w-full min-w-0 max-w-full">
      {/* Mobile Header Card & Segmented Navigation (< 800px) */}
      <div className="block min-[800px]:hidden w-full min-w-0 space-y-3">
        {/* User preview header */}
        <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] shadow-sm">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Image
              src={avatarSrc}
              alt={user?.name || "Profile"}
              width={42}
              height={42}
              className="rounded-full object-cover shrink-0 ring-2 ring-[#39c1f3]/30"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                {user?.name || "Student"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logoutHandler}
            aria-label="Logout"
            className="flex items-center justify-center h-9 w-9 rounded-xl text-red-500 bg-red-500/10 hover:bg-red-500/20 shrink-0 ml-2"
          >
            <AiOutlineLogout size={18} />
          </button>
        </div>

        {/* Admin Banner if Admin */}
        {user?.role === "admin" && (
          <Link
            href="/admin"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
          >
            <span className="flex items-center gap-2">
              <MdOutlineAdminPanelSettings size={18} />
              <span>Admin Dashboard</span>
            </span>
            <span>&rarr;</span>
          </Link>
        )}

        {/* 3-Column Segmented Tab Switcher (Fits 100% width on mobile) */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-[#111827] border border-gray-200 dark:border-gray-800">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === item.id
                  ? "bg-[#39c1f3] text-white shadow-sm font-semibold"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Vertical Navigation Card (>= 800px) */}
      <div className="hidden min-[800px]:block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] p-4 shadow-sm">
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100 dark:border-gray-800 px-2">
          <Image
            src={avatarSrc}
            alt={user?.name || "Profile"}
            width={46}
            height={46}
            className="rounded-full object-cover ring-2 ring-[#39c1f3]/30 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
              {user?.name || "Student"}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email || ""}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                activeTab === item.id
                  ? "bg-[#39c1f3]/10 text-[#39c1f3] font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/60"
              }`}
            >
              <span
                className={
                  activeTab === item.id
                    ? "text-[#39c1f3]"
                    : "text-gray-500 dark:text-gray-400"
                }
              >
                {item.icon}
              </span>
              <span>{item.fullLabel}</span>
            </button>
          ))}

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all"
            >
              <MdOutlineAdminPanelSettings size={18} />
              <span>Admin Dashboard</span>
            </Link>
          )}

          <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={logoutHandler}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all text-left"
            >
              <AiOutlineLogout size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
