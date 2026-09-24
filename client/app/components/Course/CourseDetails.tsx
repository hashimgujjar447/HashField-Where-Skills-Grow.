"use client";

import toast from "react-hot-toast";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import {
  HiOutlinePlay,
  HiOutlineGlobeAlt,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
} from "react-icons/hi";

import CourseContent from "./CourseContent";
import { ICourse } from "@/app/types/course";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Stripe } from "@stripe/stripe-js";
import { useCreateOrderMutation } from "@/app/redux/features/order/orderApi";
import { useRouter } from "next/navigation";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
interface Props {
  course: ICourse;
  clientSecret: string | null;
  stripePromise: Promise<Stripe | null> | null;
  createPaymentIntent: (amount: number) => Promise<string>;
}

interface PaymentFormProps {
  course: ICourse;
  clientSecret: string;
  onClose: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  course,
  clientSecret,
  onClose,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [
    createOrder,
    { isLoading: isOrderLoading, isSuccess: isOrderSuccess },
  ] = useCreateOrderMutation();

  const user = useSelector((state: RootState) => state.auth.user);

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (result.error) {
        setErrorMessage(
          result.error.message || "Payment failed. Please try again.",
        );

        setLoading(false);
        return;
      }

      if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        setSuccessMessage(
          "Payment successful! Your course enrollment will now be completed.",
        );
        await createOrder({
          courseId: course._id,
          payment_info: result.paymentIntent,
        });

        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error(error);

      setErrorMessage("Something went wrong while processing your payment.");
    }

    setLoading(false);
  };

  const router = useRouter();

  useEffect(() => {
    if (isOrderSuccess) {
      socketId.emit("notification", {
        title: "New Order",
        message: `A new order has been placed for the course: ${course.title}`,
        status: "unread",
        userId: user?._id || user?.id,
      });
      router.push(`/course-access/${course._id}`);
    }
  }, [isOrderSuccess, course._id, router, user]);

  return (
    <form onSubmit={handlePayment} className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Complete Your Purchase
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Secure payment for <span className="font-medium">{course.title}</span>
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-950/30 dark:text-green-400">
          {successMessage}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!stripe || !elements || loading}
          className="flex-1 rounded-xl bg-[#39c1f3] px-4 py-3 text-sm font-medium text-white shadow-md transition hover:bg-[#25addf] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay Rs. ${course.price}`}
        </button>
      </div>
    </form>
  );
};

const CourseDetails: React.FC<Props> = ({
  course,
  clientSecret,
  stripePromise,
  createPaymentIntent,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [open, setOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const discount =
    course.estimatedPrice && course.estimatedPrice > course.price
      ? Math.round(
          ((course.estimatedPrice - course.price) / course.estimatedPrice) *
            100,
        )
      : 0;

  const isEnrolled = user?.courses?.find(
    (c) => c?.courseId?.toString() === course._id?.toString(),
  );

  const handleOrderNow = async () => {
    if (!user) {
      toast.error("Please log in to enroll in this course.");
      return;
    }
    if (isEnrolled) {
      toast.error("You are already enrolled in this course.");
      return;
    }

    if (course.price === 0) {
      setOpen(true);
      return;
    }

    try {
      setPaymentLoading(true);
      const amount = Math.round(course.price * 100);
      await createPaymentIntent(amount);

      setOpen(true);
    } catch (error) {
      console.error("Failed to start payment:", error);
      toast.error("Unable to start payment. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 font-poppins sm:px-8 lg:px-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link href="/" className="transition hover:text-[#39c1f3]">
          Home
        </Link>

        <span>›</span>

        <Link href="/courses" className="transition hover:text-[#39c1f3]">
          Courses
        </Link>

        <span>›</span>

        <span className="max-w-xs truncate text-gray-900 dark:text-white">
          {course.title}
        </span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-8 lg:col-span-2">
          {/* Course Header */}
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {course.tags?.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full border border-[#39c1f3]/20 bg-[#39c1f3]/10 px-2.5 py-1 text-xs font-semibold text-[#39c1f3]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mb-4 font-josefin text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
              {course.title}
            </h1>

            <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              <div className="flex items-center gap-1 text-amber-500">
                <span className="font-bold">{course.ratings.toFixed(1)}</span>

                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, index) => (
                    <AiFillStar key={index} size={15} />
                  ))}
                </div>

                <span className="font-normal text-gray-500 dark:text-gray-400">
                  ({course.reviews.length} reviews)
                </span>
              </div>

              <span>•</span>

              <span>{course.purchased.toLocaleString()} students</span>

              <span>•</span>

              <span className="capitalize">{course.level}</span>

              <span>•</span>

              <div className="flex items-center gap-1">
                <HiOutlineGlobeAlt size={16} />
                <span>English</span>
              </div>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-6 dark:border-gray-800 dark:bg-[#1a1d2e]/60">
            <h2 className="mb-4 font-josefin text-lg font-bold text-gray-900 dark:text-white">
              What you&apos;ll learn
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {course.benefits?.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FaCheck className="mt-1 shrink-0 text-[#39c1f3]" size={13} />

                  <span className="text-xs leading-snug text-gray-700 dark:text-gray-300 sm:text-sm">
                    {benefit.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div>
            <h2 className="mb-4 font-josefin text-xl font-bold text-gray-900 dark:text-white">
              Course Curriculum
            </h2>

            <CourseContent courseData={course.courseData} />
          </div>

          {/* Requirements */}
          <div>
            <h2 className="mb-3 font-josefin text-xl font-bold text-gray-900 dark:text-white">
              Requirements
            </h2>

            <ul className="list-inside list-disc space-y-2 text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
              {course.prerequisites?.map((req, index) => (
                <li key={index}>{req.title}</li>
              ))}
            </ul>
          </div>

          {/* Course Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#1a1d2e]">
            <h2 className="mb-4 font-josefin text-xl font-bold text-gray-900 dark:text-white">
              Course Information
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Skill Level
                </p>

                <p className="mt-1 text-sm font-semibold capitalize text-gray-900 dark:text-white">
                  {course.level}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Total Students
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {course.purchased.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Rating
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {course.ratings.toFixed(1)} / 5
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Lessons
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {course.courseData?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-[#1a1d2e]">
            {/* Thumbnail */}
            <div
              className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-900"
              style={
                course.thumbnail
                  ? {
                      backgroundImage: `url(${course.thumbnail.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="relative z-10 text-center text-white">
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform hover:scale-110">
                  <HiOutlinePlay size={30} className="ml-1 text-white" />
                </div>

                <span className="text-xs font-semibold tracking-wide">
                  Preview this course
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-5 p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-josefin text-3xl font-bold text-gray-900 dark:text-white">
                  {course.price === 0 ? "Free" : `Rs. ${course.price}`}
                </span>

                {course.estimatedPrice &&
                  course.estimatedPrice > course.price && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        Rs. {course.estimatedPrice}
                      </span>

                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">
                        {discount}% OFF
                      </span>
                    </>
                  )}
              </div>

              {/* Buttons */}
              <div className="space-y-2.5">
                {isEnrolled ? (
                  <Link
                    href={`/course-access/${course._id}`}
                    className="flex w-full items-center justify-center rounded-xl bg-[#39c1f3] px-4 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-[#25addf] hover:shadow-lg"
                  >
                    Go to Course
                  </Link>
                ) : (
                  <button
                    onClick={handleOrderNow}
                    type="button"
                    disabled={paymentLoading}
                    className="flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-emerald-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {paymentLoading
                      ? "Preparing Payment..."
                      : course.price === 0
                        ? "Enroll for Free"
                        : "Enroll Now"}
                  </button>
                )}

                <button
                  type="button"
                  className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Add to Wishlist
                </button>
              </div>

              {/* Includes */}
              <div className="space-y-3 border-t border-gray-100 pt-4 text-xs text-gray-600 dark:border-gray-800 dark:text-gray-300">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                  This course includes:
                </p>

                <div className="flex items-center gap-3">
                  <HiOutlineClock className="text-[#39c1f3]" size={16} />
                  <span>On-demand video lessons</span>
                </div>

                <div className="flex items-center gap-3">
                  <HiOutlineDocumentText className="text-[#39c1f3]" size={16} />
                  <span>Course resources</span>
                </div>

                <div className="flex items-center gap-3">
                  <HiOutlineAcademicCap className="text-[#39c1f3]" size={16} />
                  <span>Certificate of completion</span>
                </div>

                <div className="flex items-center gap-3">
                  <HiOutlineShieldCheck className="text-[#39c1f3]" size={16} />
                  <span>Full course access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#1a1d2e]">
            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              ×
            </button>

            {course.price === 0 ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950/30">
                  ✓
                </div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Free Course
                </h2>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  You can enroll in this course for free.
                </p>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-6 rounded-xl bg-[#39c1f3] px-6 py-3 text-sm font-medium text-white hover:bg-[#25addf]"
                >
                  Continue
                </button>
              </div>
            ) : clientSecret && stripePromise ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                  },
                }}
              >
                <PaymentForm
                  course={course}
                  clientSecret={clientSecret}
                  onClose={() => setOpen(false)}
                />
              </Elements>
            ) : (
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#39c1f3]" />

                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Preparing secure payment
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Please wait...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
