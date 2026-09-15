"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiOutlineCreditCard,
  HiOutlinePlusCircle,
  HiOutlineChartBar,
  HiOutlineBell,
  HiOutlineTemplate,
  HiOutlineArrowLeft,
  HiOutlineX,
} from "react-icons/hi";

interface Props {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

const navSections = [
  {
    title: "Main",
    items: [{ name: "Dashboard", href: "/admin", icon: HiOutlineHome }],
  },
  {
    title: "Data",
    items: [
      { name: "Users", href: "/admin/users", icon: HiOutlineUsers },
      { name: "Courses", href: "/admin/courses", icon: HiOutlineBookOpen },
      { name: "Orders", href: "/admin/orders", icon: HiOutlineCreditCard },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Create Course", href: "/admin/create-course", icon: HiOutlinePlusCircle },
      { name: "Analytics", href: "/admin/analytics", icon: HiOutlineChartBar },
      { name: "Notifications", href: "/admin/notifications", icon: HiOutlineBell },
    ],
  },
  {
    title: "Customize",
    items: [
      { name: "Layout Manager", href: "/admin/layout-manager", icon: HiOutlineTemplate },
    ],
  },
];

const Sidebar: React.FC<Props> = ({ mobileOpen, setMobileOpen }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen && setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        ></div>
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#111827] text-gray-300 border-r border-gray-800 flex flex-col transition-transform duration-300 font-Poppins ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-2 text-white font-Josefin font-bold text-xl">
            <span className="w-8 h-8 rounded-lg bg-[#39c1f3] flex items-center justify-center text-gray-950 font-black">
              E
            </span>
            <span>ELearn Admin</span>
          </Link>
          <button
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <HiOutlineX size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {navSections.map((section, sIdx) => (
            <div key={sIdx}>
              <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen && setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-[#39c1f3]/15 text-[#39c1f3] font-semibold"
                          : "text-gray-400 hover:bg-gray-800/60 hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info & Exit */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/40 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#39c1f3] to-[#37a39a] flex items-center justify-center text-white text-xs font-bold font-Josefin">
              AD
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">Administrator</p>
              <p className="text-[10px] text-gray-500 truncate">admin@elearn.com</p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-[#39c1f3] pt-1"
          >
            <HiOutlineArrowLeft size={14} />
            <span>Return to Public Site</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;