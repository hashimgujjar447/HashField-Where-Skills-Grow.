"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Video,
  PlaySquare,
  PanelTop,
  CircleHelp,
  Layers3,
  UserCog,
  BarChart3,
  ShoppingCart,
  UserRoundSearch,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const menuSections: MenuSection[] = [
  {
    title: "",
    items: [
      {
        title: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        href: "/admin",
      },
    ],
  },

  {
    title: "Data",
    items: [
      {
        title: "Users",
        icon: <Users size={20} />,
        href: "/admin/users",
      },
      {
        title: "Invoices",
        icon: <FileText size={20} />,
        href: "/admin/invoices",
      },
    ],
  },

  {
    title: "Content",
    items: [
      {
        title: "Create Course",
        icon: <Video size={20} />,
        href: "/admin/create-course",
      },
      {
        title: "Live Courses",
        icon: <PlaySquare size={20} />,
        href: "/admin/live-courses",
      },
    ],
  },

  {
    title: "Customization",
    items: [
      {
        title: "Hero",
        icon: <PanelTop size={20} />,
        href: "/admin/hero",
      },
      {
        title: "FAQ",
        icon: <CircleHelp size={20} />,
        href: "/admin/faq",
      },
      {
        title: "Categories",
        icon: <Layers3 size={20} />,
        href: "/admin/categories",
      },
    ],
  },

  {
    title: "Controllers",
    items: [
      {
        title: "Manage Team",
        icon: <UserCog size={20} />,
        href: "/admin/team",
      },
    ],
  },

  {
    title: "Analytics",
    items: [
      {
        title: "Courses Analytics",
        icon: <BarChart3 size={20} />,
        href: "/admin/analytics/courses",
      },
      {
        title: "Orders Analytics",
        icon: <ShoppingCart size={20} />,
        href: "/admin/analytics/orders",
      },
      {
        title: "Users Analytics",
        icon: <UserRoundSearch size={20} />,
        href: "/admin/analytics/users",
      },
    ],
  },

  {
    title: "Extras",
    items: [
      {
        title: "Settings",
        icon: <Settings size={20} />,
        href: "/admin/settings",
      },
    ],
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside
      className="
        fixed left-0 top-0 z-50
        h-screen w-[270px]
        overflow-y-auto
        border-r
        border-slate-200
        bg-white
        text-slate-900
        transition-colors duration-300

        dark:border-slate-800
        dark:bg-[#101936]
        dark:text-white

        scrollbar-thin
        scrollbar-thumb-slate-300
        dark:scrollbar-thumb-slate-700
      "
    >
      {/* ================= LOGO ================= */}
      <div className="flex items-center justify-between px-7 pb-5 pt-7">
        <h1
          className="
            text-[22px]
            font-bold
            tracking-wide
            text-slate-900
            dark:text-white
          "
        >
          ELEARNING
        </h1>

        <button
          className="
            text-slate-500
            transition
            hover:text-slate-900

            dark:text-slate-300
            dark:hover:text-white
          "
        >
          <ChevronDown size={18} />
        </button>
      </div>

      {/* ================= PROFILE ================= */}
      <div className="flex flex-col items-center px-5 pb-7">
        <div className="relative">
          <div
            className="
              flex
              h-[92px]
              w-[92px]
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border-[4px]
              border-[#7377ff]
              bg-slate-100
              shadow-[0_0_15px_rgba(99,102,241,0.35)]

              dark:bg-slate-700
              dark:shadow-[0_0_15px_rgba(99,102,241,0.6)]
            "
          >
            <Image
              src="/assets/admin-avatar.png"
              alt="Admin"
              width={92}
              height={92}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Online indicator */}
          <span
            className="
              absolute
              bottom-1
              right-1
              h-4
              w-4
              rounded-full
              border-2
              border-white
              bg-green-500

              dark:border-[#101936]
            "
          />
        </div>

        <h2
          className="
            mt-4
            text-[17px]
            font-semibold
            text-slate-900
            dark:text-white
          "
        >
          shahriar sajeeb
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
            dark:text-slate-300
          "
        >
          - Admin
        </p>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="px-4 pb-8">
        {menuSections.map((section, sectionIndex) => (
          <div
            key={section.title || `section-${sectionIndex}`}
            className="mb-5"
          >
            {/* Section title */}
            {section.title && (
              <h3
                className="
                  mb-2
                  px-5
                  text-[16px]
                  font-semibold
                  text-slate-800

                  dark:text-white
                "
              >
                {section.title}
              </h3>
            )}

            {/* Menu items */}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      group
                      flex
                      items-center
                      gap-4
                      rounded-lg
                      px-5
                      py-3
                      text-[15px]
                      font-medium
                      transition-all
                      duration-200

                      ${
                        isActive
                          ? `
                            bg-indigo-50
                            text-[#6366f1]

                            dark:bg-[#252b5c]
                            dark:text-[#7778ff]
                          `
                          : `
                            text-slate-600
                            hover:bg-slate-100
                            hover:text-slate-900

                            dark:text-slate-300
                            dark:hover:bg-[#1b2447]
                            dark:hover:text-white
                          `
                      }
                    `}
                  >
                    <span
                      className={`
                        transition-colors

                        ${
                          isActive
                            ? "text-[#6366f1] dark:text-[#7778ff]"
                            : `
                              text-slate-500
                              group-hover:text-slate-900

                              dark:text-slate-300
                              dark:group-hover:text-white
                            `
                        }
                      `}
                    >
                      {item.icon}
                    </span>

                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* ================= LOGOUT ================= */}
        <button
          className="
            group
            flex
            w-full
            items-center
            gap-4
            rounded-lg
            px-5
            py-3
            text-[15px]
            font-medium
            text-slate-600
            transition-all

            hover:bg-red-50
            hover:text-red-500

            dark:text-slate-300
            dark:hover:bg-red-500/10
            dark:hover:text-red-400
          "
          onClick={() => {
            // Add logout logic here
          }}
        >
          <LogOut
            size={20}
            className="
              transition-colors
              group-hover:text-red-500
              dark:group-hover:text-red-400
            "
          />

          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
