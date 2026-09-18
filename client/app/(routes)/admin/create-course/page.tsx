"use client";

import React from "react";
import AdminProtected from "@/app/components/hooks/AdminProtected";
import Heading from "@/app/utils/Heading";
import AdminLayout from "@/app/components/admin/AdminLayout";
import CreateCourse from "@/app/components/admin/course/CreateCourse";

const CreateCoursePage = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Create Course"
          description="Create a new course on Elearning platform"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout>
          <CreateCourse />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default CreateCoursePage;
