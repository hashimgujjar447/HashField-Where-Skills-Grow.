"use client";

import { redirect } from "next/navigation";

import useAuth from "./useAuth";

export default function UseProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = useAuth();

  return <>{isAuth ? children : redirect("/login")}</>;
}
