"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Stats from "./components/Route/Stats";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import Footer from "./components/Footer";
import CustomModel from "./utils/CustomModel";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Verification from "./components/Auth/Verification";
import Faqs from "./components/Route/Faqs";

interface Props {
  title?: string;
}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-gray-900 dark:text-white transition-colors duration-300">
      <Heading
        title="HashField — Where Skills Grow | Online Learning Platform"
        description="Explore expert-led courses on technology, development, data science, and design. Learn at your own pace with HashField."
        keywords="hashfield, lms, elearning, nextjs, react, typescript, programming, online courses"
      />

      <Header open={open} setOpen={setOpen} activeItem={activeItem} />

      <main className="flex-1">
        <Hero />
        <Stats />
        <Courses />
        <Reviews />
        <Faqs />
      </main>

      <Footer />

      {route === "Login" && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}

      {route === "Register" && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Register}
        />
      )}

      {route === "Verification" && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </div>
  );
};

export default Page;
