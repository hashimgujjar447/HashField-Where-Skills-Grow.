"use client";

import React, { FC } from "react";
import ProfileSidebar from "./ProfileSidebar";
import ProfileInfo from "./ProfileInfo";
import { useLogoutMutation } from "@/app/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

type Props = {
  user: unknown | null;
};

const Profile: FC<Props> = ({ user }) => {
  const [activeTab, setActiveTab] = React.useState(1);
  const [avatar, setAvatar] = React.useState<string | null>(null);

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout(undefined).unwrap();
      await signOut({ redirect: false });
      toast.success("Logout successful");
      window.location.href = "/";
    } catch (error) {
      console.log("Logout failed:", error);
      window.location.href = "/";
    }
  };

  return (
    <div className="w-[85%] mx-auto flex gap-8 py-10">
      <aside className="w-[310px] shrink-0">
        <div className="sticky top-[120px]">
          <div
            className="
              w-full
              min-h-[450px]
              bg-white
              dark:bg-slate-900
              border
              border-gray-200
              dark:border-[#ffffff1d]
              rounded-[5px]
              shadow-sm
            "
          >
            <ProfileSidebar
              user={user as any}
              avatar={avatar}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              logoutHandler={logoutHandler}
            />

            {isLoggingOut && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 pb-3">
                Logging out...
              </p>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 min-h-[500px]">
        {activeTab === 1 && (
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-[#ffffff1d] rounded-[5px] shadow-sm">
            <ProfileInfo
              user={user as any}
              avatar={avatar}
              setAvatar={setAvatar}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
