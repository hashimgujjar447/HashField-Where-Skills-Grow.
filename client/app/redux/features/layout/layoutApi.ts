import { api } from "../../services/api";

const layoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `/get-layout/${type}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    editLayout: builder.mutation({
      query: (payload) => ({
        url: "/edit-layout",
        method: "PUT",
        body: payload,
        credentials: "include",
      }),
    }),
    getFaqsData: builder.query({
      query: (type) => ({
        url: `/get-layout/${type}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    editFaqs: builder.mutation({
      query: (payload) => ({
        url: "/edit-layout",
        method: "PUT",
        body: payload,
        credentials: "include",
      }),
    }),
    getCategoriesData: builder.query({
      query: (type) => ({
        url: `/get-layout/${type}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    editCategories: builder.mutation({
      query: (payload) => ({
        url: "/edit-layout",
        method: "PUT",
        body: payload,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetHeroDataQuery,
  useEditLayoutMutation,
  useGetFaqsDataQuery,
  useEditFaqsMutation,
  useGetCategoriesDataQuery,
  useEditCategoriesMutation,
} = layoutApi;
