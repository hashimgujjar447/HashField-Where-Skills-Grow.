"use client";

import React from "react";
import AdminProtected from "@/app/components/hooks/AdminProtected";
import Heading from "@/app/utils/Heading";
import AdminLayout from "@/app/components/admin/AdminLayout";
import DashboardHero from "@/app/components/admin/DashboardHero";
import EditHero from "@/app/components/admin/hero/EditHero";
import EditFaq from "@/app/components/admin/faq/EditFaq";

const HeroPage = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="Elearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout>
          <EditFaq />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default HeroPage;
