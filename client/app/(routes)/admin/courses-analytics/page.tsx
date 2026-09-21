"use client";

import React from "react";
import AdminProtected from "@/app/components/hooks/AdminProtected";
import Heading from "@/app/utils/Heading";
import AdminLayout from "@/app/components/admin/AdminLayout";

import CourseAnalytics from "@/app/components/admin/analytics/CourseAnalytics";

const CourseAnalyticsPage = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="Elearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout>
          <CourseAnalytics />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default CourseAnalyticsPage;
