import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  ShieldX,
  FolderKanban,
  ArrowUpRight,
  ArrowDownRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ClipboardList,
} from "lucide-react";

export default function Dashboard() {
  // ================= SUMMARY CARDS =================

  const cards = [
    {
      title: "Total Employees",
      value: 120,
      icon: <Users size={25} />,
      color: "bg-blue-500",
      light: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Active Employees",
      value: 108,
      icon: <UserCheck size={25} />,
      color: "bg-emerald-500",
      light: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      title: "Inactive Employees",
      value: 8,
      icon: <UserX size={25} />,
      color: "bg-amber-500",
      light: "bg-amber-50",
      text: "text-amber-600",
    },
    {
      title: "Blocked Users",
      value: 4,
      icon: <ShieldX size={25} />,
      color: "bg-red-500",
      light: "bg-red-50",
      text: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Welcome to Task Management System
        </p>

      </div>


      {/* ================================================= */}
      {/* SUMMARY CARDS */}
      {/* ================================================= */}

      <div
        className="grid grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5 mb-8"
      >

        {cards.map((item, index) => (

          <div
            key={index}
            className="bg-white
            rounded-2xl
            border border-slate-200
            shadow-sm
            p-5
            hover:shadow-md
            transition"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {item.value}
                </h2>

                <p
                  className={`text-xs
                  font-semibold
                  mt-2
                  ${item.text}`}
                >
                  +8.2% from last month
                </p>

              </div>


              <div
                className={`${item.color}
                w-14 h-14
                rounded-2xl
                flex items-center
                justify-center
                text-white
                shadow-lg`}
              >
                {item.icon}
              </div>

            </div>

          </div>

        ))}

      </div>


      {/* ================================================= */}
      {/* MAIN STATISTICS */}
      {/* ================================================= */}

      <div
        className="grid grid-cols-1
        lg:grid-cols-2
        xl:grid-cols-3
        gap-6"
      >

        {/* ================================================= */}
        {/* TASK STATUS */}
        {/* ================================================= */}

        <div
          className="bg-white
          rounded-2xl
          border border-slate-200
          shadow-sm
          p-6"
        >

          <div className="flex items-center gap-3 mb-6">

            <div
              className="w-10 h-10
              rounded-xl
              bg-indigo-50
              text-indigo-600
              flex items-center
              justify-center"
            >
              <ClipboardList size={20} />
            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-800">
                Task Status
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Current task overview
              </p>

            </div>

          </div>


          <div className="space-y-5">

            {/* COMPLETED */}

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <div className="bg-emerald-50 p-2.5 rounded-xl">
                  <CheckCircle2
                    className="text-emerald-600"
                    size={20}
                  />
                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-700">
                    Completed
                  </p>

                  <p className="text-xs text-slate-400">
                    Successfully completed
                  </p>

                </div>

              </div>

              <span className="font-bold text-emerald-600">
                120
              </span>

            </div>


            {/* PENDING */}

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <div className="bg-amber-50 p-2.5 rounded-xl">
                  <Clock3
                    className="text-amber-600"
                    size={20}
                  />
                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-700">
                    Pending
                  </p>

                  <p className="text-xs text-slate-400">
                    Tasks in progress
                  </p>

                </div>

              </div>

              <span className="font-bold text-amber-600">
                45
              </span>

            </div>


            {/* OVERDUE */}

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <div className="bg-red-50 p-2.5 rounded-xl">
                  <AlertCircle
                    className="text-red-600"
                    size={20}
                  />
                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-700">
                    Overdue
                  </p>

                  <p className="text-xs text-slate-400">
                    Requires attention
                  </p>

                </div>

              </div>

              <span className="font-bold text-red-600">
                12
              </span>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* PROJECT PROGRESS */}
        {/* ================================================= */}

        <div
          className="bg-white
          rounded-2xl
          border border-slate-200
          shadow-sm
          p-6"
        >

          <div className="flex items-center gap-3 mb-6">

            <div
              className="w-10 h-10
              rounded-xl
              bg-blue-50
              text-blue-600
              flex items-center
              justify-center"
            >
              <FolderKanban size={20} />
            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-800">
                Project Progress
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Current project completion
              </p>

            </div>

          </div>


          <div className="space-y-6">

            {/* TASK PORTAL */}

            <div>

              <div className="flex justify-between mb-2">

                <span className="text-sm font-semibold text-slate-700">
                  Task Portal
                </span>

                <span className="text-sm font-bold text-blue-600">
                  90%
                </span>

              </div>

              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">

                <div
                  className="w-[90%] h-full
                  bg-blue-600
                  rounded-full"
                />

              </div>

            </div>


            {/* HRMS */}

            <div>

              <div className="flex justify-between mb-2">

                <span className="text-sm font-semibold text-slate-700">
                  HRMS
                </span>

                <span className="text-sm font-bold text-emerald-600">
                  70%
                </span>

              </div>

              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">

                <div
                  className="w-[70%] h-full
                  bg-emerald-500
                  rounded-full"
                />

              </div>

            </div>


            {/* CRM */}

            <div>

              <div className="flex justify-between mb-2">

                <span className="text-sm font-semibold text-slate-700">
                  CRM
                </span>

                <span className="text-sm font-bold text-orange-500">
                  45%
                </span>

              </div>

              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">

                <div
                  className="w-[45%] h-full
                  bg-orange-500
                  rounded-full"
                />

              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* TEAM PERFORMANCE */}
        {/* ================================================= */}

        <div
          className="bg-white
          rounded-2xl
          border border-slate-200
          shadow-sm
          p-6"
        >

          <div className="flex items-center gap-3 mb-6">

            <div
              className="w-10 h-10
              rounded-xl
              bg-emerald-50
              text-emerald-600
              flex items-center
              justify-center"
            >
              <UserCheck size={20} />
            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-800">
                Team Performance
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Today's team activity
              </p>

            </div>

          </div>


          <div className="space-y-5">

            {/* COMPLETED TODAY */}

            <div
              className="flex justify-between
              items-center p-3
              rounded-xl
              hover:bg-slate-50
              transition"
            >

              <div className="flex items-center gap-3">

                <div
                  className="w-9 h-9
                  rounded-lg
                  bg-emerald-50
                  flex items-center
                  justify-center"
                >

                  <ArrowUpRight
                    className="text-emerald-600"
                    size={19}
                  />

                </div>

                <span className="text-sm font-semibold text-slate-700">
                  Completed Today
                </span>

              </div>

              <span className="font-bold text-slate-800">
                28
              </span>

            </div>


            {/* RUNNING PROJECTS */}

            <div
              className="flex justify-between
              items-center p-3
              rounded-xl
              hover:bg-slate-50
              transition"
            >

              <div className="flex items-center gap-3">

                <div
                  className="w-9 h-9
                  rounded-lg
                  bg-blue-50
                  flex items-center
                  justify-center"
                >

                  <FolderKanban
                    className="text-blue-600"
                    size={19}
                  />

                </div>

                <span className="text-sm font-semibold text-slate-700">
                  Running Projects
                </span>

              </div>

              <span className="font-bold text-slate-800">
                15
              </span>

            </div>


            {/* DELAYED TASKS */}

            <div
              className="flex justify-between
              items-center p-3
              rounded-xl
              hover:bg-slate-50
              transition"
            >

              <div className="flex items-center gap-3">

                <div
                  className="w-9 h-9
                  rounded-lg
                  bg-red-50
                  flex items-center
                  justify-center"
                >

                  <ArrowDownRight
                    className="text-red-600"
                    size={19}
                  />

                </div>

                <span className="text-sm font-semibold text-slate-700">
                  Delayed Tasks
                </span>

              </div>

              <span className="font-bold text-red-600">
                6
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* RECENT ACTIVITY */}
      {/* ================================================= */}

      <div
        className="mt-6
        bg-white
        rounded-2xl
        border border-slate-200
        shadow-sm
        p-6"
      >

        <div className="flex items-center justify-between mb-5">

          <div>

            <h2 className="text-lg font-bold text-slate-800">
              Recent Activity
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Latest updates from your team
            </p>

          </div>

          <button
            className="text-sm
            text-indigo-600
            font-semibold
            hover:text-indigo-700"
          >
            View All
          </button>

        </div>


        <div className="space-y-4">

          <div
            className="flex items-center
            gap-4 p-3
            rounded-xl
            hover:bg-slate-50
            transition"
          >

            <div
              className="w-10 h-10
              rounded-full
              bg-indigo-100
              text-indigo-600
              flex items-center
              justify-center
              font-bold"
            >
              K
            </div>

            <div className="flex-1">

              <p className="text-sm text-slate-700">
                <span className="font-semibold">
                  Kapil
                </span>{" "}
                completed a task
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Task Portal • 10 minutes ago
              </p>

            </div>

            <CheckCircle2
              size={19}
              className="text-emerald-500"
            />

          </div>


          <div
            className="flex items-center
            gap-4 p-3
            rounded-xl
            hover:bg-slate-50
            transition"
          >

            <div
              className="w-10 h-10
              rounded-full
              bg-blue-100
              text-blue-600
              flex items-center
              justify-center
              font-bold"
            >
              M
            </div>

            <div className="flex-1">

              <p className="text-sm text-slate-700">
                <span className="font-semibold">
                  Mohit
                </span>{" "}
                created a new project
              </p>

              <p className="text-xs text-slate-400 mt-1">
                CRM Project • 35 minutes ago
              </p>

            </div>

            <FolderKanban
              size={19}
              className="text-blue-500"
            />

          </div>


          <div
            className="flex items-center
            gap-4 p-3
            rounded-xl
            hover:bg-slate-50
            transition"
          >

            <div
              className="w-10 h-10
              rounded-full
              bg-orange-100
              text-orange-600
              flex items-center
              justify-center
              font-bold"
            >
              D
            </div>

            <div className="flex-1">

              <p className="text-sm text-slate-700">
                <span className="font-semibold">
                  Dishu
                </span>{" "}
                task is overdue
              </p>

              <p className="text-xs text-slate-400 mt-1">
                HRMS • 1 hour ago
              </p>

            </div>

            <AlertCircle
              size={19}
              className="text-red-500"
            />

          </div>

        </div>

      </div>

    </div>
  );
}