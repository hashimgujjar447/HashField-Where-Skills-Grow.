"use client";

import React, { useState } from "react";
import { HiOutlineSearch, HiOutlineDownload } from "react-icons/hi";

const sampleOrders = [
  { id: "ORD-9821", student: "Hamza Tariq", email: "hamza@example.com", course: "Next.js 16 Full-Stack Mastery", amount: "$49.00", paymentMethod: "Credit Card", date: "Sep 09, 2026", status: "Completed" },
  { id: "ORD-9820", student: "Aisha Rehman", email: "aisha@example.com", course: "Node.js Microservices Architecture", amount: "$39.00", paymentMethod: "PayPal", date: "Sep 08, 2026", status: "Completed" },
  { id: "ORD-9819", student: "Bilal Sheikh", email: "bilal@example.com", course: "Docker & Cloud DevOps", amount: "$59.00", paymentMethod: "Credit Card", date: "Sep 08, 2026", status: "Completed" },
  { id: "ORD-9818", student: "Zainab Noor", email: "zainab@example.com", course: "UI/UX Design with Figma", amount: "$34.00", paymentMethod: "Debit Card", date: "Sep 07, 2026", status: "Pending" },
  { id: "ORD-9817", student: "Tariq Mansoor", email: "tariq@example.com", course: "TypeScript Deep Dive", amount: "$25.00", paymentMethod: "Credit Card", date: "Sep 06, 2026", status: "Refunded" },
];

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = sampleOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-Poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-Josefin font-bold text-gray-900 dark:text-white">
            Orders & Revenue ({sampleOrders.length})
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Complete transaction ledger of course sales and student purchases
          </p>
        </div>

        <button
          onClick={() => alert("Orders exported as CSV file!")}
          className="inline-flex items-center gap-2 py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1d2e] text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <HiOutlineDownload size={16} /> Export CSV
        </button>
      </div>

      <div className="bg-white dark:bg-[#1a1d2e] p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search order ID, student, course..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
          />
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1d2e] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#151928] text-gray-400 uppercase tracking-wider">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Course Enrolled</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Gateway</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
            {filtered.map((ord) => (
              <tr key={ord.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                <td className="p-4 font-semibold text-gray-900 dark:text-white">{ord.id}</td>
                <td className="p-4">
                  <p className="font-semibold text-gray-900 dark:text-white">{ord.student}</p>
                  <p className="text-[10px] text-gray-500">{ord.email}</p>
                </td>
                <td className="p-4 text-[#39c1f3] max-w-xs truncate">{ord.course}</td>
                <td className="p-4 font-bold text-gray-900 dark:text-white">{ord.amount}</td>
                <td className="p-4 text-gray-500">{ord.paymentMethod}</td>
                <td className="p-4 text-gray-500">{ord.date}</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      ord.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : ord.status === "Pending"
                        ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
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
  );
};

export default OrdersPage;