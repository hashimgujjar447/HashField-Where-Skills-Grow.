"use client";

import React, { FC, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

interface Props {
  setRoute?: (route: string) => void;
  setOpen?: (open: boolean) => void;
}

const Register: FC<Props> = ({ setRoute, setOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (setRoute) {
      setRoute("Verification");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-Josefin font-bold text-center text-gray-900 dark:text-white mb-2">
        Create Account
      </h2>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 font-Poppins mb-6">
        Start your learning journey with ELearn today
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 font-Poppins">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white text-sm outline-none focus:border-[#39c1f3] focus:ring-1 focus:ring-[#39c1f3] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white text-sm outline-none focus:border-[#39c1f3] focus:ring-1 focus:ring-[#39c1f3] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white text-sm outline-none focus:border-[#39c1f3] focus:ring-1 focus:ring-[#39c1f3] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 mt-2 rounded-lg bg-[#39c1f3] hover:bg-[#25addf] text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          Sign Up
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
          <span className="px-3 text-xs text-gray-400 uppercase tracking-wider">Or join with</span>
          <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <FcGoogle size={18} />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <AiOutlineGithub size={18} className="text-gray-900 dark:text-white" />
            GitHub
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-3">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setRoute && setRoute("Login")}
            className="text-[#39c1f3] font-semibold hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;