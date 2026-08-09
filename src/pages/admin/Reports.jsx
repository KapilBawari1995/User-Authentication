
import React from "react";
import {
  BarChart3,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  FolderKanban,
  ArrowUpRight,
  Target,
} from "lucide-react";

const Reports = () => {
  return (
    <div className="space-y-6">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div className="flex items-center gap-4">

          <div
            className="w-14 h-14 rounded-2xl
            bg-gradient-to-br from-indigo-500 to-violet-600
            text-white shadow-lg shadow-indigo-200
            flex items-center justify-center"
          >
            <BarChart3 size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Reports & Analytics
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Track project and task performance.
            </p>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* REPORT CARDS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* TOTAL TASKS */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          p-5 shadow-sm
          hover:shadow-md transition"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total Tasks
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                180
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                All project tasks
              </p>

            </div>

            <div
              className="w-12 h-12 rounded-xl
              bg-indigo-50 text-indigo-600
              flex items-center justify-center"
            >
              <BarChart3 size={23} />
            </div>

          </div>

        </div>


        {/* COMPLETED */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          p-5 shadow-sm
          hover:shadow-md transition"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>

              <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                135
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Successfully completed
              </p>

            </div>

            <div
              className="w-12 h-12 rounded-xl
              bg-emerald-50 text-emerald-600
              flex items-center justify-center"
            >
              <CheckCircle size={22} />
            </div>

          </div>

        </div>


        {/* PENDING */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          p-5 shadow-sm
          hover:shadow-md transition"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-amber-600 mt-2">
                45
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Tasks still pending
              </p>

            </div>

            <div
              className="w-12 h-12 rounded-xl
              bg-amber-50 text-amber-600
              flex items-center justify-center"
            >
              <Clock size={22} />
            </div>

          </div>

        </div>


        {/* EMPLOYEES */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          p-5 shadow-sm
          hover:shadow-md transition"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Employees
              </p>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                24
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Active employees
              </p>

            </div>

            <div
              className="w-12 h-12 rounded-xl
              bg-blue-50 text-blue-600
              flex items-center justify-center"
            >
              <Users size={22} />
            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* ANALYTICS + SUMMARY */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">


        {/* ================================================= */}
        {/* MONTHLY PERFORMANCE */}
        {/* ================================================= */}

        <div
          className="xl:col-span-2
          bg-white rounded-2xl
          border border-slate-200
          shadow-sm overflow-hidden"
        >

          {/* Header */}

          <div
            className="px-6 py-5
            border-b border-slate-200
            flex items-center justify-between"
          >

            <div>

              <div className="flex items-center gap-2">

                <div
                  className="w-9 h-9 rounded-lg
                  bg-indigo-50 text-indigo-600
                  flex items-center justify-center"
                >
                  <TrendingUp size={18} />
                </div>

                <h2 className="font-bold text-slate-800">
                  Monthly Performance
                </h2>

              </div>

              <p className="text-xs text-slate-400 mt-2">
                Task completion performance throughout the year
              </p>

            </div>

            <span
              className="px-3 py-1.5
              rounded-lg
              bg-emerald-50
              text-emerald-600
              text-xs font-semibold"
            >
              +15% Growth
            </span>

          </div>


          {/* Chart */}

          <div className="p-6">

            <div
              className="h-72
              flex items-end
              justify-between
              gap-4
              border-b border-slate-200
              px-3"
            >

              {/* JAN */}

              <div className="flex-1 h-full flex flex-col justify-end items-center">

                <div
                  className="w-full max-w-14
                  bg-indigo-500
                  hover:bg-indigo-600
                  rounded-t-xl
                  transition"
                  style={{ height: "70%" }}
                />

                <span className="text-xs text-slate-400 mt-3">
                  Jan
                </span>

              </div>


              {/* FEB */}

              <div className="flex-1 h-full flex flex-col justify-end items-center">

                <div
                  className="w-full max-w-14
                  bg-indigo-500
                  hover:bg-indigo-600
                  rounded-t-xl
                  transition"
                  style={{ height: "45%" }}
                />

                <span className="text-xs text-slate-400 mt-3">
                  Feb
                </span>

              </div>


              {/* MAR */}

              <div className="flex-1 h-full flex flex-col justify-end items-center">

                <div
                  className="w-full max-w-14
                  bg-indigo-500
                  hover:bg-indigo-600
                  rounded-t-xl
                  transition"
                  style={{ height: "85%" }}
                />

                <span className="text-xs text-slate-400 mt-3">
                  Mar
                </span>

              </div>


              {/* APR */}

              <div className="flex-1 h-full flex flex-col justify-end items-center">

                <div
                  className="w-full max-w-14
                  bg-indigo-500
                  hover:bg-indigo-600
                  rounded-t-xl
                  transition"
                  style={{ height: "60%" }}
                />

                <span className="text-xs text-slate-400 mt-3">
                  Apr
                </span>

              </div>


              {/* MAY */}

              <div className="flex-1 h-full flex flex-col justify-end items-center">

                <div
                  className="w-full max-w-14
                  bg-indigo-500
                  hover:bg-indigo-600
                  rounded-t-xl
                  transition"
                  style={{ height: "95%" }}
                />

                <span className="text-xs text-slate-400 mt-3">
                  May
                </span>

              </div>


              {/* JUN */}

              <div className="flex-1 h-full flex flex-col justify-end items-center">

                <div
                  className="w-full max-w-14
                  bg-indigo-500
                  hover:bg-indigo-600
                  rounded-t-xl
                  transition"
                  style={{ height: "75%" }}
                />

                <span className="text-xs text-slate-400 mt-3">
                  Jun
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* PERFORMANCE SUMMARY */}
        {/* ================================================= */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          shadow-sm overflow-hidden"
        >

          <div
            className="px-6 py-5
            border-b border-slate-200"
          >

            <div className="flex items-center gap-3">

              <div
                className="w-10 h-10 rounded-xl
                bg-violet-50
                text-violet-600
                flex items-center justify-center"
              >
                <Target size={20} />
              </div>

              <div>

                <h2 className="font-bold text-slate-800">
                  Performance Summary
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Current performance overview
                </p>

              </div>

            </div>

          </div>


          <div className="p-5 space-y-4">

            {/* COMPLETION */}

            <div
              className="flex items-center
              justify-between
              p-4 rounded-xl
              bg-emerald-50
              border border-emerald-100"
            >

              <div className="flex items-center gap-3">

                <div
                  className="w-10 h-10 rounded-xl
                  bg-emerald-100
                  text-emerald-600
                  flex items-center justify-center"
                >
                  <CheckCircle size={19} />
                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-700">
                    Task Completion Rate
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Overall completion
                  </p>

                </div>

              </div>

              <span className="font-bold text-emerald-600">
                75%
              </span>

            </div>


            {/* PRODUCTIVITY */}

            <div
              className="flex items-center
              justify-between
              p-4 rounded-xl
              bg-blue-50
              border border-blue-100"
            >

              <div className="flex items-center gap-3">

                <div
                  className="w-10 h-10 rounded-xl
                  bg-blue-100
                  text-blue-600
                  flex items-center justify-center"
                >
                  <ArrowUpRight size={19} />
                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-700">
                    Productivity
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Compared with last month
                  </p>

                </div>

              </div>

              <span className="font-bold text-blue-600">
                +15%
              </span>

            </div>


            {/* EMPLOYEES */}

            <div
              className="flex items-center
              justify-between
              p-4 rounded-xl
              bg-indigo-50
              border border-indigo-100"
            >

              <div className="flex items-center gap-3">

                <div
                  className="w-10 h-10 rounded-xl
                  bg-indigo-100
                  text-indigo-600
                  flex items-center justify-center"
                >
                  <Users size={19} />
                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-700">
                    Active Employees
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Currently active
                  </p>

                </div>

              </div>

              <span className="font-bold text-indigo-600">
                24
              </span>

            </div>


            {/* PROJECTS */}

            <div
              className="flex items-center
              justify-between
              p-4 rounded-xl
              bg-violet-50
              border border-violet-100"
            >

              <div className="flex items-center gap-3">

                <div
                  className="w-10 h-10 rounded-xl
                  bg-violet-100
                  text-violet-600
                  flex items-center justify-center"
                >
                  <FolderKanban size={19} />
                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-700">
                    Running Projects
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Currently in progress
                  </p>

                </div>

              </div>

              <span className="font-bold text-violet-600">
                8
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Reports;

