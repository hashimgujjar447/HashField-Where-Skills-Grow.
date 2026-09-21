"use client";

import {
  useEditFaqsMutation,
  useGetFaqsDataQuery,
} from "@/app/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Plus,
  Trash2,
  Save,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";

type FAQ = {
  _id?: string;
  question: string;
  answer: string;
};

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, isError } = useGetFaqsDataQuery("faqs", {
    refetchOnMountOrArgChange: true,
  });

  const [editFaqs, { isLoading: isEditing }] = useEditFaqsMutation();

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (data?.layout?.faqs) {
      setFaqs(
        data.layout.faqs.map((faq: FAQ) => ({
          _id: faq._id,
          question: faq.question || "",
          answer: faq.answer || "",
        })),
      );
    }
  }, [data]);

  const updateFaq = (index: number, field: keyof FAQ, value: string) => {
    const updatedFaqs = [...faqs];

    updatedFaqs[index] = {
      ...updatedFaqs[index],
      [field]: value,
    };

    setFaqs(updatedFaqs);
  };

  const addFaq = () => {
    const newFaq: FAQ = {
      question: "",
      answer: "",
    };

    setFaqs([...faqs, newFaq]);
    setOpenIndex(faqs.length);
  };

  const removeFaq = (index: number) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);

    setFaqs(updatedFaqs);

    if (openIndex === index) {
      setOpenIndex(null);
    } else if (openIndex !== null && openIndex > index) {
      setOpenIndex(openIndex - 1);
    }
  };

  const handleSave = async () => {
    const hasEmptyFaq = faqs.some(
      (faq) => !faq.question.trim() || !faq.answer.trim(),
    );

    if (hasEmptyFaq) {
      toast.error("Please fill in all FAQ questions and answers.");
      return;
    }

    try {
      const payload = {
        type: "faqs",
        faqs: faqs.map((faq) => ({
          ...(faq._id && { _id: faq._id }),
          question: faq.question.trim(),
          answer: faq.answer.trim(),
        })),
      };

      await editFaqs(payload).unwrap();

      toast.success("FAQs updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update FAQs");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          Failed to load FAQs.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Edit FAQs
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage frequently asked questions for your website.
          </p>
        </div>

        <button
          type="button"
          onClick={addFaq}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqs.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-[#101a30]">
            <HelpCircle
              size={40}
              className="mb-3 text-slate-300 dark:text-slate-600"
            />

            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              No FAQs yet
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Add your first frequently asked question.
            </p>

            <button
              type="button"
              onClick={addFaq}
              className="mt-4 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <Plus size={16} />
              Add FAQ
            </button>
          </div>
        ) : (
          faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq._id || `new-${index}`}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-[#101a30]"
              >
                <div className="flex items-center gap-3 px-4 py-4 sm:px-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                    {index + 1}
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <span className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                      {faq.question || "New FAQ"}
                    </span>

                    {isOpen ? (
                      <ChevronUp
                        size={18}
                        className="ml-auto shrink-0 text-slate-400"
                      />
                    ) : (
                      <ChevronDown
                        size={18}
                        className="ml-auto shrink-0 text-slate-400"
                      />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                    title="Delete FAQ"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                {isOpen && (
                  <div className="space-y-5 border-t border-slate-100 p-4 dark:border-slate-700 sm:p-5">
                    <div>
                      <label
                        htmlFor={`question-${index}`}
                        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                      >
                        Question
                      </label>

                      <input
                        id={`question-${index}`}
                        type="text"
                        value={faq.question}
                        onChange={(e) =>
                          updateFaq(index, "question", e.target.value)
                        }
                        placeholder="How can I purchase a course?"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-[#0b1428] dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`answer-${index}`}
                        className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
                      >
                        Answer
                      </label>

                      <textarea
                        id={`answer-${index}`}
                        value={faq.answer}
                        onChange={(e) =>
                          updateFaq(index, "answer", e.target.value)
                        }
                        rows={4}
                        placeholder="Enter the answer..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-[#0b1428] dark:text-white dark:placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {faqs.length > 0 && (
        <div className="flex justify-end border-t border-slate-200 pt-5 dark:border-slate-700">
          <button
            type="button"
            onClick={handleSave}
            disabled={isEditing}
            className="flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isEditing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save FAQs
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditFaq;
