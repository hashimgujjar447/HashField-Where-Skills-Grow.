"use client";

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#0b0f17]">
      <div className="mx-auto flex min-h-[500px] w-full max-w-[1500px] items-center px-5 py-5 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* ================= IMAGE ================= */}
          <div className="flex items-center justify-center">
            <div
              className="
    hero_animation
    relative
    flex
    h-[350px]
    w-[350px]
    items-center
    justify-center
    rounded-full
    sm:h-[430px]
    sm:w-[430px]
  "
            >
              <Image
                src="/assets/hero-placeholder.png"
                alt="Online learning"
                fill
                priority
                sizes="
      (max-width: 640px) 350px,
      (max-width: 1024px) 430px,
      500px
    "
                className="
      z-[1]
      rounded-full
      object-contain
      p-5
      sm:p-8
      lg:p-10
    "
              />
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1
              className="
                w-full
                font-Josefin
                text-[38px]
                font-[600]
                leading-[1.15]
                text-[#000]
                dark:text-white
                sm:text-[48px]
              
           
              "
            >
              Improve Your Online
              <br />
              Learning Experience
              <br />
              Better Instantly
            </h1>

            <p
              className="
                mt-7
                max-w-[650px]
                font-Josefin
                text-[16px]
                font-[500]
                leading-7
                text-[#000000ac]
                dark:text-[#edfff4]
                sm:text-[17px]
           
              "
            >
              We have 40k+ Online courses & 500K+ Online registered student.
              Find your desired Courses from them.
            </p>

            {/* Search */}
            <div className="relative mt-8 h-[54px] w-full max-w-[650px]">
              <input
                type="search"
                placeholder="Search Courses..."
                className="
                  h-full
                  w-full
                  rounded-[5px]
                  border-none
                  bg-[#eeeeee]
                  px-5
                  pr-[60px]
                  font-Josefin
                  text-[16px]
                  text-[#222]
                  outline-none
                  placeholder:text-[#777]
                  dark:bg-[#575757]
                  dark:text-white
                  dark:placeholder:text-[#ffffffdd]
                "
              />

              <button
                type="button"
                aria-label="Search courses"
                className="
                  absolute
                  right-0
                  top-0
                  flex
                  h-[54px]
                  w-[54px]
                  items-center
                  justify-center
                  rounded-r-[5px]
                  bg-[#39c1f3]
                  transition
                  hover:bg-[#25addf]
                "
              >
                <BiSearch className="text-[29px] text-white" />
              </button>
            </div>

            {/* Trusted users */}
            <div className="mt-8 flex items-center gap-3">
              <p className="font-Josefin text-[15px] font-[600] text-[#222] dark:text-[#edfff4]">
                500K+ People already trusted us.
                <Link
                  href="/courses"
                  className="ml-1 text-[#39c1f3] hover:underline"
                >
                  View Courses
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
