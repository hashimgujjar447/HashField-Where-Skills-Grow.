"use client";

import React from "react";
import { HiOutlineTrendingUp, HiOutlineCalendar } from "react-icons/hi";

const AnalyticsPage = () => {
  return (
    <div className="space-y-8 font-Poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-Josefin font-bold text-gray-900 dark:text-white">
            12-Month Performance Analytics
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Historical trajectory across student enrollments, order volume, and revenue metrics
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1d2e] text-xs text-gray-600 dark:text-gray-300">
          <HiOutlineCalendar size={16} />
          <span>Oct 2025 – Sep 2026</span>
        </div>
      </div>

      {/* Analytics Chart Cards */}
      <div className="space-y-8">
        {/* Users Analytics */}
        <div className="p-6 rounded-xl bg-white dark:bg-[#1a1d2e] border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Monthly User Growth
              </h3>
              <p className="text-xs text-gray-500">Total new registered students: +14,820</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              <HiOutlineTrendingUp size={14} /> +32% YoY
            </span>
          </div>

          <div className="h-52 flex items-end gap-3 pt-6 border-b border-gray-100 dark:border-gray-800">
            {[
              { m: "Oct", h: "35%" }, { m: "Nov", h: "42%" }, { m: "Dec", h: "48%" },
              { m: "Jan", h: "52%" }, { m: "Feb", h: "58%" }, { m: "Mar", h: "64%" },
              { m: "Apr", h: "70%" }, { m: "May", h: "75%" }, { m: "Jun", h: "82%" },
              { m: "Jul", h: "88%" }, { m: "Aug", h: "94%" }, { m: "Sep", h: "100%" },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full bg-[#39c1f3] rounded-t-sm hover:opacity-80 transition-opacity"
                  style={{ height: col.h }}
                ></div>
                <span className="text-[10px] text-gray-400">{col.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Analytics */}
        <div className="p-6 rounded-xl bg-white dark:bg-[#1a1d2e] border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Course Sales & Order Volume
              </h3>
              <p className="text-xs text-gray-500">Cumulative enrollments: 4,120 orders</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              <HiOutlineTrendingUp size={14} /> +28% YoY
            </span>
          </div>

          <div className="h-52 flex items-end gap-3 pt-6 border-b border-gray-100 dark:border-gray-800">
            {[
              { m: "Oct", h: "30%" }, { m: "Nov", h: "38%" }, { m: "Dec", h: "44%" },
              { m: "Jan", h: "50%" }, { m: "Feb", h: "55%" }, { m: "Mar", h: "60%" },
              { m: "Apr", h: "66%" }, { m: "May", h: "72%" }, { m: "Jun", h: "78%" },
              { m: "Jul", h: "85%" }, { m: "Aug", h: "92%" }, { m: "Sep", h: "98%" },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full bg-purple-500 rounded-t-sm hover:opacity-80 transition-opacity"
                  style={{ height: col.h }}
                ></div>
                <span className="text-[10px] text-gray-400">{col.m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;