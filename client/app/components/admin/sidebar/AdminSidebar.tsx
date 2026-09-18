"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  X,
} from "lucide-react";

type MenuItem = { title: string; icon: React.ReactNode; href: string };
type MenuSection = { title: string; items: MenuItem[] };

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
      { title: "Users", icon: <Users size={20} />, href: "/admin/users" },
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
      { title: "Hero", icon: <PanelTop size={20} />, href: "/admin/hero" },
      { title: "FAQ", icon: <CircleHelp size={20} />, href: "/admin/faq" },
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

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const AdminSidebar: React.FC<Props> = ({ open, setOpen }) => {
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={close}
        className={[
          "fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed left-0 top-0 z-50 flex h-screen w-[270px] max-w-[85vw] flex-col",
          "border-r border-slate-200 dark:border-slate-800",
          "bg-white dark:bg-[#101936] text-slate-900 dark:text-white",
          "shadow-2xl lg:shadow-none",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-6 py-5 shrink-0 border-b border-slate-100 dark:border-slate-800/60">
          <h1 className="text-xl font-extrabold tracking-widest text-slate-900 dark:text-white">
            ELEARNING
          </h1>
          <button
            onClick={close}
            aria-label="Close sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center px-5 py-5 shrink-0">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-[3px] border-indigo-500 bg-slate-100 shadow-lg shadow-indigo-500/25 dark:bg-slate-700">
              <Image
                src=""
                alt="Admin"
                width={80}
                height={80}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff&size=80";
                }}
              />
            </div>
            <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 dark:border-[#101936]" />
          </div>
          <p className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
            Admin
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Administrator
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          {menuSections.map((section, si) => (
            <div key={section.title || `s-${si}`} className="mb-4">
              {section.title && (
                <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : (pathname?.startsWith(item.href) ?? false);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      className={[
                        "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                        active
                          ? "bg-indigo-50 text-indigo-600 dark:bg-[#252b5c] dark:text-[#818cf8]"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-[#1b2447] dark:hover:text-white",
                      ].join(" ")}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-indigo-500" />
                      )}
                      <span
                        className={[
                          "shrink-0 transition-colors",
                          active
                            ? "text-indigo-600 dark:text-[#818cf8]"
                            : "text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-white",
                        ].join(" ")}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.title}</span>
                      {active && (
                        <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-[#818cf8]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-2 border-t border-slate-100 pt-3 dark:border-slate-800">
            <button
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-150 hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-500/10 dark:hover:text-red-400"
              onClick={() => {}}
            >
              <LogOut
                size={18}
                className="shrink-0 transition-colors group-hover:text-red-500 dark:group-hover:text-red-400"
              />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
