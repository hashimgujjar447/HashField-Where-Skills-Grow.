"use client";

import React, { useState } from "react";
import {
  HiOutlineUserAdd,
  HiOutlineQuestionMarkCircle,
  HiOutlineStar,
  HiOutlineShoppingBag,
  HiOutlineCheck,
  HiOutlineTrash,
} from "react-icons/hi";

const initialNotifs = [
  { id: "1", type: "order", title: "New Course Purchase", desc: "Hamza Tariq purchased Next.js 16 Full-Stack Mastery", time: "5 mins ago", read: false },
  { id: "2", type: "question", title: "New Q&A Question", desc: "Aisha posted a question in Lesson 4: Token Expiry", time: "22 mins ago", read: false },
  { id: "3", type: "review", title: "New Course Review", desc: "Bilal left a 5-star review on Docker & Cloud DevOps", time: "1 hour ago", read: false },
  { id: "4", type: "user", title: "New Student Registration", desc: "Zoya Haider created a new student account", time: "3 hours ago", read: true },
  { id: "5", type: "order", title: "New Course Purchase", desc: "Kashif enrolled in Python & AI Bootcamp", time: "1 day ago", read: true },
];

const NotificationsPage = () => {
  const [notifs, setNotifs] = useState(initialNotifs);
  const [filter, setFilter] = useState("all");

  const filtered = notifs.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  const deleteNotif = (id: string) => {
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "order": return <HiOutlineShoppingBag className="text-emerald-500" size={18} />;
      case "question": return <HiOutlineQuestionMarkCircle className="text-[#39c1f3]" size={18} />;
      case "review": return <HiOutlineStar className="text-amber-500" size={18} />;
      default: return <HiOutlineUserAdd className="text-purple-500" size={18} />;
    }
  };

  return (
    <div className="space-y-6 font-Poppins max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-Josefin font-bold text-gray-900 dark:text-white">
            System Notifications
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Automated alerts for orders, questions, and course reviews
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#39c1f3] hover:underline"
        >
          <HiOutlineCheck size={16} /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 text-xs">
        {["all", "unread", "read"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg font-semibold uppercase tracking-wider transition-colors ${
              filter === tab
                ? "bg-[#39c1f3] text-white"
                : "bg-white dark:bg-[#1a1d2e] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border flex items-start gap-4 transition-colors ${
              item.read
                ? "bg-white dark:bg-[#1a1d2e] border-gray-200 dark:border-gray-800 text-gray-500"
                : "bg-[#39c1f3]/5 dark:bg-[#39c1f3]/10 border-[#39c1f3]/30 text-gray-900 dark:text-white"
            }`}
          >
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0">
              {getIcon(item.type)}
            </div>

            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                <span className="text-[10px] text-gray-400">{item.time}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{item.desc}</p>
            </div>

            <button
              onClick={() => setNotifs(notifs.filter((n) => n.id !== item.id))}
              className="text-gray-400 hover:text-rose-500 p-1"
            >
              <HiOutlineTrash size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;