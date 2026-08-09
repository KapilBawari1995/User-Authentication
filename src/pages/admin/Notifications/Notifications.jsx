
import React, { useEffect } from "react";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  Bell,
  CheckCheck,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  getNotificationsRequest,
} from "../../../features/notification/notificationSlice";

const Notifications = () => {

  const dispatch = useDispatch();

  const {
    notifications,
    loading,
    error,
  } = useSelector(
    (state) => state.notification
  );


  // ================= GET NOTIFICATIONS =================

  useEffect(() => {

    dispatch(
      getNotificationsRequest()
    );

  }, [dispatch]);


  // ================= ICON =================

  const getIcon = (type) => {

    switch (type) {

      case "Task":
        return <CheckCircle size={21} />;

      case "Project":
        return <AlertTriangle size={21} />;

      case "User":
        return <Info size={21} />;

      default:
        return <Clock size={21} />;

    }

  };


  // ================= ICON STYLE =================

  const getIconStyle = (type) => {

    switch (type) {

      case "Task":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";

      case "Project":
        return "bg-amber-50 text-amber-600 border-amber-100";

      case "User":
        return "bg-blue-50 text-blue-600 border-blue-100";

      default:
        return "bg-slate-50 text-slate-600 border-slate-100";

    }

  };


  // ================= LOADING =================

  if (loading) {

    return (

      <div
        className="bg-white rounded-2xl
        border border-slate-200
        shadow-sm
        min-h-[300px]
        flex flex-col
        items-center
        justify-center"
      >

        <div
          className="w-9 h-9
          border-4
          border-indigo-100
          border-t-indigo-600
          rounded-full
          animate-spin"
        />

        <p className="text-sm text-slate-500 mt-4">
          Loading notifications...
        </p>

      </div>

    );

  }


  return (

    <div className="space-y-6">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="flex flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4"
      >

        <div className="flex items-center gap-4">

          <div
            className="w-14 h-14
            rounded-2xl
            bg-gradient-to-br
            from-indigo-500
            to-violet-600
            text-white
            shadow-lg
            shadow-indigo-200
            flex items-center
            justify-center"
          >

            <Bell size={27} />

          </div>


          <div>

            <h1
              className="text-3xl
              font-bold
              text-slate-800"
            >
              Notifications
            </h1>

            <p
              className="text-sm
              text-slate-500
              mt-1"
            >
              Stay updated with your latest activities.
            </p>

          </div>

        </div>


        <button
          className="inline-flex
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
          transition"
        >

          <CheckCheck size={18} />

          Mark All as Read

        </button>

      </div>


      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (

        <div
          className="p-4
          rounded-xl
          bg-red-50
          border border-red-200
          text-red-600
          text-sm"
        >

          {error}

        </div>

      )}


      {/* ================================================= */}
      {/* NOTIFICATION CARD */}
      {/* ================================================= */}

      <div
        className="bg-white
        rounded-2xl
        border border-slate-200
        shadow-sm
        overflow-hidden"
      >


        {/* TABLE HEADER */}

        <div
          className="px-6
          py-5
          border-b
          border-slate-200
          flex items-center
          justify-between"
        >

          <div>

            <h2
              className="font-bold
              text-slate-800"
            >
              All Notifications
            </h2>

            <p
              className="text-xs
              text-slate-400
              mt-1"
            >
              View your latest system activities
            </p>

          </div>


          <div
            className="px-3
            py-1.5
            rounded-lg
            bg-indigo-50
            text-indigo-600
            text-sm
            font-semibold"
          >

            {notifications?.length || 0} Notifications

          </div>

        </div>


        {/* ================================================= */}
        {/* LIST */}
        {/* ================================================= */}

        <div className="divide-y divide-slate-100">


          {notifications?.length > 0 ? (

            notifications.map((item) => (

              <div
                key={item._id}
                className={`
                  px-6 py-5
                  flex items-start
                  gap-4
                  transition
                  hover:bg-slate-50/70

                  ${
                    !item.isRead
                      ? "bg-indigo-50/30"
                      : "bg-white"
                  }
                `}
              >


                {/* ICON */}

                <div
                  className={`
                    w-11 h-11
                    rounded-xl
                    border
                    flex
                    items-center
                    justify-center
                    shrink-0
                    ${getIconStyle(item.type)}
                  `}
                >

                  {getIcon(item.type)}

                </div>


                {/* CONTENT */}

                <div className="flex-1 min-w-0">

                  <div
                    className="flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-2"
                  >

                    <div className="flex items-center gap-2">

                      <h4
                        className={`
                          text-sm
                          ${
                            !item.isRead
                              ? "font-bold text-slate-800"
                              : "font-semibold text-slate-700"
                          }
                        `}
                      >
                        {item.title}
                      </h4>


                      {!item.isRead && (

                        <span
                          className="w-2
                          h-2
                          rounded-full
                          bg-indigo-600
                          shrink-0"
                        />

                      )}

                    </div>


                    {/* TYPE */}

                    <span
                      className="text-[11px]
                      font-semibold
                      px-2.5
                      py-1
                      rounded-full
                      bg-slate-100
                      text-slate-500
                      w-fit"
                    >

                      {item.type || "General"}

                    </span>

                  </div>


                  <p
                    className="text-sm
                    text-slate-500
                    mt-1.5
                    leading-6"
                  >

                    {item.message}

                  </p>


                  <div
                    className="flex
                    items-center
                    gap-2
                    mt-2
                    text-xs
                    text-slate-400"
                  >

                    <Clock size={13} />

                    {new Date(
                      item.createdAt
                    ).toLocaleString()}

                  </div>

                </div>


                {/* UNREAD STATUS */}

                {!item.isRead && (

                  <div
                    className="hidden
                    sm:block
                    shrink-0"
                  >

                    <span
                      className="inline-flex
                      px-3
                      py-1.5
                      rounded-lg
                      bg-indigo-50
                      text-indigo-600
                      text-xs
                      font-semibold"
                    >
                      Unread
                    </span>

                  </div>

                )}

              </div>

            ))

          ) : (

            /* ================================================= */
            /* EMPTY */
            /* ================================================= */

            <div
              className="py-16
              flex flex-col
              items-center
              justify-center"
            >

              <div
                className="w-16
                h-16
                rounded-2xl
                bg-slate-100
                text-slate-400
                flex items-center
                justify-center
                mb-4"
              >

                <Bell size={28} />

              </div>


              <h3
                className="font-semibold
                text-slate-700"
              >
                No Notifications Found
              </h3>


              <p
                className="text-sm
                text-slate-400
                mt-1"
              >
                You're all caught up.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default Notifications;
