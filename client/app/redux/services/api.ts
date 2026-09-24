import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setAccessToken, setUser } from "../features/auth/authSlice";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    credentials: "include",
  }),

  tagTypes: ["User", "Course", "Order", "Layout"],

  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "/refresh",
        method: "GET",
      }),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            setAccessToken({
              accessToken: result.data.accessToken,
            }),
          );
        } catch (error: unknown) {
          console.error("Failed to refresh token:", error);
        }
      },
    }),

    loadUser: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      providesTags: ["User"],

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            setUser({
              user: result.data.user,
            }),
          );
        } catch (error: unknown) {
          console.error("Failed to load user:", error);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = api;
