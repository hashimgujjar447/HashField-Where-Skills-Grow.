"use client";

import React, { FC, useMemo } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  useGetUsersAnalyticsQuery,
  useGetOrdersAnalyticsQuery,
} from "@/app/redux/features/analytics/analyticsApi";
import { useGetAllOrdersQuery } from "@/app/redux/features/order/orderApi";
import Loader from "../Loader";
import { useGetAllUsersQuery } from "@/app/redux/features/auth/authApi";
import { useGetAllCoursesQuery } from "@/app/redux/services/courseApi";

type Props = {};

type Order = {
  _id: string;
  userId: string;
  courseId: string;
  payment_info?: { status?: string };
  createdAt?: string;
};

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-lg dark:border-[#2a3a5c] dark:bg-[#1a2740] dark:text-white">
        <p className="mb-1 font-semibold text-indigo-600 dark:text-[#4a6cf7]">
          {label}
        </p>
        <p>
          Count:{" "}
          <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const DashboardHero: FC<Props> = () => {
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetAllUsersQuery({});

  const {
    data: ordersData,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetAllOrdersQuery({});

  const {
    data: coursesData,
    isLoading: coursesLoading,
  } = useGetAllCoursesQuery(undefined);

  const {
    data: usersAnalytics,
    isLoading: usersAnalyticsLoading,
  } = useGetUsersAnalyticsQuery({});

  const {
    data: ordersAnalytics,
    isLoading: ordersAnalyticsLoading,
  } = useGetOrdersAnalyticsQuery({});

  const isLoading =
    usersLoading ||
    ordersLoading ||
    coursesLoading ||
    usersAnalyticsLoading ||
    ordersAnalyticsLoading;

  const users = usersData?.users ?? [];
  const orders: Order[] = ordersData?.orders ?? [];
  const courses = coursesData?.courses ?? [];

  const usersChartData =
    usersAnalytics?.users?.last12Months?.map((item: any) => ({
      name: new Date(item.month).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),
      value: item.count,
    })) ?? [];

  const ordersChartData =
    ordersAnalytics?.orders?.last12Months?.map((item: any) => ({
      name: new Date(item.month).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),
      value: item.count,
    })) ?? [];

  const recentOrders = useMemo(
    () =>
      [...orders]
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime(),
        )
        .slice(0, 10)
        .map((order) => {
          const user = users.find((u: any) => u._id === order.userId);
          const course = courses.find((c: any) => c._id === order.courseId);
          return {
            id: order._id,
            user: user?.name || "Unknown User",
            price: course?.price || 0,
            createdAt: order.createdAt,
          };
        }),
    [orders, users, courses],
  );

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (usersError || ordersError) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2 text-center">
        <p className="text-base font-semibold text-red-500">
          Failed to load dashboard data
        </p>
        <p className="text-sm text-slate-400">
          Please refresh the page or check your connection.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-1 rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-[#111827] dark:ring-[#1e2d45] lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-slate-800 dark:text-white">
            Users Analytics
          </h2>
          <div className="h-[260px] w-full">
            {usersChartData.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={usersChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4a6cf7" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#4a6cf7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="currentColor"
                    strokeOpacity={0.08}
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#4a6cf7"
                    strokeWidth={2.5}
                    fill="url(#usersGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <StatCard
            value={orders.length}
            label="Sales Obtained"
            percent="+120%"
            iconType="sales"
          />
          <StatCard
            value={users.length}
            label="New Users"
            percent="+150%"
            iconType="users"
          />
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-1 rounded-2xl bg-white p-5 ring-1 ring-slate-200 dark:bg-[#111827] dark:ring-[#1e2d45] lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-slate-800 dark:text-white">
            Orders Analytics
          </h2>
          <div className="h-[260px] w-full">
            {ordersChartData.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={ordersChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="currentColor"
                    strokeOpacity={0.08}
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4a6cf7"
                    strokeWidth={2}
                    dot={{ fill: "#4a6cf7", r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#6366f1" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 dark:bg-[#111827] dark:ring-[#1e2d45]">
          <div className="border-b border-slate-100 px-5 py-4 dark:border-[#1e2d45]">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-white">
              Recent Transactions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 dark:border-[#1e2d45] dark:bg-[#0d1526]">
                  {["ID", "Name", "Price", "Created At"].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate-500 dark:text-[#6b7a99]"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1e2d45]">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-slate-400 dark:text-[#6b7a99]"
                    >
                      No orders yet
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-[#0d1526]"
                    >
                      <td className="px-4 py-3 font-mono text-slate-400 dark:text-[#6b7a99]">
                        {order.id.slice(0, 5)}...
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">
                        {order.user}
                      </td>
                      <td className="px-4 py-3 text-slate-700 dark:text-white">
                        ${order.price}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-400 dark:text-[#6b7a99]">
                        {order.createdAt ? timeAgo(order.createdAt) : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {recentOrders.length > 0 && (
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-400 dark:border-[#1e2d45] dark:bg-[#0d1526] dark:text-[#6b7a99]">
              <span>Rows per page: 10</span>
              <span>
                1–{Math.min(recentOrders.length, 10)} of {orders.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  value,
  label,
  percent,
  iconType,
}: {
  value: number;
  label: string;
  percent: string;
  iconType: "sales" | "users";
}) => (
  <div className="flex flex-1 items-center justify-between rounded-2xl bg-white px-6 py-5 ring-1 ring-slate-200 dark:bg-[#111827] dark:ring-[#1e2d45]">
    <div>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-[#4a6cf7]">
        {label}
      </p>
      <p className="mt-2 text-xs font-bold text-emerald-500 dark:text-[#6bc5a0]">
        {percent}
      </p>
    </div>
    <div className="shrink-0">
      {iconType === "sales" ? <SalesIcon /> : <UsersIcon />}
    </div>
  </div>
);

const SalesIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" stroke="#4a6cf7" strokeWidth="2.5" fill="none" />
    <circle cx="24" cy="24" r="16" stroke="#4a6cf7" strokeWidth="1" fill="none" strokeOpacity="0.3" />
    <rect x="17" y="17" width="14" height="14" rx="3" stroke="#4a6cf7" strokeWidth="1.5" fill="none" />
    <path d="M21 24h6M24 21v6" stroke="#4a6cf7" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const UsersIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" stroke="#4a6cf7" strokeWidth="2.5" fill="none" />
    <circle cx="24" cy="24" r="16" stroke="#4a6cf7" strokeWidth="1" fill="none" strokeOpacity="0.3" />
    <circle cx="20" cy="20" r="4" stroke="#4a6cf7" strokeWidth="1.5" fill="none" />
    <circle cx="30" cy="20" r="4" stroke="#4a6cf7" strokeWidth="1.5" fill="none" />
    <path d="M13 34c0-5 3.5-8 8-8h6c4.5 0 8 3 8 8" stroke="#4a6cf7" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const EmptyChart = () => (
  <div className="flex h-full items-center justify-center text-sm text-slate-400 dark:text-[#6b7a99]">
    No data available
  </div>
);

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (mins > 0) return `${mins} min${mins > 1 ? "s" : ""} ago`;
  return "Just now";
}

export default DashboardHero;
