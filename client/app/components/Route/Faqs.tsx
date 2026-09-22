"use client";

import { useGetFaqsDataQuery } from "@/app/redux/features/layout/layoutApi";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

type Props = {};

const Faqs = (props: Props) => {
  const { data, isLoading } = useGetFaqsDataQuery("faqs");

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (isLoading) {
    return (
      <section className="w-full py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mx-auto h-8 w-64 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="mx-auto mt-4 h-4 w-96 max-w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-16 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const faqs = data?.layout?.faqs || [];

  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-blue-600">
            FAQ
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Find answers to the most common questions about our courses,
            purchases, access, certificates, and learning experience.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map(
            (
              faq: {
                question: string;
                answer: string;
                _id: string;
              },
              index: number,
            ) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq._id}
                  className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                    isOpen
                      ? "border-blue-500 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/20"
                      : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span
                      className={`text-base font-semibold md:text-lg ${
                        isOpen
                          ? "text-blue-600"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <FiChevronDown
                      className={`shrink-0 text-xl transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-blue-600" : "text-gray-500"
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 leading-7 text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>

        {/* Empty State */}
        {faqs.length === 0 && (
          <div className="rounded-xl border border-gray-200 py-12 text-center dark:border-gray-800">
            <p className="text-gray-500">
              No frequently asked questions available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Faqs;
