"use client";

import React, { ReactNode } from "react";
import Loader from "./Loader";
import { useRefreshTokenQuery, useLoadUserQuery } from "../redux/services/api";

interface CustomProps {
  children: ReactNode;
}

const Custom: React.FC<CustomProps> = ({ children }) => {
  const { isLoading: isRefreshing } = useRefreshTokenQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );

  const { isLoading: isLoadingUser } = useLoadUserQuery(
    {},
    {
      skip: isRefreshing,
      refetchOnMountOrArgChange: true,
    },
  );

  const isLoading = isRefreshing || isLoadingUser;

  return isLoading ? <Loader /> : <>{children}</>;
};

export default Custom;
