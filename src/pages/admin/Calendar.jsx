import React, { useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  User,
  FolderKanban,
  ClipboardList,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  getCalendarRequest,
  getCalendarTodayRequest,
} from "../../features/calendar/calendarSlice";

const Calendar = () => {
  const dispatch = useDispatch();

  // =====================================================
  // REDUX
  // =====================================================

  const {
    calendar = [],
    todaySchedule = [],
    loading,
  } = useSelector((state) => state.calendar);

  // =====================================================
  // CURRENT MONTH
  // =====================================================

  const [currentDate, setCurrentDate] = useState(
    new Date()
  );

  // =====================================================
  // SELECTED DATE
  // =====================================================

  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );

  // =====================================================
  // MONTH / YEAR
  // =====================================================

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // =====================================================
  // MONTH NAME
  // =====================================================

  const monthName = currentDate.toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  // =====================================================
  // DAYS IN MONTH
  // =====================================================

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  // =====================================================
  // FIRST DAY OF MONTH
  // =====================================================

  const firstDayOfMonth = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  // =====================================================
  // FETCH CALENDAR
  // =====================================================

  useEffect(() => {
    const startDate = new Date(
      currentYear,
      currentMonth,
      1
    );

    const endDate = new Date(
      currentYear,
      currentMonth + 1,
      0
    );

    dispatch(
      getCalendarRequest({
        startDate: startDate
          .toISOString()
          .split("T")[0],

        endDate: endDate
          .toISOString()
          .split("T")[0],
      })
    );
  }, [
    dispatch,
    currentMonth,
    currentYear,
  ]);

  // =====================================================
  // FETCH TODAY
  // =====================================================

  useEffect(() => {
    dispatch(getCalendarTodayRequest());
  }, [dispatch]);

  // =====================================================
  // TODAY CHECK
  // =====================================================

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() ===
        date2.getFullYear() &&
      date1.getMonth() ===
        date2.getMonth() &&
      date1.getDate() ===
        date2.getDate()
    );
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date)
      .toISOString()
      .split("T")[0];
  };

  // =====================================================
  // GET EVENT DATE
  // =====================================================

  const getEventDate = (item) => {
    return (
      item.startDate ||
      item.dueDate ||
      item.date ||
      item.task?.startDate ||
      item.task?.dueDate
    );
  };

  // =====================================================
  // EVENTS BY DATE
  // =====================================================

  const getEventsForDate = (day) => {
    const targetDate = formatDate(
      new Date(
        currentYear,
        currentMonth,
        day
      )
    );

    return calendar.filter((item) => {
      const eventDate = getEventDate(item);

      if (!eventDate) {
        return false;
      }

      return (
        formatDate(eventDate) === targetDate
      );
    });
  };

  // =====================================================
  // SELECTED DATE EVENTS
  // =====================================================

  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) {
      return [];
    }

    const targetDate =
      formatDate(selectedDate);

    return calendar.filter((item) => {
      const eventDate = getEventDate(item);

      if (!eventDate) {
        return false;
      }

      return (
        formatDate(eventDate) ===
        targetDate
      );
    });
  }, [
    calendar,
    selectedDate,
  ]);

  // =====================================================
  // TOTAL EVENTS
  // =====================================================

  const totalEvents = calendar.length;

  // =====================================================
  // TODAY
  // =====================================================

  const today = new Date();

  // =====================================================
  // UPCOMING
  // =====================================================

  const upcomingEvents = calendar.filter(
    (item) => {
      const eventDate =
        getEventDate(item);

      if (!eventDate) {
        return false;
      }

      return (
        new Date(eventDate) > today &&
        item.status !== "Completed"
      );
    }
  );

  // =====================================================
  // DUE TODAY
  // =====================================================

  const dueTodayEvents = calendar.filter(
    (item) => {
      const eventDate =
        getEventDate(item);

      if (!eventDate) {
        return false;
      }

      return isSameDate(
        new Date(eventDate),
        today
      );
    }
  );

  // =====================================================
  // COMPLETED
  // =====================================================

  const completedEvents =
    calendar.filter(
      (item) =>
        item.status === "Completed" ||
        item.task?.status === "Completed"
    );

  // =====================================================
  // PREVIOUS MONTH
  // =====================================================

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(
        currentYear,
        currentMonth - 1,
        1
      )
    );
  };

  // =====================================================
  // NEXT MONTH
  // =====================================================

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(
        currentYear,
        currentMonth + 1,
        1
      )
    );
  };

  // =====================================================
  // TODAY BUTTON
  // =====================================================

  const handleToday = () => {
    const todayDate = new Date();

    setCurrentDate(todayDate);
    setSelectedDate(todayDate);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading && calendar.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">

        <div className="text-center">

          <div
            className="
              w-10 h-10
              border-4
              border-indigo-600 dark:border-indigo-400
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            Loading calendar...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="space-y-6">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div className="flex items-center gap-4">

          <div
            className="
              w-14 h-14
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-violet-600
              text-white
              shadow-lg
              shadow-indigo-200
              dark:shadow-none
              flex
              items-center
              justify-center
            "
          >
            <CalendarDays size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Task Calendar
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage deadlines and upcoming schedules.
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={handleToday}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-5
            py-3
            rounded-xl
            font-semibold
            text-sm
            shadow-md
            shadow-indigo-100
            dark:shadow-none
            transition
          "
        >
          <CalendarDays size={18} />
          Today
        </button>

      </div>

      {/* ================================================= */}
      {/* STATISTICS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* TOTAL */}

        <div
          className="
            bg-white dark:bg-slate-900
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            p-5
            shadow-sm dark:shadow-none
            hover:shadow-md dark:hover:bg-slate-800
            transition
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Events
              </p>

              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
                {totalEvents}
              </h2>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                All scheduled events
              </p>

            </div>

            <div
              className="
                w-12 h-12
                rounded-xl
                bg-indigo-50 dark:bg-indigo-500/10
                text-indigo-600 dark:text-indigo-400
                flex
                items-center
                justify-center
              "
            >
              <CalendarDays size={23} />
            </div>

          </div>

        </div>

        {/* UPCOMING */}

        <div
          className="
            bg-white dark:bg-slate-900
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            p-5
            shadow-sm dark:shadow-none
            hover:shadow-md dark:hover:bg-slate-800
            transition
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Upcoming
              </p>

              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {upcomingEvents.length}
              </h2>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Upcoming schedules
              </p>

            </div>

            <div
              className="
                w-12 h-12
                rounded-xl
                bg-blue-50 dark:bg-blue-500/10
                text-blue-600 dark:text-blue-400
                flex
                items-center
                justify-center
              "
            >
              <Clock size={22} />
            </div>

          </div>

        </div>

        {/* DUE TODAY */}

        <div
          className="
            bg-white dark:bg-slate-900
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            p-5
            shadow-sm dark:shadow-none
            hover:shadow-md dark:hover:bg-slate-800
            transition
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Due Today
              </p>

              <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                {dueTodayEvents.length}
              </h2>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Tasks due today
              </p>

            </div>

            <div
              className="
                w-12 h-12
                rounded-xl
                bg-red-50 dark:bg-red-500/10
                text-red-600 dark:text-red-400
                flex
                items-center
                justify-center
              "
            >
              <AlertCircle size={22} />
            </div>

          </div>

        </div>

        {/* COMPLETED */}

        <div
          className="
            bg-white dark:bg-slate-900
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            p-5
            shadow-sm dark:shadow-none
            hover:shadow-md dark:hover:bg-slate-800
            transition
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Completed
              </p>

              <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                {completedEvents.length}
              </h2>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Completed schedules
              </p>

            </div>

            <div
              className="
                w-12 h-12
                rounded-xl
                bg-emerald-50 dark:bg-emerald-500/10
                text-emerald-600 dark:text-emerald-400
                flex
                items-center
                justify-center
              "
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
          className="
            xl:col-span-2
            bg-white dark:bg-slate-900
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            shadow-sm dark:shadow-none
            overflow-hidden
          "
        >

          {/* CALENDAR HEADER */}

          <div
            className="
              px-6
              py-5
              border-b
              border-slate-200 dark:border-slate-700
              flex
              items-center
              justify-between
            "
          >

            <div>

              <h2 className="font-bold text-slate-800 dark:text-white text-lg">
                {monthName} {currentYear}
              </h2>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Monthly task schedule
              </p>

            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={handlePreviousMonth}
                className="
                  w-9 h-9
                  rounded-lg
                  border border-slate-200 dark:border-slate-700
                  flex
                  items-center
                  justify-center
                  text-slate-500 dark:text-slate-400
                  hover:bg-slate-50 dark:hover:bg-slate-800
                  hover:text-indigo-600 dark:hover:text-indigo-400
                  transition
                "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={handleNextMonth}
                className="
                  w-9 h-9
                  rounded-lg
                  border border-slate-200 dark:border-slate-700
                  flex
                  items-center
                  justify-center
                  text-slate-500 dark:text-slate-400
                  hover:bg-slate-50 dark:hover:bg-slate-800
                  hover:text-indigo-600 dark:hover:text-indigo-400
                  transition
                "
              >
                <ChevronRight size={18} />
              </button>

            </div>

          </div>

          {/* CALENDAR */}

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
                  className="
                    text-center
                    text-xs
                    font-bold
                    text-slate-400 dark:text-slate-500
                    uppercase
                    py-3
                  "
                >
                  {day}
                </div>

              ))}

              {/* EMPTY DAYS */}

              {Array.from({
                length: firstDayOfMonth,
              }).map((_, index) => (

                <div
                  key={`empty-${index}`}
                  className="h-14"
                />

              ))}

              {/* DATES */}

              {Array.from({
                length: daysInMonth,
              }).map((_, index) => {

                const day = index + 1;

                const cellDate = new Date(
                  currentYear,
                  currentMonth,
                  day
                );

                const isToday =
                  isSameDate(
                    cellDate,
                    today
                  );

                const isSelected =
                  selectedDate &&
                  isSameDate(
                    cellDate,
                    selectedDate
                  );

                const events =
                  getEventsForDate(day);

                const hasEvent =
                  events.length > 0;

                return (

                  <button
                    type="button"
                    key={day}
                    onClick={() =>
                      setSelectedDate(
                        cellDate
                      )
                    }
                    className={`
                      relative
                      h-14
                      rounded-xl
                      border
                      flex
                      flex-col
                      items-center
                      justify-center
                      cursor-pointer
                      transition

                      ${
                        isToday
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                          : isSelected
                          ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-300 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300"
                          : "border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-500/30"
                      }
                    `}
                  >

                    <span
                      className={`
                        text-sm
                        font-semibold

                        ${
                          isToday
                            ? "text-white"
                            : isSelected
                            ? "text-indigo-700 dark:text-indigo-300"
                            : "text-slate-700 dark:text-slate-300"
                        }
                      `}
                    >
                      {day}
                    </span>

                    {hasEvent && (

                      <div className="flex items-center gap-1 mt-1">

                        {events
                          .slice(0, 3)
                          .map((event) => (

                            <span
                              key={
                                event._id
                              }
                              className={`
                                w-1.5
                                h-1.5
                                rounded-full

                                ${
                                  isToday
                                    ? "bg-white"
                                    : "bg-indigo-500"
                                }
                              `}
                            />

                          ))}

                      </div>

                    )}

                    {isToday && (

                      <span
                        className="
                          text-[9px]
                          text-indigo-100
                          mt-0.5
                        "
                      >
                        Today
                      </span>

                    )}

                  </button>

                );
              })}

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* TODAY / SELECTED DATE SCHEDULE */}
        {/* ================================================= */}

        <div
          className="
            bg-white dark:bg-slate-900
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            shadow-sm dark:shadow-none
            overflow-hidden
          "
        >

          {/* HEADER */}

          <div
            className="
              px-6
              py-5
              border-b
              border-slate-200 dark:border-slate-700
            "
          >

            <h2 className="font-bold text-slate-800 dark:text-white text-lg">

              {isSameDate(
                selectedDate,
                today
              )
                ? "Today's Schedule"
                : selectedDate?.toLocaleDateString(
                    "default",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}

            </h2>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {isSameDate(
                selectedDate,
                today
              )
                ? "Your tasks scheduled for today"
                : "Tasks scheduled for this date"}
            </p>

          </div>

          {/* EVENTS */}

          <div className="p-5 space-y-4 max-h-[520px] overflow-y-auto">

            {selectedDateEvents.length > 0 ? (

              selectedDateEvents.map(
                (item, index) => {

                  const task =
                    item.task || item;

                  const project =
                    item.project ||
                    task.project;

                  const assignedTo =
                    item.assignedTo ||
                    task.assignedTo;

                  const eventTitle =
                    item.title ||
                    task.title ||
                    "Task";

                  const eventStatus =
                    item.status ||
                    task.status ||
                    "Pending";

                  const eventPriority =
                    item.priority ||
                    task.priority;

                  const eventDate =
                    getEventDate(item);

                  return (

                    <div
                      key={
                        item._id ||
                        `${eventTitle}-${index}`
                      }
                      className="
                        flex
                        gap-4
                        p-4
                        rounded-xl
                        bg-indigo-50 dark:bg-indigo-500/10
                        border
                        border-indigo-100 dark:border-indigo-500/20
                      "
                    >

                      {/* ICON */}

                      <div
                        className="
                          w-10
                          h-10
                          rounded-xl
                          bg-indigo-600
                          text-white
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                      >
                        <ClipboardList
                          size={18}
                        />
                      </div>

                      {/* CONTENT */}

                      <div className="min-w-0 flex-1">

                        <h4
                          className="
                            font-semibold
                            text-slate-800 dark:text-white
                            truncate
                          "
                        >
                          {eventTitle}
                        </h4>

                        {/* PROJECT */}

                        {project?.name && (

                          <div
                            className="
                              flex
                              items-center
                              gap-1.5
                              mt-2
                              text-xs
                              text-slate-500 dark:text-slate-400
                            "
                          >
                            <FolderKanban
                              size={13}
                            />

                            <span className="truncate">
                              {project.name}
                            </span>
                          </div>

                        )}

                        {/* USER */}

                        {assignedTo?.name && (

                          <div
                            className="
                              flex
                              items-center
                              gap-1.5
                              mt-1
                              text-xs
                              text-slate-500 dark:text-slate-400
                            "
                          >
                            <User
                              size={13}
                            />

                            <span className="truncate">
                              {assignedTo.name}
                            </span>
                          </div>

                        )}

                        {/* DATE / TIME */}

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            mt-2
                          "
                        >

                          <Clock
                            size={13}
                            className="text-indigo-500 dark:text-indigo-400"
                          />

                          <p className="text-xs text-slate-500 dark:text-slate-400">

                            {eventDate
                              ? new Date(
                                  eventDate
                                ).toLocaleString(
                                  "default",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    hour: "numeric",
                                    minute: "2-digit",
                                  }
                                )
                              : "No date"}

                          </p>

                        </div>

                        {/* STATUS + PRIORITY */}

                        <div className="flex items-center gap-2 mt-3 flex-wrap">

                          <span
                            className={`
                              px-2.5
                              py-1
                              rounded-full
                              text-[10px]
                              font-semibold

                              ${
                                eventStatus ===
                                "Completed"
                                  ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                                  : eventStatus ===
                                    "In Progress"
                                  ? "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                                  : "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400"
                              }
                            `}
                          >
                            {eventStatus}
                          </span>

                          {eventPriority && (

                            <span
                              className="
                                px-2.5
                                py-1
                                rounded-full
                                text-[10px]
                                font-semibold
                                bg-white dark:bg-slate-900
                                text-slate-600 dark:text-slate-300
                                border
                                border-slate-200 dark:border-slate-700
                              "
                            >
                              {eventPriority}
                            </span>

                          )}

                        </div>

                      </div>

                    </div>

                  );
                }
              )

            ) : (

              <div
                className="
                  py-12
                  text-center
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-slate-100 dark:bg-slate-800
                    text-slate-400 dark:text-slate-500
                    flex
                    items-center
                    justify-center
                    mx-auto
                    mb-4
                  "
                >
                  <CalendarDays
                    size={25}
                  />
                </div>

                <h3 className="font-semibold text-slate-700 dark:text-slate-200">
                  No tasks scheduled
                </h3>

                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  No events found for this date.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Calendar;