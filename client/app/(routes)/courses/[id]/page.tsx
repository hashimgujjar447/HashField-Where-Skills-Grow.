"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CourseDetails from "../../../components/Course/CourseDetails";
import Heading from "../../../utils/Heading";
import { useGetSingleCourseWithOutAuthQuery } from "@/app/redux/services/courseApi";
import {
  useGetStripePublishableKeyQuery,
  useNewPaymentMutation,
} from "@/app/redux/features/order/orderApi";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const CourseDetailPage = () => {
  const [open, setOpen] = useState(false);

  const params = useParams();

  const courseId = typeof params?.id === "string" ? params.id : "";

  const { data, isLoading, isError } = useGetSingleCourseWithOutAuthQuery(
    courseId,
    {
      skip: !courseId,
    },
  );

  const { data: stripeData, isLoading: stripeLoading } =
    useGetStripePublishableKeyQuery({});

  const [createPaymentIntent] = useNewPaymentMutation();

  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (stripeData?.stripePublishableKey) {
      setStripePromise(loadStripe(stripeData.stripePublishableKey));
    }
  }, [stripeData]);

  const handleCreatePaymentIntent = async (amount: number) => {
    try {
      const response = await createPaymentIntent({
        amount,
      }).unwrap();

      if (response?.client_secret) {
        setClientSecret(response.client_secret);
        return response.client_secret;
      }

      throw new Error("Payment client secret was not returned.");
    } catch (error) {
      throw error;
    }
  };

  if (isLoading || stripeLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#0b0f17]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#39c1f3]" />

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Loading course...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !data?.course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#0b0f17]">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            Course Not Found
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            The course could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const course = data.course;

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-[#0b0f17] dark:text-white">
      <Heading
        title={`${course.title} - ELearn`}
        description={course.description}
        keywords={course.tags.join(", ")}
      />

      <Header open={open} setOpen={setOpen} activeItem={1} />

      <main className="flex-1">
        <CourseDetails
          course={course}
          stripePromise={stripePromise}
          clientSecret={clientSecret}
          createPaymentIntent={handleCreatePaymentIntent}
        />
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailPage;
