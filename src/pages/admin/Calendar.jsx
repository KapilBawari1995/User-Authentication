
import React from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Calendar = () => {
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
            <CalendarDays size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Task Calendar
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage deadlines and upcoming schedules.
            </p>

          </div>

        </div>

        <button
          className="inline-flex items-center justify-center
          gap-2 bg-indigo-600 hover:bg-indigo-700
          text-white px-5 py-3 rounded-xl
          font-semibold text-sm
          shadow-md shadow-indigo-100
          transition"
        >
          <CalendarDays size={18} />
          Today
        </button>

      </div>


      {/* ================================================= */}
      {/* STATISTICS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* TOTAL EVENTS */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          p-5 shadow-sm
          hover:shadow-md transition"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total Events
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                24
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                All scheduled events
              </p>

            </div>

            <div
              className="w-12 h-12 rounded-xl
              bg-indigo-50 text-indigo-600
              flex items-center justify-center"
            >
              <CalendarDays size={23} />
            </div>

          </div>

        </div>


        {/* UPCOMING */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          p-5 shadow-sm
          hover:shadow-md transition"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Upcoming
              </p>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                8
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Upcoming schedules
              </p>

            </div>

            <div
              className="w-12 h-12 rounded-xl
              bg-blue-50 text-blue-600
              flex items-center justify-center"
            >
              <Clock size={22} />
            </div>

          </div>

        </div>


        {/* DUE TODAY */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          p-5 shadow-sm
          hover:shadow-md transition"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Due Today
              </p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">
                3
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Tasks due today
              </p>

            </div>

            <div
              className="w-12 h-12 rounded-xl
              bg-red-50 text-red-600
              flex items-center justify-center"
            >
              <AlertCircle size={22} />
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
                13
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Completed schedules
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

      </div>


      {/* ================================================= */}
      {/* CALENDAR + SCHEDULE */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">


        {/* ================================================= */}
        {/* CALENDAR */}
        {/* ================================================= */}

        <div
          className="xl:col-span-2
          bg-white rounded-2xl
          border border-slate-200
          shadow-sm overflow-hidden"
        >

          {/* Calendar Header */}

          <div
            className="px-6 py-5
            border-b border-slate-200
            flex items-center justify-between"
          >

            <div>

              <h2 className="font-bold text-slate-800 text-lg">
                August 2026
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Monthly task schedule
              </p>

            </div>

            <div className="flex items-center gap-2">

              <button
                className="w-9 h-9 rounded-lg
                border border-slate-200
                flex items-center justify-center
                text-slate-500
                hover:bg-slate-50
                hover:text-indigo-600
                transition"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                className="w-9 h-9 rounded-lg
                border border-slate-200
                flex items-center justify-center
                text-slate-500
                hover:bg-slate-50
                hover:text-indigo-600
                transition"
              >
                <ChevronRight size={18} />
              </button>

            </div>

          </div>


          {/* Calendar */}

          <div className="p-6">

            <div className="grid grid-cols-7 gap-2">

              {/* DAYS */}

              {[
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
              ].map((day) => (

                <div
                  key={day}
                  className="text-center
                  text-xs font-bold
                  text-slate-400
                  uppercase
                  py-3"
                >
                  {day}
                </div>

              ))}


              {/* EMPTY DAYS */}

              {Array.from({ length: 6 }).map((_, i) => (

                <div
                  key={`empty-${i}`}
                  className="h-14"
                />

              ))}


              {/* DATES */}

              {Array.from({ length: 31 }).map((_, i) => {

                const day = i + 1;

                const isToday = day === 3;

                const hasEvent =
                  [5, 8, 12, 15, 18, 21, 25, 28].includes(day);

                return (

                  <div
                    key={day}
                    className={`relative h-14
                    rounded-xl
                    border
                    flex flex-col
                    items-center
                    justify-center
                    cursor-pointer
                    transition

                    ${
                      isToday
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                        : "border-slate-100 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200"
                    }`}
                  >

                    <span
                      className={`text-sm font-semibold ${
                        isToday
                          ? "text-white"
                          : "text-slate-700"
                      }`}
                    >
                      {day}
                    </span>


                    {hasEvent && !isToday && (

                      <span
                        className="w-1.5 h-1.5
                        rounded-full
                        bg-indigo-500
                        mt-1"
                      />

                    )}

                    {isToday && (

                      <span
                        className="text-[9px]
                        text-indigo-100
                        mt-0.5"
                      >
                        Today
                      </span>

                    )}

                  </div>

                );

              })}

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* TODAY'S SCHEDULE */}
        {/* ================================================= */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          shadow-sm overflow-hidden"
        >

          {/* Header */}

          <div
            className="px-6 py-5
            border-b border-slate-200"
          >

            <h2 className="font-bold text-slate-800 text-lg">
              Today's Schedule
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Your tasks scheduled for today
            </p>

          </div>


          {/* Events */}

          <div className="p-5 space-y-4">

            {/* EVENT 1 */}

            <div
              className="flex gap-4
              p-4 rounded-xl
              bg-indigo-50
              border border-indigo-100"
            >

              <div
                className="w-10 h-10
                rounded-xl
                bg-indigo-600
                text-white
                flex items-center
                justify-center
                shrink-0"
              >
                <Clock size={18} />
              </div>

              <div>

                <h4 className="font-semibold text-slate-800">
                  Dashboard Meeting
                </h4>

                <p className="text-xs text-slate-500 mt-1">
                  10:00 AM
                </p>

              </div>

            </div>


            {/* EVENT 2 */}

            <div
              className="flex gap-4
              p-4 rounded-xl
              bg-amber-50
              border border-amber-100"
            >

              <div
                className="w-10 h-10
                rounded-xl
                bg-amber-500
                text-white
                flex items-center
                justify-center
                shrink-0"
              >
                <Clock size={18} />
              </div>

              <div>

                <h4 className="font-semibold text-slate-800">
                  Login Module Review
                </h4>

                <p className="text-xs text-slate-500 mt-1">
                  12:30 PM
                </p>

              </div>

            </div>


            {/* EVENT 3 */}

            <div
              className="flex gap-4
              p-4 rounded-xl
              bg-emerald-50
              border border-emerald-100"
            >

              <div
                className="w-10 h-10
                rounded-xl
                bg-emerald-500
                text-white
                flex items-center
                justify-center
                shrink-0"
              >
                <CheckCircle size={18} />
              </div>

              <div>

                <h4 className="font-semibold text-slate-800">
                  Task Assignment
                </h4>

                <p className="text-xs text-slate-500 mt-1">
                  03:00 PM
                </p>

              </div>

            </div>


            {/* EVENT 4 */}

            <div
              className="flex gap-4
              p-4 rounded-xl
              bg-violet-50
              border border-violet-100"
            >

              <div
                className="w-10 h-10
                rounded-xl
                bg-violet-600
                text-white
                flex items-center
                justify-center
                shrink-0"
              >
                <CalendarDays size={18} />
              </div>

              <div>

                <h4 className="font-semibold text-slate-800">
                  Project Discussion
                </h4>

                <p className="text-xs text-slate-500 mt-1">
                  05:00 PM
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Calendar;