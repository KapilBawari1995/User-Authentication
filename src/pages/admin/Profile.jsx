
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
  Activity,
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
          className="w-10 h-10 border-4
          border-indigo-100 border-t-indigo-600
          rounded-full animate-spin"
        />

        <p className="text-sm text-slate-500 mt-4">
          Loading Profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-50 border border-red-200
        text-red-600 rounded-xl p-4"
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
        className="flex flex-col sm:flex-row
        sm:items-center sm:justify-between
        gap-4"
      >

        <div className="flex items-center gap-4">

          <div
            className="w-14 h-14 rounded-2xl
            bg-gradient-to-br from-indigo-500 to-violet-600
            text-white shadow-lg shadow-indigo-200
            flex items-center justify-center"
          >
            <User size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              My Profile
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage and view your personal information.
            </p>

          </div>

        </div>


        <button
          className="inline-flex items-center
          justify-center gap-2
          bg-indigo-600 hover:bg-indigo-700
          text-white px-5 py-3
          rounded-xl font-semibold text-sm
          shadow-md shadow-indigo-100
          transition"
        >
          <Edit size={18} />
          Edit Profile
        </button>

      </div>


      {/* ================================================= */}
      {/* PROFILE MAIN CARD */}
      {/* ================================================= */}

      <div
        className="bg-white rounded-2xl
        border border-slate-200
        shadow-sm overflow-hidden"
      >

        {/* TOP BANNER */}

        <div
          className="h-32
          bg-gradient-to-r
          from-indigo-600
          via-violet-600
          to-purple-600"
        />


        <div className="px-6 pb-7">

          {/* PROFILE INFO */}

          <div
            className="flex flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-5
            -mt-14"
          >

            <div
              className="flex flex-col sm:flex-row
              sm:items-end gap-4"
            >

              {/* IMAGE */}

              <div
                className="w-28 h-28
                rounded-2xl
                bg-white
                p-1
                shadow-lg"
              >

                <img
                  src={
                    profile?.profileImage ||
                    "https://i.pravatar.cc/180"
                  }
                  alt="Profile"
                  className="w-full h-full
                  rounded-xl object-cover"
                />

              </div>


              {/* NAME */}

              <div className="pb-1">

                <h2
                  className="text-2xl
                  font-bold text-slate-800"
                >
                  {profile?.name || "User"}
                </h2>

                <div
                  className="flex flex-wrap
                  items-center gap-2 mt-1"
                >

                  <span
                    className="inline-flex
                    items-center gap-1.5
                    px-3 py-1
                    rounded-full
                    bg-indigo-50
                    text-indigo-700
                    border border-indigo-100
                    text-xs font-semibold"
                  >
                    <ShieldCheck size={13} />

                    {profile?.role?.name || "User"}
                  </span>


                  <span
                    className="inline-flex
                    items-center gap-1.5
                    px-3 py-1
                    rounded-full
                    bg-emerald-50
                    text-emerald-700
                    border border-emerald-100
                    text-xs font-semibold"
                  >
                    <span
                      className="w-1.5 h-1.5
                      rounded-full bg-emerald-500"
                    />

                    Online
                  </span>

                </div>

              </div>

            </div>


            {/* ACCOUNT STATUS */}

            <div
              className="flex items-center
              gap-3
              bg-slate-50
              border border-slate-200
              rounded-xl
              px-4 py-3"
            >

              <div
                className="w-9 h-9
                rounded-lg
                bg-emerald-50
                text-emerald-600
                flex items-center
                justify-center"
              >
                <CheckCircle2 size={19} />
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Account Status
                </p>

                <p className="text-sm font-semibold text-emerald-600">
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
              className="flex items-center
              gap-2 mb-4"
            >

              <div
                className="w-8 h-8
                rounded-lg
                bg-indigo-50
                text-indigo-600
                flex items-center
                justify-center"
              >
                <User size={16} />
              </div>

              <h3
                className="text-lg
                font-bold text-slate-800"
              >
                Personal Information
              </h3>

            </div>


            <div
              className="grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-4"
            >

              {/* EMAIL */}

              <div
                className="border border-slate-200
                rounded-xl p-4
                hover:border-indigo-200
                hover:bg-indigo-50/30
                transition"
              >

                <div
                  className="flex items-center
                  gap-3"
                >

                  <div
                    className="w-10 h-10
                    rounded-lg
                    bg-indigo-50
                    text-indigo-600
                    flex items-center
                    justify-center"
                  >
                    <Mail size={18} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-slate-400">
                      Email Address
                    </p>

                    <p
                      className="text-sm
                      font-semibold
                      text-slate-700
                      truncate"
                    >
                      {profile?.email || "Not Available"}
                    </p>

                  </div>

                </div>

              </div>


              {/* PHONE */}

              <div
                className="border border-slate-200
                rounded-xl p-4
                hover:border-indigo-200
                hover:bg-indigo-50/30
                transition"
              >

                <div
                  className="flex items-center
                  gap-3"
                >

                  <div
                    className="w-10 h-10
                    rounded-lg
                    bg-blue-50
                    text-blue-600
                    flex items-center
                    justify-center"
                  >
                    <Phone size={18} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Phone Number
                    </p>

                    <p className="text-sm font-semibold text-slate-700">
                      {profile?.phone || "Not Available"}
                    </p>

                  </div>

                </div>

              </div>


              {/* ADDRESS */}

              <div
                className="border border-slate-200
                rounded-xl p-4
                hover:border-indigo-200
                hover:bg-indigo-50/30
                transition"
              >

                <div
                  className="flex items-center
                  gap-3"
                >

                  <div
                    className="w-10 h-10
                    rounded-lg
                    bg-violet-50
                    text-violet-600
                    flex items-center
                    justify-center"
                  >
                    <MapPin size={18} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Address
                    </p>

                    <p className="text-sm font-semibold text-slate-700">
                      {profile?.address || "India"}
                    </p>

                  </div>

                </div>

              </div>


              {/* ROLE */}

              <div
                className="border border-slate-200
                rounded-xl p-4
                hover:border-indigo-200
                hover:bg-indigo-50/30
                transition"
              >

                <div
                  className="flex items-center
                  gap-3"
                >

                  <div
                    className="w-10 h-10
                    rounded-lg
                    bg-amber-50
                    text-amber-600
                    flex items-center
                    justify-center"
                  >
                    <Briefcase size={18} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Role
                    </p>

                    <p className="text-sm font-semibold text-slate-700">
                      {profile?.role?.name || "Employee"}
                    </p>

                  </div>

                </div>

              </div>


              {/* JOINED */}

              <div
                className="border border-slate-200
                rounded-xl p-4
                hover:border-indigo-200
                hover:bg-indigo-50/30
                transition"
              >

                <div
                  className="flex items-center
                  gap-3"
                >

                  <div
                    className="w-10 h-10
                    rounded-lg
                    bg-emerald-50
                    text-emerald-600
                    flex items-center
                    justify-center"
                  >
                    <Calendar size={18} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Joined
                    </p>

                    <p className="text-sm font-semibold text-slate-700">
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


      {/* ================================================= */}
      {/* BOTTOM CARDS */}
      {/* ================================================= */}

      <div
        className="grid
        grid-cols-1
        lg:grid-cols-2
        gap-6"
      >

        {/* ================================================= */}
        {/* SKILLS */}
        {/* ================================================= */}

        <div
          className="bg-white
          rounded-2xl
          border border-slate-200
          shadow-sm
          p-6"
        >

          <div
            className="flex items-center
            gap-3 mb-5"
          >

            <div
              className="w-10 h-10
              rounded-xl
              bg-indigo-50
              text-indigo-600
              flex items-center
              justify-center"
            >
              <Briefcase size={19} />
            </div>

            <div>

              <h3 className="font-bold text-slate-800">
                Skills
              </h3>

              <p className="text-xs text-slate-400">
                Technical skills and expertise
              </p>

            </div>

          </div>


          <div className="flex flex-wrap gap-2">

            <span className="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-medium">
              React JS
            </span>

            <span className="px-3 py-2 rounded-lg bg-violet-50 text-violet-700 text-sm font-medium">
              Redux Toolkit
            </span>

            <span className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">
              JavaScript
            </span>

            <span className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium">
              HTML5
            </span>

            <span className="px-3 py-2 rounded-lg bg-amber-50 text-amber-700 text-sm font-medium">
              CSS3
            </span>

            <span className="px-3 py-2 rounded-lg bg-red-50 text-red-700 text-sm font-medium">
              Node JS
            </span>

            <span className="px-3 py-2 rounded-lg bg-cyan-50 text-cyan-700 text-sm font-medium">
              Express JS
            </span>

            <span className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">
              MongoDB
            </span>

          </div>

        </div>


        {/* ================================================= */}
        {/* RECENT ACTIVITY */}
        {/* ================================================= */}

        <div
          className="bg-white
          rounded-2xl
          border border-slate-200
          shadow-sm
          p-6"
        >

          <div
            className="flex items-center
            gap-3 mb-5"
          >

            <div
              className="w-10 h-10
              rounded-xl
              bg-emerald-50
              text-emerald-600
              flex items-center
              justify-center"
            >
              <Activity size={19} />
            </div>

            <div>

              <h3 className="font-bold text-slate-800">
                Recent Activity
              </h3>

              <p className="text-xs text-slate-400">
                Your latest activities
              </p>

            </div>

          </div>


          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <div
                className="w-9 h-9
                rounded-lg
                bg-emerald-50
                text-emerald-600
                flex items-center
                justify-center"
              >
                <CheckCircle2 size={17} />
              </div>

              <div>

                <p className="text-sm font-semibold text-slate-700">
                  Completed Login Module
                </p>

                <p className="text-xs text-slate-400">
                  Recently completed
                </p>

              </div>

            </div>


            <div className="flex items-center gap-3">

              <div
                className="w-9 h-9
                rounded-lg
                bg-indigo-50
                text-indigo-600
                flex items-center
                justify-center"
              >
                <Activity size={17} />
              </div>

              <div>

                <p className="text-sm font-semibold text-slate-700">
                  Created New Tasks
                </p>

                <p className="text-xs text-slate-400">
                  Task management activity
                </p>

              </div>

            </div>


            <div className="flex items-center gap-3">

              <div
                className="w-9 h-9
                rounded-lg
                bg-violet-50
                text-violet-600
                flex items-center
                justify-center"
              >
                <User size={17} />
              </div>

              <div>

                <p className="text-sm font-semibold text-slate-700">
                  Added Team Members
                </p>

                <p className="text-xs text-slate-400">
                  Team management activity
                </p>

              </div>

            </div>


            <div className="flex items-center gap-3">

              <div
                className="w-9 h-9
                rounded-lg
                bg-blue-50
                text-blue-600
                flex items-center
                justify-center"
              >
                <Briefcase size={17} />
              </div>

              <div>

                <p className="text-sm font-semibold text-slate-700">
                  Updated Projects
                </p>

                <p className="text-xs text-slate-400">
                  Project management activity
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;
