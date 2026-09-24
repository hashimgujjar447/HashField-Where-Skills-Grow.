"use client";

import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import NavItems from "./NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "../redux/features/auth/authApi";
import Image from "next/image";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  setActiveItem?: (item: number) => void;
};

const Header: FC<Props> = ({ open, setOpen, activeItem }) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSidebar] = useState(false);

  const { user } = useSelector(
    (state: {
      auth: {
        user: {
          avatar?: { url?: string };
          name?: string;
          role?: string;
        } | null;
      };
    }) => state.auth,
  );
  const { data, status } = useSession();

  const [
    socialAuth,
    { isSuccess: isSocialAuthSuccess, isLoading: isSocialAuthLoading },
  ] = useSocialAuthMutation();

  useEffect(() => {
    if (status === "loading") return;
    if (!user && data?.user && !isSocialAuthLoading) {
      socialAuth({
        email: data.user.email,
        name: data.user.name,
        avatar: data.user.image,
      })
        .unwrap()
        .catch(() => {});
    }
  }, [data, status]);

  useEffect(() => {
    if (isSocialAuthSuccess) toast.success("Login Successfully");
  }, [isSocialAuthSuccess]);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "screen") setOpenSidebar(false);
  };

  return (
    <header
      className={`sticky top-0 z-[80] w-full bg-white dark:bg-[#0b0f17] border-b border-gray-100 dark:border-gray-800/80 transition-shadow duration-300 ${
        active ? "shadow-sm dark:shadow-none" : ""
      }`}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-[1500px] items-center justify-between px-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="font-Poppins text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Hash<span className="text-[#39c1f3]">Field</span>
        </Link>

        <div className="flex items-center gap-3">
          <NavItems activeItem={activeItem} isMobile={false} />

          <div className="hidden min-[800px]:flex items-center gap-2 pl-2">
            <ThemeSwitcher />

            {user ? (
              <Link href="/profile" className="flex  items-center">
                <div
                  className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-full ${
                    activeItem === 6
                      ? "ring-2 ring-[#39c1f3]"
                      : "ring-2 ring-transparent"
                  } transition-all`}
                >
                  <Image
                    src={user?.avatar?.url || "/assets/avatar.jfif"}
                    alt={user?.name || "User Avatar"}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-[#39c1f3] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#25addf]"
              >
                <HiOutlineUserCircle size={18} />
                <span>Sign In</span>
              </button>
            )}
          </div>

          <div className="flex min-[800px]:hidden items-center gap-1.5">
            <ThemeSwitcher />

            <button
              type="button"
              onClick={() => setOpenSidebar(true)}
              aria-label="Open navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 transition-colors"
            >
              <HiOutlineMenuAlt3 size={24} />
            </button>
          </div>
        </div>
      </div>

      {openSideBar && (
        <div
          className="fixed inset-0 z-[99999] bg-black/50 transition-opacity"
          onClick={handleClose}
          id="screen"
        >
          <div className="fixed right-0 top-0 z-[999999] flex h-full w-[78%] max-w-[320px] flex-col bg-white shadow-2xl dark:bg-[#0d1526] sm:w-[60%]">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
              <Link
                href="/"
                className="font-Poppins text-lg font-bold text-gray-900 dark:text-white"
                onClick={() => setOpenSidebar(false)}
              >
                Hash<span className="text-[#39c1f3]">Field</span>
              </Link>
              <button
                onClick={() => setOpenSidebar(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-3">
              <NavItems
                activeItem={activeItem}
                isMobile={true}
                onClose={() => setOpenSidebar(false)}
              />
            </div>

            <div className="border-t border-gray-100 p-4 dark:border-gray-800">
              {user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-xl p-2 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors"
                  onClick={() => setOpenSidebar(false)}
                >
                  <Image
                    src={user?.avatar?.url || "/assets/avatar.jfif"}
                    alt="User"
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.name || "Student"}
                    </p>
                    <p className="text-xs text-[#39c1f3]">View Profile</p>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setOpen(true);
                    setOpenSidebar(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#39c1f3] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#25addf]"
                >
                  <HiOutlineUserCircle size={20} />
                  <span>Sign In / Register</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
