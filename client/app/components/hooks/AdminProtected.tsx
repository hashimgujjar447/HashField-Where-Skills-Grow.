"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

export default function AdminProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!user || !isAdmin) {
      router.replace("/");
    }
  }, [user, isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
