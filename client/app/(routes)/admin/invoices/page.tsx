"use client";

import React from "react";
import AdminProtected from "@/app/components/hooks/AdminProtected";
import Heading from "@/app/utils/Heading";
import AdminLayout from "@/app/components/admin/AdminLayout";
import AllInvoices from "@/app/components/admin/order/AllInvoices";

const InvoicesPage = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin Invoices"
          description="Elearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <AdminLayout>
          <AllInvoices />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default InvoicesPage;
