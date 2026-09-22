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
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "/stripe-publishable-key",
        method: "GET",
        credentials: "include",
      }),
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/create-order",
        method: "POST",
        body: orderData,
        credentials: "include",
      }),
    }),
    newPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payment",
        method: "POST",
        body: paymentData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetStripePublishableKeyQuery,
  useCreateOrderMutation,
  useNewPaymentMutation,
} = orderApi;
