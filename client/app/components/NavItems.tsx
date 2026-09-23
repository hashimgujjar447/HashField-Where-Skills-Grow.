"use client";

import React from "react";
import Link from "next/link";

export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
  onClose?: () => void;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile, onClose }) => {
  return (
    <>
      {!isMobile && (
        <div className="hidden min-[800px]:flex items-center gap-1">
          {navItemsData.map((item, index) => (
            <Link href={item.url} key={index}>
              <span
                className={`px-4 py-2 rounded-lg font-Poppins text-[15px] transition-colors ${
                  activeItem === index
                    ? "text-[#39c1f3] font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#39c1f3] dark:hover:text-[#39c1f3]"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}

      {isMobile && (
        <div className="py-2 space-y-1">
          {navItemsData.map((item, index) => (
            <Link href={item.url} key={index} onClick={onClose}>
              <span
                className={`block px-5 py-3 rounded-lg font-Poppins text-[15px] transition-colors ${
                  activeItem === index
                    ? "bg-[#39c1f3]/10 text-[#39c1f3] font-semibold"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800/60"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
