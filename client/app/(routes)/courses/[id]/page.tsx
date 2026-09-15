"use client";

import React, { useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CourseDetails, { CourseDetailType } from "../../../components/Course/CourseDetails";
import Heading from "../../../utils/Heading";

const sampleCourse: CourseDetailType = {
  id: "1",
  title: "Complete Modern React & Next.js 16 Full-Stack Mastery",
  description:
    "Master the absolute latest Next.js 16 features, App Router architecture, Server Actions, TypeScript integration, Tailwind v4 styling, and end-to-end full stack architecture.",
  instructor: "Ahmad Ali",
  instructorTitle: "Principal Full-Stack Architect & Educator",
  instructorBio:
    "Ahmad has mentored over 40,000 developers across the globe. He specializes in distributed web platforms, high-performance frontend engineering, and clean architecture.",
  rating: 4.9,
  reviewsCount: 482,
  students: 14200,
  price: 49,
  originalPrice: 129,
  level: "Intermediate",
  language: "English",
  lastUpdated: "September 2026",
  tags: ["React", "Next.js", "TypeScript", "TailwindCSS"],
  benefits: [
    "Build ultra-fast, production-ready applications with Next.js 16 App Router",
    "Master Server Components, Client Components, and Streaming SSR",
    "Implement bulletproof Authentication with JWT, Refresh Tokens, and Cookies",
    "Integrate MongoDB, Mongoose, and Redis Caching for ultra-fast response times",
    "Design reactive UIs with Tailwind CSS v4 and class-based dark mode",
    "Deploy scalable cloud infrastructure with automated CI/CD pipelines",
  ],
  prerequisites: [
    "Basic knowledge of JavaScript (ES6+ features like async/await, destructuring)",
    "Familiarity with HTML, CSS, and general web browsing fundamentals",
    "A computer with Node.js installed and a modern code editor (VS Code)",
  ],
  courseData: [
    {
      title: "Introduction & Architecture Walkthrough",
      lessons: [
        { title: "Welcome to the Course & Project Roadmap", duration: "10:25", isPreview: true },
        { title: "Setting up Node.js, TypeScript & Next.js 16", duration: "16:40", isPreview: true },
        { title: "Folder Structure & Configuration Essentials", duration: "14:15", isPreview: false },
      ],
    },
    {
      title: "Modern UI Building with Tailwind v4 & Layouts",
      lessons: [
        { title: "Tailwind v4 Theme Configuration & CSS Custom Properties", duration: "22:30", isPreview: false },
        { title: "Class-based Dark Mode & Theme Switcher Setup", duration: "18:50", isPreview: false },
        { title: "Crafting Responsive Navbars & Sidebars", duration: "25:10", isPreview: false },
      ],
    },
    {
      title: "Backend API Design, Authentication & Security",
      lessons: [
        { title: "Designing Secure REST Endpoints with Express & Mongoose", duration: "30:45", isPreview: false },
        { title: "JWT Access & Refresh Token Rotation with Redis Session Storage", duration: "35:20", isPreview: false },
        { title: "Handling Cloud File Uploads with Cloudinary", duration: "21:15", isPreview: false },
      ],
    },
  ],
};

const CourseDetailPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-gray-900 dark:text-white">
      <Heading
        title={`${sampleCourse.title} - ELearn`}
        description={sampleCourse.description}
        keywords="react, nextjs, typescript, fullstack course"
      />

      <Header open={open} setOpen={setOpen} activeItem={1} />

      <main className="flex-1">
        <CourseDetails course={sampleCourse} />
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailPage;