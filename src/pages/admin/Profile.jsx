import React, { useEffect } from "react";

import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Edit,
  User,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  getProfileRequest,
} from "../../features/profile/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const {
    profile,
    loading,
    error,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfileRequest());
  }, [dispatch]);

  console.log(profile);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div
          className="
            w-10 h-10
            border-4
            border-indigo-100
            dark:border-indigo-500/20
            border-t-indigo-600
            dark:border-t-indigo-400
            rounded-full
            animate-spin
          "
        />

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
          Loading Profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          bg-red-50
          dark:bg-red-500/10
          border
          border-red-200
          dark:border-red-500/20
          text-red-600
          dark:text-red-400
          rounded-xl
          p-4
        "
      >
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          flex flex-col sm:flex-row
          sm:items-center sm:justify-between
          gap-4
        "
      >

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
              flex items-center
              justify-center
            "
          >
            <User size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              My Profile
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage and view your personal information.
            </p>

          </div>

        </div>

        <button
          className="
            inline-flex items-center
            justify-center gap-2
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-5 py-3
            rounded-xl
            font-semibold
            text-sm
            shadow-md
            shadow-indigo-100
            dark:shadow-none
            transition
          "
        >
          <Edit size={18} />
          Edit Profile
        </button>

      </div>

      {/* ================================================= */}
      {/* PROFILE MAIN CARD */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          dark:bg-slate-900
          rounded-2xl
          border
          border-slate-200
          dark:border-slate-700
          shadow-sm
          dark:shadow-none
          overflow-hidden
        "
      >

        {/* TOP BANNER */}

        <div
          className="
            h-32
            bg-gradient-to-r
            from-indigo-600
            via-violet-600
            to-purple-600
          "
        />

        <div className="px-6 pb-7">

          {/* PROFILE INFO */}

          <div
            className="
              flex flex-col
              lg:flex-row
              lg:items-end
              lg:justify-between
              gap-5
              -mt-14
            "
          >

            <div
              className="
                flex flex-col sm:flex-row
                sm:items-end gap-4
              "
            >

              {/* IMAGE */}

              <div
                className="
                  w-28 h-28
                  rounded-2xl
                  bg-white
                  dark:bg-slate-800
                  p-1
                  shadow-lg
                "
              >
                <img
                  src={
                    profile?.profileImage ||
                    "https://i.pravatar.cc/180"
                  }
                  alt="Profile"
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>

              {/* NAME */}

              <div className="pb-1">

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-slate-800
                    dark:text-white
                  "
                >
                  {profile?.name || "User"}
                </h2>

                <div
                  className="
                    flex flex-wrap
                    items-center gap-2 mt-1
                  "
                >

                  <span
                    className="
                      inline-flex
                      items-center gap-1.5
                      px-3 py-1
                      rounded-full
                      bg-indigo-50
                      dark:bg-indigo-500/10
                      text-indigo-700
                      dark:text-indigo-400
                      border
                      border-indigo-100
                      dark:border-indigo-500/20
                      text-xs font-semibold
                    "
                  >
                    <ShieldCheck size={13} />

                    {profile?.role?.name || "User"}
                  </span>

                  <span
                    className="
                      inline-flex
                      items-center gap-1.5
                      px-3 py-1
                      rounded-full
                      bg-emerald-50
                      dark:bg-emerald-500/10
                      text-emerald-700
                      dark:text-emerald-400
                      border
                      border-emerald-100
                      dark:border-emerald-500/20
                      text-xs font-semibold
                    "
                  >
                    <span
                      className="
                        w-1.5 h-1.5
                        rounded-full
                        bg-emerald-500
                      "
                    />

                    Online
                  </span>

                </div>

              </div>

            </div>

            {/* ACCOUNT STATUS */}

            <div
              className="
                flex items-center
                gap-3
                bg-slate-50
                dark:bg-slate-800
                border
                border-slate-200
                dark:border-slate-700
                rounded-xl
                px-4 py-3
              "
            >

              <div
                className="
                  w-9 h-9
                  rounded-lg
                  bg-emerald-50
                  dark:bg-emerald-500/10
                  text-emerald-600
                  dark:text-emerald-400
                  flex items-center
                  justify-center
                "
              >
                <CheckCircle2 size={19} />
              </div>

              <div>

                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Account Status
                </p>

                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Active
                </p>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* INFORMATION */}
          {/* ================================================= */}

          <div className="mt-8">

            <div
              className="
                flex items-center
                gap-2 mb-4
              "
            >

              <div
                className="
                  w-8 h-8
                  rounded-lg
                  bg-indigo-50
                  dark:bg-indigo-500/10
                  text-indigo-600
                  dark:text-indigo-400
                  flex items-center
                  justify-center
                "
              >
                <User size={16} />
              </div>

              <h3
                className="
                  text-lg
                  font-bold
                  text-slate-800
                  dark:text-white
                "
              >
                Personal Information
              </h3>

            </div>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-4
              "
            >

              {/* EMAIL */}

              <div
                className="
                  border
                  border-slate-200
                  dark:border-slate-700
                  rounded-xl p-4
                  hover:border-indigo-200
                  dark:hover:border-indigo-500/30
                  hover:bg-indigo-50/30
                  dark:hover:bg-indigo-500/5
                  transition
                "
              >

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      w-10 h-10
                      rounded-lg
                      bg-indigo-50
                      dark:bg-indigo-500/10
                      text-indigo-600
                      dark:text-indigo-400
                      flex items-center
                      justify-center
                    "
                  >
                    <Mail size={18} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Email Address
                    </p>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-slate-700
                        dark:text-slate-200
                        truncate
                      "
                    >
                      {profile?.email || "Not Available"}
                    </p>

                  </div>

                </div>

              </div>

              {/* PHONE */}

              <div
                className="
                  border
                  border-slate-200
                  dark:border-slate-700
                  rounded-xl p-4
                  hover:border-indigo-200
                  dark:hover:border-indigo-500/30
                  hover:bg-indigo-50/30
                  dark:hover:bg-indigo-500/5
                  transition
                "
              >

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      w-10 h-10
                      rounded-lg
                      bg-blue-50
                      dark:bg-blue-500/10
                      text-blue-600
                      dark:text-blue-400
                      flex items-center
                      justify-center
                    "
                  >
                    <Phone size={18} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Phone Number
                    </p>

                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {profile?.phone || "Not Available"}
                    </p>

                  </div>

                </div>

              </div>

              {/* ADDRESS */}

              <div
                className="
                  border
                  border-slate-200
                  dark:border-slate-700
                  rounded-xl p-4
                  hover:border-indigo-200
                  dark:hover:border-indigo-500/30
                  hover:bg-indigo-50/30
                  dark:hover:bg-indigo-500/5
                  transition
                "
              >

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      w-10 h-10
                      rounded-lg
                      bg-violet-50
                      dark:bg-violet-500/10
                      text-violet-600
                      dark:text-violet-400
                      flex items-center
                      justify-center
                    "
                  >
                    <MapPin size={18} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Address
                    </p>

                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {profile?.address || "India"}
                    </p>

                  </div>

                </div>

              </div>

              {/* ROLE */}

              <div
                className="
                  border
                  border-slate-200
                  dark:border-slate-700
                  rounded-xl p-4
                  hover:border-indigo-200
                  dark:hover:border-indigo-500/30
                  hover:bg-indigo-50/30
                  dark:hover:bg-indigo-500/5
                  transition
                "
              >

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      w-10 h-10
                      rounded-lg
                      bg-amber-50
                      dark:bg-amber-500/10
                      text-amber-600
                      dark:text-amber-400
                      flex items-center
                      justify-center
                    "
                  >
                    <Briefcase size={18} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Role
                    </p>

                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {profile?.role?.name || "Employee"}
                    </p>

                  </div>

                </div>

              </div>

              {/* JOINED */}

              <div
                className="
                  border
                  border-slate-200
                  dark:border-slate-700
                  rounded-xl p-4
                  hover:border-indigo-200
                  dark:hover:border-indigo-500/30
                  hover:bg-indigo-50/30
                  dark:hover:bg-indigo-500/5
                  transition
                "
              >

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      w-10 h-10
                      rounded-lg
                      bg-emerald-50
                      dark:bg-emerald-500/10
                      text-emerald-600
                      dark:text-emerald-400
                      flex items-center
                      justify-center
                    "
                  >
                    <Calendar size={18} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Joined
                    </p>

                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {profile?.createdAt
                        ? new Date(
                            profile.createdAt
                          ).toDateString()
                        : "-"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;