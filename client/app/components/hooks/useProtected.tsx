"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "./useAuth";

export default function UseProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/");
    }
  }, [isAuth, router]);

  // While unauthenticated render nothing — Custom.tsx Loader already handles
  // the loading state, so by the time UseProtected renders, auth is resolved.
  if (!isAuth) return null;

  return <>{children}</>;
}
