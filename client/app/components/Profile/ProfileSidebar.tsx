"use client";

import React from "react";
import { HiOutlineUser, HiOutlineBookOpen, HiOutlineLockClosed, HiOutlineLogout } from "react-icons/hi";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { label: "My Account", icon: HiOutlineUser },
  { label: "My Courses", icon: HiOutlineBookOpen },
  { label: "Change Password", icon: HiOutlineLockClosed },
  { label: "Logout", icon: HiOutlineLogout },
];

const ProfileSidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white dark:bg-[#1a1d2e] rounded-lg shadow p-6 w-full">
      {/* Avatar + Info */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#39c1f3] to-[#37a39a] flex items-center justify-center text-white text-3xl font-Josefin font-[700] shadow-lg">
          JD
        </div>
        <h2 className="mt-3 text-lg font-Josefin font-[600] text-gray-800 dark:text-white">
          John Doe
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins">
          john@example.com
        </p>
        <span className="mt-2 px-3 py-1 bg-[#39c1f3]/10 text-[#39c1f3] text-xs font-Poppins font-[500] rounded-full border border-[#39c1f3]/30">
          Student
        </span>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 dark:border-[#ffffff1c] mb-4" />

      {/* Desktop Nav */}
      <nav className="hidden md:flex flex-col gap-1">
        {tabs.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-Poppins font-[400] transition-all duration-200 text-left ${
              activeTab === label
                ? "bg-[#39c1f3] text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#ffffff0d]"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      {/* Mobile Horizontal Tabs */}
      <div className="md:hidden flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
        {tabs.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`flex items-center gap-2 whitespace-nowrap px-3 py-2 rounded-lg text-xs font-Poppins font-[500] transition-all duration-200 flex-shrink-0 ${
              activeTab === label
                ? "bg-[#39c1f3] text-white"
                : "bg-gray-100 dark:bg-[#ffffff0d] text-gray-600 dark:text-gray-300"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
