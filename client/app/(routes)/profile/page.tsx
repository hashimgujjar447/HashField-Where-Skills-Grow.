"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProfileSidebar from "../../components/Profile/ProfileSidebar";
import EnrolledCourses from "../../components/Profile/EnrolledCourses";
import Heading from "../../utils/Heading";
import { HiOutlineCamera, HiOutlineLockClosed } from "react-icons/hi";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("My Account");
  const [name, setName] = useState("John Doe");
  const [email] = useState("john@example.com");
  const [bio, setBio] = useState("Passionate learner exploring React, TypeScript, and full-stack systems.");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-gray-900 dark:text-white font-Poppins">
      <Heading
        title="Student Profile - ELearn"
        description="Manage your ELearn account, track enrolled courses, and update preferences."
        keywords="profile, student account, courses, learning"
      />

      <Header open={open} setOpen={setOpen} activeItem={0} />

      <main className="flex-1 max-w-[1500px] w-full mx-auto px-5 sm:px-8 lg:px-10 py-10">
        <h1 className="text-2xl sm:text-3xl font-Josefin font-bold text-gray-900 dark:text-white mb-8">
          Student Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Right Main Content */}
          <div className="md:col-span-3 bg-white dark:bg-[#1a1d2e] rounded-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
            {activeTab === "My Account" && (
              <div className="space-y-6 max-w-xl">
                <div>
                  <h2 className="text-xl font-Josefin font-bold text-gray-900 dark:text-white">
                    Personal Information
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Update your display name and personal bio
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#39c1f3] to-[#37a39a] flex items-center justify-center text-white text-2xl font-bold font-Josefin shadow-md">
                      JD
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#39c1f3] text-white hover:bg-[#25addf] shadow-md transition-colors"
                      title="Upload new avatar"
                    >
                      <HiOutlineCamera size={16} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Profile updated successfully!");
                  }}
                  className="space-y-4 pt-2 text-xs"
                >
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      disabled
                      value={email}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-[#151928] text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 uppercase tracking-wider">
                      About Me / Bio
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-lg bg-[#39c1f3] hover:bg-[#25addf] text-white font-medium text-xs transition-colors shadow-md"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === "My Courses" && <EnrolledCourses />}

            {activeTab === "Change Password" && (
              <div className="space-y-6 max-w-md">
                <div>
                  <h2 className="text-xl font-Josefin font-bold text-gray-900 dark:text-white">
                    Change Password
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Keep your account secure with a strong password
                  </p>
                </div>

                {passwordSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 text-xs border border-emerald-500/20">
                    Password updated successfully!
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPasswordSuccess(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 uppercase tracking-wider">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 uppercase tracking-wider">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1 uppercase tracking-wider">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-lg bg-[#39c1f3] hover:bg-[#25addf] text-white font-medium text-xs transition-colors shadow-md"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

            {activeTab === "Logout" && (
              <div className="p-6 text-center max-w-sm mx-auto space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <HiOutlineLockClosed size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-Josefin">
                  Sign Out Confirmation
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Are you sure you want to sign out of your ELearn student session?
                </p>
                <div className="flex gap-3 justify-center pt-2">
                  <button
                    onClick={() => setActiveTab("My Account")}
                    className="px-4 py-2 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => alert("Logged out successfully!")}
                    className="px-4 py-2 text-xs font-medium rounded-lg bg-rose-500 hover:bg-rose-600 text-white shadow-sm"
                  >
                    Yes, Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;