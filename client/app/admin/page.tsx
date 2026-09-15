"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiOutlineCreditCard,
  HiOutlineCurrencyDollar,
  HiOutlineTrendingUp,
} from "react-icons/hi";

const stats = [
  { label: "Total Students", value: "14,820", change: "+14.2%", icon: HiOutlineUsers, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Published Courses", value: "142", change: "+6.8%", icon: HiOutlineBookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Total Orders", value: "4,120", change: "+18.5%", icon: HiOutlineCreditCard, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Total Revenue", value: "$68,490", change: "+22.4%", icon: HiOutlineCurrencyDollar, color: "text-purple-500", bg: "bg-purple-500/10" },
];

const recentOrders = [
  { id: "ORD-9821", student: "Hamza Tariq", course: "Next.js 16 Full-Stack Mastery", amount: "$49.00", date: "2 mins ago", status: "Paid" },
  { id: "ORD-9820", student: "Aisha Rehman", course: "Node.js Microservices", amount: "$39.00", date: "45 mins ago", status: "Paid" },
  { id: "ORD-9819", student: "Bilal Sheikh", course: "Docker & Cloud DevOps", amount: "$59.00", date: "2 hours ago", status: "Paid" },
  { id: "ORD-9818", student: "Zainab Noor", course: "UI/UX Design with Figma", amount: "$34.00", date: "5 hours ago", status: "Pending" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-Josefin font-bold text-gray-900 dark:text-white">
          System Overview
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Real-time metrics, order summaries, and platform growth analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-[#1a1d2e] border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-lg ${item.bg} ${item.color} flex items-center justify-center`}>
                  <Icon size={22} />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                  <HiOutlineTrendingUp size={14} />
                  {item.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold font-Josefin text-gray-900 dark:text-white">
                {item.value}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</p>
            </div>
          );
        })}
      </div>

      {/* Visual Chart Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl bg-white dark:bg-[#1a1d2e] border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Student Registrations (Last 6 Months)
            </h3>
            <span className="text-xs text-[#39c1f3] font-semibold">+2,480 this month</span>
          </div>
          {/* Bar Chart Simulation */}
          <div className="h-44 flex items-end gap-4 pt-4 border-b border-gray-100 dark:border-gray-800">
            {[
              { month: "Apr", height: "45%" },
              { month: "May", height: "60%" },
              { month: "Jun", height: "55%" },
              { month: "Jul", height: "75%" },
              { month: "Aug", height: "90%" },
              { month: "Sep", height: "100%" },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full bg-[#39c1f3] rounded-t-md hover:bg-[#25addf] transition-all"
                  style={{ height: bar.height }}
                ></div>
                <span className="text-[11px] text-gray-400">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-[#1a1d2e] border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Revenue Analytics ($68K Total)
            </h3>
            <span className="text-xs text-emerald-500 font-semibold">+22.4% vs last quarter</span>
          </div>
          {/* Revenue Bar Simulation */}
          <div className="h-44 flex items-end gap-4 pt-4 border-b border-gray-100 dark:border-gray-800">
            {[
              { month: "Apr", height: "40%" },
              { month: "May", height: "50%" },
              { month: "Jun", height: "65%" },
              { month: "Jul", height: "70%" },
              { month: "Aug", height: "85%" },
              { month: "Sep", height: "95%" },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full bg-emerald-500 rounded-t-md hover:bg-emerald-400 transition-all"
                  style={{ height: bar.height }}
                ></div>
                <span className="text-[11px] text-gray-400">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#1a1d2e] border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Recent Enrolled Orders
          </h3>
          <Link href="/admin/orders" className="text-xs font-semibold text-[#39c1f3] hover:underline">
            View all orders &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 uppercase tracking-wider">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Student</th>
                <th className="pb-3">Course</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
              {recentOrders.map((ord, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                  <td className="py-3 font-semibold text-gray-900 dark:text-white">{ord.id}</td>
                  <td className="py-3">{ord.student}</td>
                  <td className="py-3 text-[#39c1f3]">{ord.course}</td>
                  <td className="py-3 font-semibold">{ord.amount}</td>
                  <td className="py-3 text-gray-500">{ord.date}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        ord.status === "Paid"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;