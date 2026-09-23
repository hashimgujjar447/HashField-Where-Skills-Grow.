"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { useGetHeroDataQuery } from "@/app/redux/features/layout/layoutApi";

const Hero = () => {
  const { data } = useGetHeroDataQuery("banner");

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#0b0f17]">
      <div className="mx-auto flex min-h-[500px] w-full max-w-[1500px] items-center px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <h1 className="w-full font-Josefin text-[32px] font-[600] leading-[1.15] text-[#000] dark:text-white sm:text-[44px] lg:text-[52px]">
              {data?.layout?.banner?.title}
            </h1>

            <p className="mt-5 max-w-[600px] font-Josefin text-[15px] font-[500] leading-7 text-[#000000ac] dark:text-[#edfff4] sm:text-[17px]">
              {data?.layout?.banner?.subtitle}
            </p>

            <div className="relative mt-8 h-[52px] w-full max-w-[600px]">
              <input
                type="search"
                placeholder="Search Courses..."
                className="h-full w-full rounded-[5px] border-none bg-[#eeeeee] px-5 pr-[60px] font-Josefin text-[15px] text-[#222] outline-none placeholder:text-[#777] dark:bg-[#575757] dark:text-white dark:placeholder:text-[#ffffffdd]"
              />
              <button
                type="button"
                aria-label="Search courses"
                className="absolute right-0 top-0 flex h-[52px] w-[52px] items-center justify-center rounded-r-[5px] bg-[#39c1f3] transition hover:bg-[#25addf]"
              >
                <BiSearch className="text-[26px] text-white" />
              </button>
            </div>

            <p className="mt-6 font-Josefin text-[14px] font-[600] text-[#222] dark:text-[#edfff4]">
              500K+ People already trusted us.{" "}
              <Link href="/courses" className="text-[#39c1f3] hover:underline">
                View Courses
              </Link>
            </p>
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="hero_animation relative flex h-[260px] w-[260px] items-center justify-center rounded-full sm:h-[370px] sm:w-[370px] lg:h-[430px] lg:w-[430px]">
              <Image
                src={data?.layout?.banner?.image?.url || "/assets/hero-placeholder.png"}
                alt="Online learning"
                fill
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 370px, 430px"
                className="z-[1] rounded-full object-contain p-5 sm:p-8 lg:p-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
