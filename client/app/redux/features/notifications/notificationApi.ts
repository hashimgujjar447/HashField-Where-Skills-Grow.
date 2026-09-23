import { api } from "../../services/api";

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: "/get-all-notifications",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateNotificationReadStatus: builder.mutation({
      query: (notificationId: string) => ({
        url: `/update-notification-status/${notificationId}`,
        method: "PUT",
      }),
    }),
    markAllNotificationsAsRead: builder.mutation({
      query: () => ({
        url: "/update-all-notification",
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useUpdateNotificationReadStatusMutation,
  useMarkAllNotificationsAsReadMutation,
} = notificationApi;
