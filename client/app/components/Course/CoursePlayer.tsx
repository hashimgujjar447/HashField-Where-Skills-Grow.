"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import {
  HiOutlinePlay,
  HiOutlineCheckCircle,
  HiOutlineDownload,
  HiOutlineArrowLeft,
} from "react-icons/hi";

interface Props {
  courseId: string;
}

const CoursePlayer: React.FC<Props> = ({ courseId }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "qa" | "reviews" | "resources">("overview");
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [newQuestion, setNewQuestion] = useState("");
  const [newReview, setNewReview] = useState("");
  const [userRating, setUserRating] = useState(5);

  const sections = [
    {
      title: "Getting Started & Environment Setup",
      lessons: [
        { title: "Course Introduction & Roadmap", duration: "12:40", completed: true },
        { title: "Installing Dependencies & Tools", duration: "18:15", completed: true },
        { title: "Project Architecture & Directory Layout", duration: "24:00", completed: false },
        { title: "First Working Application", duration: "15:20", completed: false },
      ],
    },
    {
      title: "Core Concepts & Deep Dive",
      lessons: [
        { title: "State Management Paradigms", duration: "32:10", completed: false },
        { title: "API Integration & Async Workflows", duration: "28:45", completed: false },
        { title: "Error Handling & Resiliency Patterns", duration: "19:30", completed: false },
        { title: "Building Reusable Custom Hooks", duration: "22:15", completed: false },
      ],
    },
    {
      title: "Production Deployment & Scaling",
      lessons: [
        { title: "Performance Profiling & Optimization", duration: "26:50", completed: false },
        { title: "Containerizing with Docker", duration: "21:10", completed: false },
        { title: "CI/CD Pipeline Setup", duration: "17:40", completed: false },
        { title: "Deploying to Production Cloud", duration: "30:00", completed: false },
      ],
    },
  ];

  const currentLesson = sections[currentSectionIndex].lessons[currentLessonIndex];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white font-Poppins">
      <header className="h-16 px-4 sm:px-6 bg-gray-950 border-b border-gray-800 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/courses"
            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <HiOutlineArrowLeft size={16} />
            Back to Courses
          </Link>
          <div className="hidden sm:block h-5 w-px bg-gray-800"></div>
          <h1 className="text-sm font-semibold text-gray-200 truncate max-w-xs sm:max-w-md">
            Full-Stack Modern Development Mastery
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
            <span>Course Progress:</span>
            <div className="w-28 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="w-[35%] h-full bg-[#39c1f3] rounded-full"></div>
            </div>
            <span className="font-semibold text-white">35%</span>
          </div>

          <Link
            href="/profile"
            className="px-3 py-1.5 text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto bg-gray-900">
          <div className="relative w-full aspect-video bg-black flex items-center justify-center group">
            <div className="absolute inset-0 bg-radial from-transparent to-black/60"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#39c1f3]/90 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                <HiOutlinePlay size={38} className="ml-1.5" />
              </div>
              <p className="mt-4 text-xs font-medium text-gray-300">
                Playing: <span className="text-white font-semibold">{currentLesson.title}</span>
              </p>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center gap-3">
                <button className="hover:text-white cursor-pointer"><HiOutlinePlay size={20} /></button>
                <span>04:15 / {currentLesson.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-gray-800/80 px-2 py-0.5 rounded text-[10px]">1080p</span>
                <span className="bg-gray-800/80 px-2 py-0.5 rounded text-[10px]">1.0x</span>
              </div>
            </div>
          </div>

          <div className="p-6 max-w-4xl">
            <div className="flex items-center gap-6 border-b border-gray-800 pb-3 text-sm">
              {[
                { key: "overview", label: "Overview" },
                { key: "qa", label: "Q&A (12)" },
                { key: "reviews", label: "Reviews (4.9)" },
                { key: "resources", label: "Resources (4)" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`font-semibold pb-2 border-b-2 -mb-3 transition-colors cursor-pointer ${
                    activeTab === tab.key
                      ? "border-[#39c1f3] text-[#39c1f3]"
                      : "border-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-6 text-sm text-gray-300 space-y-4">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-Josefin font-bold text-white">
                    {currentLesson.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    In this lesson, we break down core architectural principles, dissect best practices for state lifecycle management, and establish scalable patterns for end-to-end type safety across the stack.
                  </p>
                  <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-800">
                    <h3 className="font-semibold text-white mb-2 text-xs uppercase tracking-wider">
                      Key Takeaways
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-400">
                      <li>Understand declarative vs imperative patterns in modern frameworks</li>
                      <li>Optimize re-renders using memoized selectors and stable references</li>
                      <li>Handle edge cases gracefully with comprehensive error boundary wrappers</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "qa" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-gray-800/60 border border-gray-800 space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                      Ask a Question
                    </h3>
                    <textarea
                      rows={3}
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Have a question or stuck on a bug? Ask here..."
                      className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-xs text-white placeholder:text-gray-500 outline-none focus:border-[#39c1f3]"
                    />
                    <button
                      type="button"
                      onClick={() => setNewQuestion("")}
                      className="px-4 py-2 bg-[#39c1f3] hover:bg-[#25addf] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      Post Question
                    </button>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        user: "Hamza Tariq",
                        time: "2 hours ago",
                        question: "How do we handle token expiry when the user is mid-action without losing form state?",
                        answer: "You can intercept 401s via your fetch wrapper, queue the failed request, trigger a silent refresh, and replay it transparently!",
                      },
                      {
                        user: "Aisha Rehman",
                        time: "1 day ago",
                        question: "Is it better to use Redis session store or stateless JWT for high concurrency?",
                        answer: "Hybrid approach! Short-lived JWT (15m) validated against Redis allows instant revocation while keeping verification lightning fast.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-gray-950 border border-gray-800/80 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white">{item.user}</span>
                          <span className="text-gray-500">{item.time}</span>
                        </div>
                        <p className="text-xs text-gray-300">{item.question}</p>
                        <div className="mt-2 pl-3 border-l-2 border-[#39c1f3] text-xs text-gray-400 bg-gray-900/50 p-2 rounded-r">
                          <span className="font-semibold text-[#39c1f3]">Instructor Reply: </span>
                          {item.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-gray-800/60 border border-gray-800 space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                      Rate this Course
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          className="cursor-pointer"
                        >
                          <AiFillStar size={20} className={star <= userRating ? "text-amber-400" : "text-gray-600"} />
                        </button>
                      ))}
                    </div>
                    <textarea
                      rows={2}
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder="Share your experience with other students..."
                      className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-xs text-white placeholder:text-gray-500 outline-none focus:border-[#39c1f3]"
                    />
                    <button
                      type="button"
                      onClick={() => setNewReview("")}
                      className="px-4 py-2 bg-[#39c1f3] hover:bg-[#25addf] text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: "Bilal Sheikh", rating: 5, comment: "Hands down the most practical, real-world course I have ever taken on this topic." },
                      { name: "Sana Farooq", rating: 5, comment: "The explanation of backend caching and Redis integration was crystal clear." },
                    ].map((rev, i) => (
                      <div key={i} className="p-4 rounded-xl bg-gray-950 border border-gray-800/80 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-white">{rev.name}</span>
                          <div className="flex text-amber-400">
                            {[...Array(rev.rating)].map((_, s) => (
                              <AiFillStar key={s} size={13} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "resources" && (
                <div className="space-y-3">
                  {[
                    { name: "Lesson Source Code (GitHub Repo)", size: "2.4 MB" },
                    { name: "System Architecture Diagram (PDF)", size: "840 KB" },
                    { name: "Database Schema & Migration Scripts", size: "120 KB" },
                  ].map((res, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-gray-800/40 border border-gray-800 hover:bg-gray-800/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <HiOutlineDownload className="text-[#39c1f3]" size={18} />
                        <div>
                          <p className="text-xs font-medium text-white">{res.name}</p>
                          <span className="text-[10px] text-gray-500">{res.size}</span>
                        </div>
                      </div>
                      <button className="text-xs text-[#39c1f3] hover:underline cursor-pointer">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-96 bg-gray-950 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col overflow-y-auto max-h-[500px] lg:max-h-none">
          <div className="p-4 border-b border-gray-800 bg-gray-900/60 sticky top-0 z-10">
            <h2 className="text-sm font-semibold text-white">Course Content</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {sections.reduce((acc, s) => acc + s.lessons.length, 0)} Lessons &bull; 14h 30m Total
            </p>
          </div>

          <div className="divide-y divide-gray-800/60">
            {sections.map((section, sIdx) => (
              <div key={sIdx} className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-900/30">
                  Section {sIdx + 1}: {section.title}
                </div>

                <div className="mt-1 space-y-0.5">
                  {section.lessons.map((lesson, lIdx) => {
                    const isCurrent = sIdx === currentSectionIndex && lIdx === currentLessonIndex;
                    return (
                      <button
                        key={lIdx}
                        onClick={() => {
                          setCurrentSectionIndex(sIdx);
                          setCurrentLessonIndex(lIdx);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors cursor-pointer ${
                          isCurrent
                            ? "bg-[#39c1f3]/15 border-l-4 border-[#39c1f3] text-white"
                            : "hover:bg-gray-900/70 text-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 pr-2">
                          {lesson.completed ? (
                            <HiOutlineCheckCircle className="text-emerald-400 shrink-0" size={16} />
                          ) : (
                            <HiOutlinePlay className={isCurrent ? "text-[#39c1f3] shrink-0" : "text-gray-500 shrink-0"} size={16} />
                          )}
                          <span className="text-xs font-medium line-clamp-1">{lesson.title}</span>
                        </div>
                        <span className="text-[11px] text-gray-500 shrink-0">{lesson.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;