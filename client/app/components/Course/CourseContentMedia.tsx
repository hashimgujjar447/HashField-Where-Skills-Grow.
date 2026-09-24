"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronDown,
  PlayCircle,
  Clock,
  Star,
  MessageSquare,
  Send,
} from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { ICourseData, IQuestion } from "@/app/types/course";
import {
  useAddQuestionMutation,
  useAddQuestionAnswerMutation,
  useAddReviewMutation,
  useGetCourseContentQuery,
  useGetAllCourseReviewsQuery,
} from "@/app/redux/services/courseApi";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type CourseContentBySection = Record<string, ICourseData[]>;
type Tab = "overview" | "resources" | "questions" | "reviews";

interface Props {
  data: CourseContentBySection;
  id: string;
  activeVideo: number;
  setActiveVideo: (index: number) => void;
}

function formatLength(minutes: number): string {
  if (!minutes || isNaN(minutes)) return "";
  if (minutes < 60) return `${minutes}m`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function Avatar({
  src,
  name,
  size = 36,
}: {
  src?: string;
  name?: string;
  size?: number;
}) {
  const initials = name?.charAt(0)?.toUpperCase() ?? "U";
  return src ? (
    <img
      src={src}
      alt={name ?? "user"}
      className="rounded-full object-cover shrink-0"
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-[#39c1f3] font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              star <= (hovered || value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

const CourseContentMedia: React.FC<Props> = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
}) => {
  const allLectures = useMemo<ICourseData[]>(
    () => Object.values(data).flat(),
    [data],
  );
  const sections = useMemo(() => Object.entries(data), [data]);
  const { data: courseReviews } = useGetAllCourseReviewsQuery(id);

  const user = useSelector((state: RootState) => state.auth.user);
  const avatarUrl =
    typeof user?.avatar === "object" ? user?.avatar?.url : user?.avatar;

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => {
      const init: Record<string, boolean> = {};
      sections.forEach(([name]) => {
        init[name] = true;
      });
      return init;
    },
  );

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [newQuestion, setNewQuestion] = useState("");
  const [openReplyFor, setOpenReplyFor] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");

  const [addQuestion, { isLoading: qSubmitting }] = useAddQuestionMutation();
  const [addQuestionAnswer, { isLoading: rSubmitting }] =
    useAddQuestionAnswerMutation();
  const [addReview, { isLoading: revSubmitting }] = useAddReviewMutation();
  const { refetch } = useGetCourseContentQuery(id);

  const activeLecture = allLectures[activeVideo];

  const goToNext = () => {
    if (activeVideo < allLectures.length - 1) setActiveVideo(activeVideo + 1);
  };

  const handleSubmitQuestion = async () => {
    if (!newQuestion.trim() || !activeLecture) return;
    await addQuestion({
      question: newQuestion.trim(),
      courseId: id,
      contentId: activeLecture._id,
    });
    setNewQuestion("");
    refetch();
  };

  const handleSubmitReply = async (questionId: string) => {
    const text = replyText[questionId]?.trim();
    if (!text || !activeLecture) return;
    await addQuestionAnswer({
      question: text,
      courseId: id,
      contentId: activeLecture._id,
      questionId,
    });
    setReplyText((prev) => ({ ...prev, [questionId]: "" }));
    setOpenReplyFor(null);
    refetch();
  };

  const handleSubmitReview = async () => {
    if (!reviewText.trim()) return;

    const isReviewAlreadyExist = courseReviews?.reviews.some(
      (r) => r.user === user?._id,
    );

    if (isReviewAlreadyExist) {
      toast.error("Review already exist");
      return;
    }

    await addReview({ courseId: id, review: reviewText.trim(), rating });
    setReviewText("");
    setRating(1);
  };

  useEffect(() => {
    if (qSubmitting) {
      socketId.emit("notification", {
        title: "New Question",
        message: `A new question has been asked in the course: ${activeLecture?.title}`,
        status: "unread",
        userId: user?._id,
      });
    }
    if (rSubmitting) {
      socketId.emit("notification", {
        title: "New Reply",
        message: `A new reply has been added to a question in the course: ${activeLecture?.title}`,
        status: "unread",
        userId: user?._id,
      });
    }

    if (revSubmitting) {
      socketId.emit("notification", {
        title: "New Review",
        message: `A new review has been added in the course: ${activeLecture?.title}`,
        status: "unread",
        userId: user?._id,
      });
    }
  }, [qSubmitting, rSubmitting, revSubmitting, socketId]);

  if (!activeLecture) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0f1c] text-sm text-gray-400">
        No content available.
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "resources", label: "Resources" },
    { key: "questions", label: "Q&A" },
    { key: "reviews", label: "Reviews" },
  ];

  const sectionTotal = (lectures: ICourseData[]) => {
    const total = lectures.reduce((acc, l) => acc + (l.videoLength || 0), 0);
    return formatLength(total);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0f1c] lg:flex-row">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="w-full bg-black">
          <VideoPlayer
            key={activeLecture._id}
            videoUrl={activeLecture.videoUrl}
            title={activeLecture.title}
            onEnded={goToNext}
          />
        </div>

        <div className="px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              disabled={activeVideo === 0}
              onClick={() => setActiveVideo(activeVideo - 1)}
              className="flex items-center gap-1.5 rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Prev Lesson
            </button>
            <button
              disabled={activeVideo === allLectures.length - 1}
              onClick={goToNext}
              className="flex items-center gap-1.5 rounded-md bg-[#39c1f3] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2ab0e0] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next Lesson →
            </button>
          </div>

          <h1 className="mt-4 text-lg font-bold text-white sm:text-xl">
            {activeLecture.title}
          </h1>

          <div className="mt-5 border-b border-gray-800">
            <div className="flex gap-0 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`shrink-0 px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "border-b-2 border-[#39c1f3] text-[#39c1f3]"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="py-5">
            {activeTab === "overview" && (
              <p className="text-sm leading-relaxed text-gray-300">
                {activeLecture.description}
              </p>
            )}

            {activeTab === "resources" && (
              <div className="space-y-2">
                {activeLecture.links && activeLecture.links.length > 0 ? (
                  activeLecture.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-gray-800 bg-[#111827] p-4 text-sm transition hover:border-[#39c1f3]/50"
                    >
                      <span className="text-[#39c1f3]">🔗</span>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-200">
                          {link.title || "Resource"}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {link.url}
                        </p>
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No resources for this lecture.
                  </p>
                )}
              </div>
            )}

            {activeTab === "questions" && (
              <div className="space-y-6">
                <div className="flex gap-3">
                  <Avatar src={avatarUrl} name={user?.name} size={40} />
                  <div className="flex-1">
                    <textarea
                      rows={4}
                      placeholder="Write your question…"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="w-full rounded-lg border border-gray-700 bg-[#111827] px-4 py-3 text-sm text-gray-200 outline-none transition placeholder:text-gray-500 focus:border-[#39c1f3]"
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={handleSubmitQuestion}
                        disabled={qSubmitting || !newQuestion.trim()}
                        className="rounded-lg bg-[#39c1f3] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2ab0e0] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {qSubmitting ? "Submitting…" : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {activeLecture.questions &&
                  activeLecture.questions.length > 0 ? (
                    activeLecture.questions.map((q: IQuestion) => (
                      <div key={q._id} className="flex gap-3">
                        <Avatar name="User" size={38} />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-200">
                            Student
                          </p>
                          <p className="mt-0.5 text-sm text-gray-300">
                            {q.question}
                          </p>
                          <div className="mt-2 flex items-center gap-3">
                            <button
                              onClick={() =>
                                setOpenReplyFor(
                                  openReplyFor === q._id
                                    ? null
                                    : (q._id ?? null),
                                )
                              }
                              className="text-xs text-gray-400 transition hover:text-[#39c1f3]"
                            >
                              Add Reply
                            </button>
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <MessageSquare className="h-3.5 w-3.5" />
                              {q.questionReplies.length}
                            </span>
                          </div>

                          {q.questionReplies.length > 0 && (
                            <div className="mt-3 space-y-3 border-l-2 border-gray-800 pl-4">
                              {q.questionReplies.map((reply, i) => (
                                <div key={i} className="flex gap-2">
                                  <Avatar name="U" size={28} />
                                  <p className="text-sm text-gray-400">
                                    {reply.comment}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {openReplyFor === q._id && (
                            <div className="mt-3 flex gap-2">
                              <input
                                type="text"
                                placeholder="Write a reply…"
                                value={replyText[q._id ?? ""] ?? ""}
                                onChange={(e) =>
                                  setReplyText((prev) => ({
                                    ...prev,
                                    [q._id ?? ""]: e.target.value,
                                  }))
                                }
                                onKeyDown={(e) =>
                                  e.key === "Enter" &&
                                  q._id &&
                                  handleSubmitReply(q._id)
                                }
                                className="flex-1 rounded-lg border border-gray-700 bg-[#111827] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#39c1f3]"
                              />
                              <button
                                onClick={() =>
                                  q._id && handleSubmitReply(q._id)
                                }
                                disabled={
                                  rSubmitting || !replyText[q._id ?? ""]?.trim()
                                }
                                className="flex items-center gap-1.5 rounded-lg bg-[#39c1f3] px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
                              >
                                <Send className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No questions yet. Be the first to ask!
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-5">
                <div className="flex gap-3">
                  <Avatar src={avatarUrl} name={user?.name} size={40} />

                  <div className="flex-1">
                    <p className="mb-2 text-sm font-medium text-gray-200">
                      Give a Rating <span className="text-red-400">*</span>
                    </p>

                    <StarRating value={rating} onChange={setRating} />

                    <textarea
                      rows={4}
                      placeholder="Write your comment…"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="mt-3 w-full rounded-lg border border-gray-700 bg-[#111827] px-4 py-3 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-[#39c1f3]"
                    />

                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={handleSubmitReview}
                        disabled={revSubmitting || !reviewText.trim()}
                        className="rounded-lg bg-[#39c1f3] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2ab0e0] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {revSubmitting ? "Submitting…" : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>

                {courseReviews && courseReviews?.reviews?.length > 0 ? (
                  <div className="space-y-5">
                    {courseReviews?.reviews?.map((review) => (
                      <div key={review._id} className="flex gap-3">
                        <Avatar name="U" size={38} />

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-gray-200">
                              {review.user?.name || "Student"}
                            </p>

                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <p className="mt-1 text-sm text-gray-300">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No reviews yet. Be the first to review!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <aside className="w-full shrink-0 border-t border-gray-800 bg-[#0d1117] lg:w-72 lg:border-l lg:border-t-0 xl:w-80">
        <div className="sticky top-0 z-10 border-b border-gray-800 bg-[#0d1117] px-4 py-3">
          <h2 className="text-sm font-bold text-white">Course Content</h2>
        </div>

        <div className="overflow-y-auto lg:max-h-[calc(100vh-53px)]">
          {sections.map(([sectionName, lectures]) => {
            const isOpen = openSections[sectionName];
            const sectionStartIdx = allLectures.findIndex(
              (l) => l.videoSection === sectionName,
            );
            const totalTime = sectionTotal(lectures);

            return (
              <div key={sectionName} className="border-b border-gray-800">
                <button
                  type="button"
                  onClick={() =>
                    setOpenSections((prev) => ({
                      ...prev,
                      [sectionName]: !prev[sectionName],
                    }))
                  }
                  className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left hover:bg-gray-800/50"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {sectionName}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {lectures.length}{" "}
                      {lectures.length === 1 ? "Lesson" : "Lessons"}
                      {totalTime && ` · ${totalTime}`}
                    </p>
                  </div>
                  <ChevronDown
                    className={`mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <ul className="pb-1">
                    {lectures.map((lecture, i) => {
                      const globalIdx = sectionStartIdx + i;
                      const isActive = globalIdx === activeVideo;
                      return (
                        <li key={lecture._id}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveVideo(globalIdx);
                              setActiveTab("overview");
                            }}
                            className={`flex w-full items-start gap-3 px-4 py-3 text-left transition ${
                              isActive
                                ? "bg-[#39c1f3]/10"
                                : "hover:bg-gray-800/40"
                            }`}
                          >
                            <PlayCircle
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                isActive ? "text-[#39c1f3]" : "text-gray-500"
                              }`}
                            />
                            <div className="min-w-0 flex-1">
                              <p
                                className={`text-sm leading-snug ${isActive ? "font-medium text-[#39c1f3]" : "text-gray-300"}`}
                              >
                                {lecture.title}
                              </p>
                              {lecture.videoLength > 0 && (
                                <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="h-3 w-3" />
                                  {formatLength(lecture.videoLength)}
                                </p>
                              )}
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default CourseContentMedia;
