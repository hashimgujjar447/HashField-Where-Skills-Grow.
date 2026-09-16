"use client";

import React, { FC, useEffect, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/app/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/app/redux/features/auth/authSlice";
import { signIn } from "next-auth/react";

interface Props {
  setRoute?: (route: string) => void;
  setOpen?: (open: boolean) => void;
}

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [login, { isLoading, isSuccess, isError, data, error }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        userLoggedIn({
          accessToken: data.accessToken,
          user: data.user,
        }),
      );

      toast.success(data.message || "Login successful");

      setOpen?.(false);
    }

    if (isError) {
      if (error && "data" in error) {
        const errData = error.data as { message?: string };

        toast.error(errData.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    }
  }, [isSuccess, isError, data, error, dispatch, setOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required");
    }

    if (!password) {
      return toast.error("Password is required");
    }

    login({
      email,
      password,
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-Josefin font-bold text-center text-gray-900 dark:text-white mb-2">
        Welcome Back
      </h2>

      <p className="text-sm text-center text-gray-500 dark:text-gray-400 font-Poppins mb-6">
        Sign in to access your courses and continue learning
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 font-Poppins">
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
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Password
            </label>

            <button
              type="button"
              onClick={() => setRoute?.("ForgotPassword")}
              className="text-xs text-[#39c1f3] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 mt-2 rounded-lg bg-[#39c1f3] hover:bg-[#25addf] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>

          <span className="px-3 text-xs text-gray-400 uppercase tracking-wider">
            Or continue with
          </span>

          <div className="flex-1 border-t border-gray-200 dark:border-gray-700"></div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => signIn("google")}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <FcGoogle size={18} />
            Google
          </button>

          <button
            onClick={() => signIn("github")}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-200 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <AiOutlineGithub
              size={18}
              className="text-gray-900 dark:text-white"
            />
            GitHub
          </button>
        </div>

        {/* Register */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-3">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => setRoute?.("Register")}
            className="text-[#39c1f3] font-semibold hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
