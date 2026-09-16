"use client";

import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

export default function useAuth() {
  const { user } = useSelector((state: RootState) => state.auth);

  return !!user;
}
