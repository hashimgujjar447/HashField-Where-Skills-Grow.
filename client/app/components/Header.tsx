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
import { setAccessToken } from "../redux/features/auth/authSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  setActiveItem?: (item: number) => void;
};

const Header: FC<Props> = ({ open, setOpen, activeItem }) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSidebar] = useState(false);

  const { user } = useSelector((state: any) => state.auth);

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
    if (isSocialAuthSuccess) {
      toast.success("Login Successfully");
    }
  }, [isSocialAuthSuccess]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full  relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-linear-to-b bg-white dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] min-[800px]:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href="/"
                className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
              >
                ELearning
              </Link>
            </div>

            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />

              <ThemeSwitcher />

              <div className="min-[800px]:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              <div className="max-[800px]:hidden">
                {user ? (
                  <Link href="/profile">
                    <Image
                      src={user?.avatar?.url || "/assets/avatar.jfif"}
                      alt="User Avatar"
                      width={25}
                      height={25}
                      className="rounded-full cursor-pointer"
                      style={{
                        border: activeItem === 6 ? "2px solid #ffc107" : "",
                      }}
                    />
                  </Link>
                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className="cursor-pointer dark:text-white text-black"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {openSideBar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[99999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />

              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                onClick={() => setOpen(true)}
              />

              <br />
              <br />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
