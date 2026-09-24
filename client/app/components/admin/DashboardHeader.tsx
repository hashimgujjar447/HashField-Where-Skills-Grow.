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
import socketIO from "socket.io-client";

const ENDPOINT =
  process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "http://localhost:8000";

type Notification = {
  _id?: string;
  title: string;
  message: string;
  status: "read" | "unread";
  userId: string;
  createdAt?: string;
};

type Props = {
  open?: boolean;
  setOpen?: (v: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);

  const { data: allNotifications, refetch } = useGetAllNotificationsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [mark] = useUpdateNotificationReadStatusMutation();

  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();

  useEffect(() => {
    if (allNotifications?.notifications) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNotifications(allNotifications.notifications);
    }
  }, [allNotifications]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    const socket = socketIO(ENDPOINT, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Notification socket connected:", socket.id);
    });

    socket.on("newNotification", (data: Notification) => {
      console.log("Received new notification:", data);

      setNotifications((prev) => {
        const alreadyExists = prev.some(
          (notification) =>
            notification._id && data._id && notification._id === data._id,
        );

        if (alreadyExists) {
          return prev;
        }

        return [data, ...prev];
      });

      toast.success(data.title);
    });

    socket.on("disconnect", () => {
      console.log("Notification socket disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("newNotification");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  const unreadCount = notifications.filter(
    (notification) => notification.status === "unread",
  ).length;

  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-[#101936]/90 sm:px-6 lg:left-[270px]">
      <button
        onClick={() => setOpen && setOpen(!open)}
        aria-label="Toggle sidebar"
        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="ml-auto flex items-center gap-1">
        <ThemeSwitcher />

        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <IoMdNotificationsOutline className="text-xl" />

            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold leading-none text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 z-50 w-[calc(100vw-32px)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-[#111C43] sm:w-96">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Notifications
                </p>

                <button
                  onClick={async () => {
                    await markAllAsRead({}).unwrap();

                    setNotifications((prev) =>
                      prev.map((notification) => ({
                        ...notification,
                        status: "read",
                      })),
                    );

                    toast.success("All notifications marked as read");
                  }}
                  className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-700">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <div
                      key={
                        notification._id ||
                        `${notification.title}-${notification.createdAt}-${index}`
                      }
                      className="flex cursor-pointer flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-[#1b2447]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {notification.status === "unread" && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                          )}

                          <p className="text-sm font-semibold text-slate-800 dark:text-white">
                            {notification.title}
                          </p>
                        </div>

                        {notification.status === "unread" && (
                          <button
                            onClick={async () => {
                              if (!notification._id) {
                                return;
                              }

                              await mark(notification._id).unwrap();

                              setNotifications((prev) =>
                                prev.map((item) =>
                                  item._id === notification._id
                                    ? {
                                        ...item,
                                        status: "read",
                                      }
                                    : item,
                                ),
                              );

                              toast.success("Notification marked as read");
                            }}
                            className="shrink-0 text-[11px] text-indigo-500 hover:underline dark:text-indigo-400"
                          >
                            Mark read
                          </button>
                        )}
                      </div>

                      <p className="text-xs leading-snug text-slate-500 dark:text-slate-400">
                        {notification.message}
                      </p>

                      {notification.createdAt && (
                        <p className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                          <Clock size={10} />

                          {dayjs(notification.createdAt).format(
                            "DD MMM YYYY, hh:mm A",
                          )}
                        </p>
                      )}
                    </div>
                  ))
                )}
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
