"use client";

import React, { FC, useState, useRef, useEffect } from "react";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Menu, X, Clock } from "lucide-react";
import {
  useGetAllNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useUpdateNotificationReadStatusMutation,
} from "@/app/redux/features/notifications/notificationApi";
import dayjs from "dayjs";
import toast from "react-hot-toast";
type Props = {
  open?: boolean;
  setOpen?: (v: boolean) => void;
};

const notifications = [
  {
    title: "New Question Received",
    message: "A student asked a question in React Mastery course.",
    time: "5 minutes ago",
    unread: true,
  },
  {
    title: "New Order",
    message: "Bob Smith purchased the Node.js Pro course.",
    time: "20 minutes ago",
    unread: true,
  },
  {
    title: "Course Review",
    message: "New 5-star review on TypeScript 101.",
    time: "2 hours ago",
    unread: false,
  },
];

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const { data: allNotifications, refetch } = useGetAllNotificationsQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const [mark] = useUpdateNotificationReadStatusMutation();
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();

  console.log(allNotifications);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount =
    allNotifications?.notifications?.filter((n) => n.status === "unread")
      .length ?? 0;

  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-[#101936]/90 sm:px-6 lg:left-[270px]">
      <button
        onClick={() => setOpen && setOpen(!open)}
        aria-label="Toggle sidebar"
        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors lg:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="ml-auto flex items-center gap-1">
        <ThemeSwitcher />

        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          >
            <IoMdNotificationsOutline className="text-xl" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold leading-none text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 z-50 w-[calc(100vw-32px)] max-w-sm sm:w-96 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-[#111C43]">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Notifications
                </p>
                <button
                  onClick={async () => {
                    await markAllAsRead({}).unwrap();
                    refetch();

                    toast.success("All notifications mark as read");
                  }}
                  className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-700">
                {allNotifications?.notifications.map((n, i) => (
                  <div
                    key={i}
                    className="flex cursor-pointer flex-col gap-0.5 px-4 py-3 hover:bg-slate-50 dark:hover:bg-[#1b2447] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {n.status === "unread" && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                        )}
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          {n.title}
                        </p>
                      </div>
                      {n.status === "unread" && (
                        <button
                          onClick={async () => {
                            await mark(n._id).unwrap();
                            refetch();
                            toast.success("Notification marked as read");
                          }}
                          className="shrink-0 text-[11px] text-indigo-500 hover:underline dark:text-indigo-400"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                      {n.message}
                    </p>
                    <p className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                      <Clock size={10} />
                      {dayjs(n.createdAt).format("DD MMM YYYY, hh:mm A")}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 px-4 py-2.5 dark:border-slate-700">
                <button className="w-full text-center text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
