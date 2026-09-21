"use client";

import { useActivationMutation } from "@/app/redux/features/auth/authApi";
import React, { FC, useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

interface Props {
  setRoute?: (route: string) => void;
  setOpen?: (open: boolean) => void;
}

const Verification: FC<Props> = ({ setRoute, setOpen }) => {
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { token } = useSelector((state: any) => state.auth);


  const [activation, { isSuccess, error }] = useActivationMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute?.("Login");
    }

    if (error) {
      if ("data" in error) {
        const errData = error.data as { message: string };
        toast.error(errData.message || "Activation failed");
      } else {
        toast.error("Activation failed");
      }
    }
  }, [isSuccess, setRoute, error]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    const val = value.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    if (val && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = digits.join("");

    if (verificationCode.length !== 4) {
      toast.error("Please enter a valid 4-digit verification code");
      return;
    }

    activation({
      activation_code: verificationCode,
      activation_token: token,
    });
  };

  return (
    <div className="w-full text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#39c1f3]/10 flex items-center justify-center text-[#39c1f3]">
        <VscWorkspaceTrusted size={32} />
      </div>

      <h2 className="text-2xl font-Josefin font-bold text-gray-900 dark:text-white mb-2">
        Verify Your Account
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins mb-6">
        Enter the 4-digit verification code sent to your email
      </p>

      <form onSubmit={handleVerify} className="space-y-6 font-Poppins">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-11 h-12 sm:w-12 sm:h-14 text-center font-bold text-xl rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white outline-none focus:border-[#39c1f3] focus:ring-2 focus:ring-[#39c1f3]/30 transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-[#39c1f3] hover:bg-[#25addf] text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          Verify Code
        </button>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          {timer > 0 ? (
            <p>
              Resend code in{" "}
              <span className="text-[#39c1f3] font-semibold">{timer}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setTimer(60)}
              className="text-[#39c1f3] font-semibold hover:underline cursor-pointer"
            >
              Resend Code
            </button>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Back to{" "}
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

export default Verification;
