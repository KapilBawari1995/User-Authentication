import React, { useState } from "react";
import {
  Settings,
  Bell,
  Moon,
  Globe,
  Shield,
  Save,
  CheckCircle2,
  Lock,
  UserCog,
} from "lucide-react";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div className="flex items-center gap-4">

          <div
            className="
              w-14 h-14 rounded-2xl
              bg-gradient-to-br from-indigo-500 to-violet-600
              text-white
              shadow-lg shadow-indigo-200
              flex items-center justify-center
            "
          >
            <Settings size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
              Settings
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage your account preferences and application settings.
            </p>

          </div>

        </div>

        <button
          className="
            inline-flex items-center justify-center
            gap-2
            bg-indigo-600 hover:bg-indigo-700
            text-white
            px-5 py-3
            rounded-xl
            font-semibold
            shadow-md shadow-indigo-100
            transition-all duration-200
          "
        >
          <Save size={18} />
          Save Changes
        </button>

      </div>


      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-7">

        {/* ACCOUNT */}

        <div
          className="
            bg-white
            rounded-2xl
            border border-slate-200
            p-5
            shadow-sm
            hover:shadow-md
            transition
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Account Settings
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mt-2">
                Personal
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Manage your preferences
              </p>

            </div>

            <div
              className="
                w-12 h-12 rounded-xl
                bg-indigo-50
                text-indigo-600
                flex items-center justify-center
              "
            >
              <UserCog size={22} />
            </div>

          </div>

        </div>


        {/* NOTIFICATIONS */}

        <div
          className="
            bg-white
            rounded-2xl
            border border-slate-200
            p-5
            shadow-sm
            hover:shadow-md
            transition
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Notifications
              </p>

              <h2
                className={`text-2xl font-bold mt-2 ${
                  notifications
                    ? "text-emerald-600"
                    : "text-slate-500"
                }`}
              >
                {notifications ? "Enabled" : "Disabled"}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Task and project alerts
              </p>

            </div>

            <div
              className="
                w-12 h-12 rounded-xl
                bg-emerald-50
                text-emerald-600
                flex items-center justify-center
              "
            >
              <Bell size={22} />
            </div>

          </div>

        </div>


        {/* SECURITY */}

        <div
          className="
            bg-white
            rounded-2xl
            border border-slate-200
            p-5
            shadow-sm
            hover:shadow-md
            transition
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Security
              </p>

              <h2 className="text-2xl font-bold text-blue-600 mt-2">
                Protected
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Account security settings
              </p>

            </div>

            <div
              className="
                w-12 h-12 rounded-xl
                bg-blue-50
                text-blue-600
                flex items-center justify-center
              "
            >
              <Shield size={22} />
            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* GENERAL SETTINGS */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border border-slate-200
          shadow-sm
          overflow-hidden
          mb-6
        "
      >

        <div
          className="
            px-6 py-5
            border-b border-slate-200
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-indigo-50
                text-indigo-600
                flex items-center justify-center
              "
            >
              <Settings size={19} />
            </div>

            <div>

              <h2 className="font-bold text-slate-800">
                General Settings
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Manage general application preferences
              </p>

            </div>

          </div>

        </div>


        {/* NOTIFICATIONS */}

        <div
          className="
            px-6 py-5
            border-b border-slate-100
            flex flex-col sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            hover:bg-slate-50/60
            transition
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-emerald-50
                text-emerald-600
                flex items-center justify-center
              "
            >
              <Bell size={20} />
            </div>

            <div>

              <h4 className="font-semibold text-slate-800">
                Notifications
              </h4>

              <p className="text-sm text-slate-400 mt-1">
                Receive task and project notifications.
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={() => setNotifications(!notifications)}
            className={`
              relative
              w-12 h-6
              rounded-full
              transition
              ${
                notifications
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }
            `}
          >

            <span
              className={`
                absolute
                top-1
                w-4 h-4
                rounded-full
                bg-white
                shadow
                transition
                ${
                  notifications
                    ? "left-7"
                    : "left-1"
                }
              `}
            />

          </button>

        </div>


        {/* DARK MODE */}

        <div
          className="
            px-6 py-5
            flex flex-col sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            hover:bg-slate-50/60
            transition
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-slate-100
                text-slate-600
                flex items-center justify-center
              "
            >
              <Moon size={20} />
            </div>

            <div>

              <h4 className="font-semibold text-slate-800">
                Dark Mode
              </h4>

              <p className="text-sm text-slate-400 mt-1">
                Enable dark theme for the application.
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`
              relative
              w-12 h-6
              rounded-full
              transition
              ${
                darkMode
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }
            `}
          >

            <span
              className={`
                absolute
                top-1
                w-4 h-4
                rounded-full
                bg-white
                shadow
                transition
                ${
                  darkMode
                    ? "left-7"
                    : "left-1"
                }
              `}
            />

          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* LANGUAGE */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border border-slate-200
          shadow-sm
          overflow-hidden
          mb-6
        "
      >

        <div className="px-6 py-5 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-blue-50
                text-blue-600
                flex items-center justify-center
              "
            >
              <Globe size={19} />
            </div>

            <div>

              <h2 className="font-bold text-slate-800">
                Language
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Select your preferred application language.
              </p>

            </div>

          </div>

        </div>


        <div
          className="
            px-6 py-5
            flex flex-col sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          "
        >

          <div>

            <h4 className="font-semibold text-slate-800">
              Application Language
            </h4>

            <p className="text-sm text-slate-400 mt-1">
              Choose the language used throughout the application.
            </p>

          </div>


          <select
            className="
              h-11
              min-w-[180px]
              px-4
              border border-slate-200
              rounded-xl
              bg-slate-50
              text-sm
              text-slate-700
              outline-none
              focus:bg-white
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-50
              transition
            "
          >

            <option>English</option>
            <option>Hindi</option>

          </select>

        </div>

      </div>


      {/* ================================================= */}
      {/* PRIVACY & SECURITY */}
      {/* ================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border border-slate-200
          shadow-sm
          overflow-hidden
        "
      >

        <div className="px-6 py-5 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-violet-50
                text-violet-600
                flex items-center justify-center
              "
            >
              <Shield size={19} />
            </div>

            <div>

              <h2 className="font-bold text-slate-800">
                Privacy & Security
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Keep your account secure and protected.
              </p>

            </div>

          </div>

        </div>


        <div
          className="
            px-6 py-5
            flex flex-col sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-violet-50
                text-violet-600
                flex items-center justify-center
              "
            >
              <Lock size={20} />
            </div>

            <div>

              <h4 className="font-semibold text-slate-800">
                Two-Factor Authentication
              </h4>

              <p className="text-sm text-slate-400 mt-1">
                Improve your account security with two-factor authentication.
              </p>

            </div>

          </div>


          <button
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-2.5
              rounded-xl
              bg-indigo-50
              text-indigo-600
              border border-indigo-100
              text-sm
              font-semibold
              hover:bg-indigo-100
              transition
            "
          >
            <Shield size={16} />
            Enable
          </button>

        </div>

      </div>

    </div>
  );
};

export default SettingsPage;