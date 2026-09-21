import { api } from "../../services/api";

const analyticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourseAnalytics: builder.query({
      query: () => ({
        url: `/get-courses-analytics`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetCourseAnalyticsQuery } = analyticsApi;
