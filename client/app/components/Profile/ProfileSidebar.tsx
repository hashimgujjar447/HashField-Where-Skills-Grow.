import Image from "next/image";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";

type User = {
  avatar?: string;
};

type Props = {
  user: User | null;
  avatar: string | null;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
  logoutHandler?: () => void;
};

const ProfileSidebar: React.FC<Props> = ({
  user,
  avatar,
  setActiveTab,
  activeTab,
  logoutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          activeTab === 1 ? "bg-white dark:bg-slate-800" : "bg-transparent"
        }`}
        onClick={() => setActiveTab(1)}
      >
        <Image
          src={user?.avatar?.url || "/assets/avatar.jfif"}
          alt="Profile"
          width={30}
          height={30}
          className="w-[20px] h-[20px] min-[800px]:w-[30px] min-[800px]:h-[30px] cursor-pointer rounded-full object-cover"
        />

        <h5 className="pl-2 min-[800px]:block hidden font-Poppins text-black dark:text-white">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          activeTab === 2 ? "bg-white dark:bg-slate-800" : "bg-transparent"
        }`}
        onClick={() => setActiveTab(2)}
      >
        <RiLockPasswordLine size={20} className="text-black dark:text-white" />

        <h5 className="pl-2 min-[800px]:block hidden font-Poppins text-black dark:text-white">
          Change Password
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          activeTab === 3 ? "bg-white dark:bg-slate-800" : "bg-transparent"
        }`}
        onClick={() => setActiveTab(3)}
      >
        <SiCoursera size={20} className="text-black dark:text-white" />

        <h5 className="pl-2 min-[800px]:block hidden font-Poppins text-black dark:text-white">
          Enrolled Courses
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          activeTab === 4 ? "bg-white dark:bg-slate-800" : "bg-transparent"
        }`}
        onClick={() => logoutHandler && logoutHandler()}
      >
        <AiOutlineLogout size={20} className="text-black dark:text-white" />

        <h5 className="pl-2 min-[800px]:block hidden font-Poppins text-black dark:text-white">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default ProfileSidebar;
