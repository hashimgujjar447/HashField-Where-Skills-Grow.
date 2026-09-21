"use client";

import React from "react";
import AdminProtected from "@/app/components/hooks/AdminProtected";
import Heading from "@/app/utils/Heading";
import AdminLayout from "@/app/components/admin/AdminLayout";

import CourseAnalytics from "@/app/components/admin/analytics/CourseAnalytics";
import OrderAnalytics from "@/app/components/admin/analytics/OrderAnalytics";

const OrderAnalyticsPage = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="Elearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout>
          <OrderAnalytics />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default OrderAnalyticsPage;
