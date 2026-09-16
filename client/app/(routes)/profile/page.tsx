"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Heading from "../../utils/Heading";

import UseProtected from "@/app/components/hooks/useProtected";
import Profile from "@/app/components/Profile/Profile";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeItem, setActiveItem] = useState(6);

  return (
    <UseProtected>
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-gray-900 dark:text-white font-Poppins">
        <Heading
          title="Student Profile - ELearn"
          description="Manage your ELearn account, track enrolled courses, and update preferences."
          keywords="profile, student account, courses, learning"
        />

        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        <Profile user={user} />

        <Footer />
      </div>
    </UseProtected>
  );
};

export default ProfilePage;
