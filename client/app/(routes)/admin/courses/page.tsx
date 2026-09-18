"use client";

import React from "react";
import AdminProtected from "@/app/components/hooks/AdminProtected";
import Heading from "@/app/utils/Heading";
import AdminLayout from "@/app/components/admin/AdminLayout";
import DashboardHero from "@/app/components/admin/DashboardHero";
import AllCourses from "@/app/components/admin/course/AllCourses";

const AdminPage = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="Elearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout>
          <AllCourses />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default AdminPage;
