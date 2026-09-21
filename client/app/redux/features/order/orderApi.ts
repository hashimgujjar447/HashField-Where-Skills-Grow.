import { api } from "../../services/api";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/get-orders",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery } = orderApi;
