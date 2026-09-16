"use client";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";

export default function UseProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSelector((state: RootState) => state.auth);

  return user ? <>{children}</> : redirect("/");
}
