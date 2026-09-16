"use client";

import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <ClipLoader
        size={50}
        color="currentColor"
        className="text-black dark:text-white"
      />
    </div>
  );
};

export default Loader;
