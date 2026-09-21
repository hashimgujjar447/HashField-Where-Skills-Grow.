"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  Eye,
  Receipt,
  User,
  BookOpen,
  CalendarDays,
  CreditCard,
} from "lucide-react";
import { useGetAllOrdersQuery } from "@/app/redux/features/order/orderApi";

import Loader from "../../Loader";
import { useGetAllUsersQuery } from "@/app/redux/features/auth/authApi";
import { useGetAllCoursesQuery } from "@/app/redux/services/courseApi";



type Order = {
  _id: string;
  userId: string;
  courseId: string;
  payment_info?: {
    id?: string;
    status?: string;
    type?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

type Invoice = Order & {
  userName: string;
  userEmail: string;
  courseTitle: string;
  price: number;
};

type Props = {};

const AllInvoices = (props: Props) => {
  const {
    data: ordersData,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetAllOrdersQuery({});

  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery({});

  const { data: coursesData, isLoading: coursesLoading } =
    useGetAllCoursesQuery(undefined);


  const [invoiceData, setInvoiceData] = useState<Invoice[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (ordersData?.orders && usersData?.users && coursesData?.courses) {
      const temp = ordersData.orders.map((item: Order) => {
        const user = usersData.users.find(
          (user: any) => user._id === item.userId,
        );

        const course = coursesData.courses.find(
          (course: any) => course._id === item.courseId,
        );

        return {
          ...item,
          userName: user?.name || "Unknown User",
          userEmail: user?.email || "No email",
          courseTitle: course?.title || "Unknown Course",
          price: course?.price || 0,
        };
      });

      setInvoiceData(temp);
    }
  }, [ordersData, usersData, coursesData]);

  const filteredInvoices = invoiceData.filter(
    (invoice) =>
      invoice.userName.toLowerCase().includes(search.toLowerCase()) ||
      invoice.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      invoice.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
      invoice._id.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatus = (order: Invoice) => {
    const status = order.payment_info?.status?.toLowerCase();

    if (
      status === "succeeded" ||
      status === "completed" ||
      status === "success"
    ) {
      return "completed";
    }

    if (status === "pending" || status === "processing") {
      return "pending";
    }

    if (status === "failed" || status === "cancelled") {
      return "failed";
    }

    return "completed";
  };

  const formatDate = (date?: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusClass = (status: string) => {
    if (status === "completed") {
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
    }

    if (status === "pending") {
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
  };

  if (ordersLoading || usersLoading || coursesLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (ordersError) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-sm text-red-500">Failed to load invoices.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          All Invoices
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          View and manage all course purchase invoices.
        </p>
      </div>

      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-[#131e36] dark:ring-slate-800">
        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Recent Transactions
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              {invoiceData.length} total{" "}
              {invoiceData.length === 1 ? "invoice" : "invoices"}
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoices..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-[#0f1a30] dark:text-white dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-[#0f1a30]">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Invoice
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Customer
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Course
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Amount
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => {
                  const status = getStatus(invoice);

                  return (
                    <tr
                      key={invoice._id}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-[#0f1a30]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                            <Receipt size={15} />
                          </div>

                          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                            #{invoice._id.slice(-8)}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                            <User size={16} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-medium text-slate-800 dark:text-slate-200">
                              {invoice.userName}
                            </p>

                            <p className="truncate text-xs text-slate-400">
                              {invoice.userEmail}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex max-w-[220px] items-center gap-2">
                          <BookOpen
                            size={15}
                            className="shrink-0 text-violet-500"
                          />

                          <span className="truncate text-slate-700 dark:text-slate-300">
                            {invoice.courseTitle}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <CreditCard size={14} className="text-emerald-500" />

                          <span className="font-semibold text-slate-800 dark:text-white">
                            ${invoice.price}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClass(
                            status,
                          )}`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-400 dark:text-slate-500">
                          <CalendarDays size={13} />
                          {formatDate(invoice.createdAt)}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-900/60"
                        >
                          <Eye size={13} />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <Receipt
                        size={40}
                        className="mb-3 text-slate-300 dark:text-slate-600"
                      />

                      <p className="font-medium text-slate-600 dark:text-slate-300">
                        No invoices found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Try changing your search.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllInvoices;
