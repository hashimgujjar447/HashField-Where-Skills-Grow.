"use client";

import React from "react";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { HiOutlineUsers, HiOutlinePlay } from "react-icons/hi";

export interface CourseCardProps {
  id: string;
  title: string;
  rating: number;
  students: number;
  price: number;
  originalPrice?: number;
  level: string;
  tags: string[];
  thumbnail?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  rating,
  students,
  price,
  originalPrice,
  level,
  tags,
  thumbnail,
}) => {
  const getLevelBadgeClass = () => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "intermediate":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "advanced":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      default:
        return "bg-[#39c1f3]/10 text-[#39c1f3] border-[#39c1f3]/20";
    }
  };

  return (
    <Link
      href={`/courses/${id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-gray-800 dark:bg-[#1a1d2e]"
    >
      <div
        className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-gray-200 p-6 dark:bg-gray-800"
        style={
          thumbnail
            ? {
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {!thumbnail && (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            <HiOutlinePlay size={28} className="ml-1" />
          </div>
        )}

        <span
          className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md ${getLevelBadgeClass()}`}
        >
          {level}
        </span>

        {tags.length > 0 && (
          <span className="absolute right-3 top-3 rounded bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-md">
            {tags[0]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 font-poppins">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover:text-[#39c1f3] dark:text-white">
          {title}
        </h3>

        <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-amber-500">
              {rating.toFixed(1)}
            </span>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(rating)
                      ? "text-amber-400"
                      : "text-gray-300 dark:text-gray-700"
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <HiOutlineUsers size={15} />
            <span>{students.toLocaleString()} students</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {price === 0 ? "Free" : `$${price}`}
            </span>

            {originalPrice && originalPrice > price && (
              <span className="ml-2 text-xs text-gray-400 line-through">
                ${originalPrice}
              </span>
            )}
          </div>

          <span className="inline-flex items-center text-xs font-semibold text-[#39c1f3] transition-transform group-hover:translate-x-1">
            Enroll Now &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
