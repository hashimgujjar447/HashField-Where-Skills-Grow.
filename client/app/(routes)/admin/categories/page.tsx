"use client";

import React from "react";
import AdminProtected from "@/app/components/hooks/AdminProtected";
import Heading from "@/app/utils/Heading";
import AdminLayout from "@/app/components/admin/AdminLayout";

import EditFaq from "@/app/components/admin/faq/EditFaq";
import EditCategory from "@/app/components/admin/categories/EditCategory";

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
          <EditCategory />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default HeroPage;
