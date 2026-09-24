import { api } from "../../services/api";
import { setUser } from "../auth/authSlice";

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
      invalidatesTags: ["User", "Course"],
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          await queryFulfilled;
          const currentUser = (getState() as any).auth?.user;
          if (currentUser) {
            const alreadyHas = currentUser.courses?.some(
              (c: any) => String(c?.courseId || c?._id || c) === String(arg.courseId),
            );
            if (!alreadyHas) {
              const updatedCourses = [
                ...(currentUser.courses || []),
                { courseId: arg.courseId },
              ];
              dispatch(setUser({ user: { ...currentUser, courses: updatedCourses } }));
            }
          }
          dispatch(api.endpoints.loadUser.initiate({}, { forceRefetch: true }));
        } catch {}
      },
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
