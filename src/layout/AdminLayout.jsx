import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/admin/Header";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        text-slate-800
        transition-colors
        duration-300

        dark:bg-slate-950
        dark:text-slate-100
      "
    >
      {/* ================= HEADER ================= */}

      <Header />

      {/* ================= SIDEBAR ================= */}

      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}

      <main
        className="
          ml-[250px]
          mt-[70px]

          min-h-[calc(100vh-70px)]
          h-[calc(100vh-70px)]

          overflow-y-auto
          overflow-x-hidden

          p-6

          bg-slate-50
          dark:bg-slate-950

          transition-colors
          duration-300
        "
      >
        <div className="w-full max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;