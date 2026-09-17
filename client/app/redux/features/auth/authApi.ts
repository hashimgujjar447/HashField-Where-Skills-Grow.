import { api } from "../../services/api";
import {
  userRegistration,
  userLoggedIn,
  userLoggedOut,
  setUser,
} from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  name: string;
  email: string;
  password: string;
};

type ActivationData = {
  activation_token: string;
  activation_code: string;
};

type ActivationResponse = {
  success: boolean;
  message: string;
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userRegistration({
              token: result.data.activationToken,
            }),
          );
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),

    activation: builder.mutation<ActivationResponse, ActivationData>({
      query: (data) => ({
        url: "/activate",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: "/update-password",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            }),
          );
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(userLoggedOut());
          dispatch(api.util.resetApiState());
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),

    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: "/update-user-info",
        method: "PUT",
        body: data,
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser({ user: result.data.user }));
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),

    updateUserAvatar: builder.mutation({
      query: (data) => ({
        url: "/update-user-avatar",
        method: "PUT",
        body: data,
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser({ user: result.data.user }));
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),

    socialAuth: builder.mutation({
      query: (data) => ({
        url: "/socialAuth",
        method: "POST",
        body: data,
        credentials: "include",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            }),
          );
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserInfoMutation,
  useUpdateUserAvatarMutation,
  useSocialAuthMutation,
  useUpdateUserPasswordMutation,
} = authApi;
