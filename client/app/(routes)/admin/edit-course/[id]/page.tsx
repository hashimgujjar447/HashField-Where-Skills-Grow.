"use client";

import React from "react";
import AdminProtected from "@/app/components/hooks/AdminProtected";
import Heading from "@/app/utils/Heading";
import AdminLayout from "@/app/components/admin/AdminLayout";

import EditCourse from "@/app/components/admin/course/EditCourse";
import { useParams } from "next/navigation";

const EditCoursePage = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Edit Course"
          description="Edit an existing course on Elearning platform"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout>
          {id ? (
            <EditCourse id={id} />
          ) : (
            <div className="p-4 text-center text-slate-500">
              Invalid course ID.
            </div>
          )}
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default EditCoursePage;
