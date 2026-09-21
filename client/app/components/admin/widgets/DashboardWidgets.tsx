"use client";

import React, { FC } from "react";
import {
  Users,
  BookOpen,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

type Props = {
  totalUsers: number;
  totalCourses: number;
  totalOrders: number;
  revenue: number;
};

const DashboardWidgets: FC<Props> = ({
  totalUsers,
  totalCourses,
  totalOrders,
  revenue,
}) => {
  const widgets = [
    {
      label: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: Users,
      color: "indigo",
    },
    {
      label: "Total Courses",
      value: totalCourses.toLocaleString(),
      icon: BookOpen,
      color: "emerald",
    },
    {
      label: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "violet",
    },
    {
      label: "Revenue",
      value: `$${revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "amber",
    },
  ];

  const colors: Record<
    string,
    {
      bg: string;
      icon: string;
      ring: string;
    }
  > = {
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
      icon: "text-indigo-600 dark:text-indigo-400",
      ring: "ring-indigo-200 dark:ring-indigo-800",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      icon: "text-emerald-600 dark:text-emerald-400",
      ring: "ring-emerald-200 dark:ring-emerald-800",
    },
    violet: {
      bg: "bg-violet-50 dark:bg-violet-950/40",
      icon: "text-violet-600 dark:text-violet-400",
      ring: "ring-violet-200 dark:ring-violet-800",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/40",
      icon: "text-amber-600 dark:text-amber-400",
      ring: "ring-amber-200 dark:ring-amber-800",
    },
  };

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {widgets.map((widget) => {
        const Icon = widget.icon;
        const color = colors[widget.color];

        return (
          <div
            key={widget.label}
            className={`relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ${color.ring} transition hover:shadow-md dark:bg-[#131e36]`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {widget.label}
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {widget.value}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight size={14} />
                  Current total
                </div>
              </div>

              <div
                className={`rounded-xl p-3 ${color.bg} ring-1 ${color.ring}`}
              >
                <Icon size={22} className={color.icon} />
              </div>
            </div>

            <div
              className={`pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full ${color.bg} opacity-50`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DashboardWidgets;
