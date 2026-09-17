"use client";

import { RootState } from "@/app/redux/store";
import { redirect } from "next/dist/client/components/navigation";
import { useSelector } from "react-redux";

export default function AdminProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user) {
    const isAdmin = user?.role === "admin";

    return isAdmin ? <>{children}</> : redirect("/");
  }
}
