"use client";

import { useRegisterMutation } from "@/app/redux/features/auth/authApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

interface Props {
  setRoute?: (route: string) => void;
  setOpen?: (open: boolean) => void;
}

const Register: FC<Props> = ({ setRoute, setOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { isLoading, isError, data, isSuccess }] =
    useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";

      toast.success(message);

      setRoute?.("Verification");
    }

    if (isError) {
      toast.error("Failed to register user");
    }
  }, [isSuccess, isError, data, setRoute]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required");
    }

    if (!name) {
      return toast.error("Name is required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    const registerData = {
      name,
      email,
      password,
    };

    const data = await register(registerData);



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
        {/* Full Name */}
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

        {/* Email */}
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

        {/* Password */}
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
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 mt-2 rounded-lg bg-[#39c1f3] hover:bg-[#25addf] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>

          <span className="px-3 text-xs text-gray-400 uppercase tracking-wider">
            Or join with
          </span>

          <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => signIn("google")}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <FcGoogle size={18} />
            Google
          </button>

          <button
            type="button"
            onClick={() => signIn("github")}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <AiOutlineGithub
              size={18}
              className="text-gray-900 dark:text-white"
            />
            GitHub
          </button>
        </div>

        {/* Login */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-3">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setRoute?.("Login")}
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
