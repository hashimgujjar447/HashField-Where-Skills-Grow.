"use client";

import React, { useState } from "react";
import AdminSidebar from "./sidebar/AdminSidebar";
import DashboardHeader from "./DashboardHeader";

type Props = { children: React.ReactNode };

const AdminLayout: React.FC<Props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d1526] text-slate-900 dark:text-white">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex min-h-screen flex-col lg:ml-[270px] transition-all">
        <DashboardHeader open={sidebarOpen} setOpen={setSidebarOpen} />

        <main className="flex-1 w-full max-w-[1600px] px-3 sm:px-6 lg:px-8 pt-20 pb-10 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
