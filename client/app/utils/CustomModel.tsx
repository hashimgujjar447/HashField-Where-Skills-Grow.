"use client";

import React, { FC } from "react";
import { IoCloseOutline } from "react-icons/io5";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem?: unknown;
  component: React.ComponentType<any>;
  setRoute?: (route: string) => void;
};

const CustomModel: FC<Props> = ({ open, setOpen, setRoute, component: Component }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-[480px] bg-white dark:bg-[#1a1d2e] rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 transition-all">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white p-1 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <IoCloseOutline size={26} />
        </button>
        <Component setRoute={setRoute} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default CustomModel;