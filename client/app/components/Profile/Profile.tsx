"use client";

import React, { FC, useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import EnrolledCourses from "./EnrolledCourses";
import { useLogoutMutation } from "@/app/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [avatar, setAvatar] = useState<string | null>(null);

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout(undefined).unwrap();
    } catch {}

    try {
      await signOut({ callbackUrl: "/" });
    } catch {
      window.location.href = "/";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 min-w-0">
      <div className="flex flex-col min-[800px]:flex-row gap-4 sm:gap-6 lg:gap-8 items-start w-full min-w-0">
        <aside className="w-full min-[800px]:w-[280px] lg:w-[300px] min-[800px]:shrink-0 min-w-0">
          <ProfileSidebar
            user={user}
            avatar={avatar}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            logoutHandler={logoutHandler}
          />
          {isLoggingOut && (
            <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
              Logging out...
            </p>
          )}
        </aside>

        <main className="w-full flex-1 min-w-0">
          {activeTab === 1 && (
            <ProfileInfo
              user={user}
              avatar={avatar}
              setAvatar={setAvatar}
            />
          )}

          {activeTab === 2 && <ChangePassword />}

          {activeTab === 3 && <EnrolledCourses user={user} />}
        </main>
      </div>
    </div>
  );
};

export default Profile;
