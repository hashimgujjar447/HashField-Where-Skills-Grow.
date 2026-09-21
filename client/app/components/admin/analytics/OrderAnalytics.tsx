"use client";

import { useGetOrdersAnalyticsQuery } from "@/app/redux/features/analytics/analyticsApi";
import React from "react";
import Loader from "../../Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  Tooltip,
} from "recharts";

type Props = {};

const OrderAnalytics = (props: Props) => {
  const { data, isLoading, isError } = useGetOrdersAnalyticsQuery({});

  const analyticsData =
    data?.orders?.last12Months?.map(
      (item: { month: string; count: number }) => ({
        name: new Date(item.month).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        uv: item.count,
      }),
    ) ?? [];

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="text-lg font-medium text-slate-500">Loading...</div>
        </div>
      ) : isError ? (
        <div className="flex h-screen items-center justify-center">
          <p className="text-red-500">Error occurred</p>
        </div>
      ) : (
        <div className="min-h-screen px-5 py-10">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="mb-8">
              <h1 className="px-1 text-2xl font-semibold text-white">
                Orders Analytics
              </h1>

              <p className="px-1 pt-1 text-sm text-slate-400">
                Last 12 months order data
              </p>
            </div>

            <div className="h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData}
                  margin={{
                    top: 30,
                    right: 10,
                    left: 0,
                    bottom: 20,
                  }}
                  barCategoryGap="35%"
                >
                  <XAxis
                    dataKey="name"
                    axisLine={{
                      stroke: "#1e293b",
                    }}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                    tickMargin={10}
                  />

                  <YAxis
                    allowDecimals={false}
                    domain={[0, "auto"]}
                    axisLine={{
                      stroke: "#1e293b",
                    }}
                    tickLine={false}
                    tick={{
                      fill: "#64748b",
                      fontSize: 12,
                    }}
                  />

                  <Tooltip
                    cursor={{
                      fill: "rgba(255,255,255,0.03)",
                    }}
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #1e293b",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    labelStyle={{
                      color: "#94a3b8",
                    }}
                  />

                  <Bar
                    dataKey="uv"
                    fill="#3faf82"
                    radius={[0, 0, 0, 0]}
                    maxBarSize={70}
                  >
                    <LabelList
                      dataKey="uv"
                      position="top"
                      fill="#94a3b8"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
