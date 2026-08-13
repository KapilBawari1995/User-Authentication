import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Settings,
  Bell,
  Moon,
  Sun,
  Globe2,
  Check,
} from "lucide-react";

import {
  getSettingsRequest,
  updateSettingsRequest,
} from "../../features/settings/settingsSlice";

const SettingsPage = () => {
  const dispatch = useDispatch();

  const {
    settings,
    getSettingsLoading,
    updateSettingsLoading,
  } = useSelector((state) => state.settings);

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  // =====================================================
  // GET SETTINGS
  // =====================================================

  useEffect(() => {
    dispatch(getSettingsRequest());
  }, [dispatch]);

  // =====================================================
  // SET REDUX DATA INTO LOCAL STATE
  // =====================================================

  useEffect(() => {
    if (settings) {
    

      setDarkMode(
        settings.theme === "dark"
      );

      setLanguage(
        settings.language ?? "English"
      );
    }
  }, [settings]);

  // =====================================================
  // APPLY THEME
  // =====================================================

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const handleSaveSettings = () => {
    dispatch(
      updateSettingsRequest({
        notifications,
        theme: darkMode ? "dark" : "light",
        language,
      })
    );
  };

  return (
    <div
      className="
        min-h-screen
        transition-colors
        duration-300
        dark:bg-slate-950
      "
    >

      {/* ===================================================== */}
      {/* YOUR EXISTING UI */}
      {/* ===================================================== */}

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-indigo-50
                text-indigo-600
                flex items-center justify-center
                dark:bg-indigo-500/10
                dark:text-indigo-400
              "
            >
              <Settings size={24} />
            </div>

            <div>

              <h1
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                  dark:text-white
                "
              >
                Settings
              </h1>

              <p
                className="
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                  mt-1
                "
              >
                Manage your application preferences.
              </p>

            </div>

          </div>

          {/* SAVE */}

          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={updateSettingsLoading}
            className="
              px-5
              py-2.5
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              text-sm
              font-semibold
              disabled:opacity-60
            "
          >
            {updateSettingsLoading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>


        {/* SETTINGS CARD */}

        <div
          className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >

          {/* GENERAL */}

          <div
            className="
              px-6
              py-5
              border-b
              border-slate-200
              dark:border-slate-800
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-indigo-50
                  text-indigo-600
                  flex
                  items-center
                  justify-center
                  dark:bg-indigo-500/10
                  dark:text-indigo-400
                "
              >
                <Settings size={19} />
              </div>

              <div>

                <h2
                  className="
                    text-base
                    font-bold
                    text-slate-800
                    dark:text-white
                  "
                >
                  General
                </h2>

                <p
                  className="
                    text-xs
                    text-slate-400
                    mt-1
                  "
                >
                  Customize your application preferences.
                </p>

              </div>

            </div>

          </div>


   

          {/* THEME */}

          <div
            className="
              px-6
              py-5
              border-b
              border-slate-100
              dark:border-slate-800
              flex
              items-center
              justify-between
              gap-4
              hover:bg-slate-50
              dark:hover:bg-slate-800/50
              transition
            "
          >

            <div className="flex items-center gap-4">

              <div
                className={`
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  ${
                    darkMode
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "bg-amber-50 text-amber-600"
                  }
                `}
              >
                {darkMode ? (
                  <Moon size={20} />
                ) : (
                  <Sun size={20} />
                )}
              </div>

              <div>

                <h3
                  className="
                    text-sm
                    font-semibold
                    text-slate-800
                    dark:text-white
                  "
                >
                  Appearance
                </h3>

                <p
                  className="
                    text-xs
                    text-slate-400
                    mt-1
                  "
                >
                  Choose between light and dark theme.
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className={`
                relative
                w-12
                h-6
                rounded-full
                transition-all
                shrink-0
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
                  w-4
                  h-4
                  rounded-full
                  bg-white
                  shadow-sm
                  transition-all
                  ${
                    darkMode
                      ? "left-7"
                      : "left-1"
                  }
                `}
              />

            </button>

          </div>


          {/* LANGUAGE */}

          <div
            className="
              px-6
              py-5
              flex
              items-center
              justify-between
              gap-4
              hover:bg-slate-50
              dark:hover:bg-slate-800/50
              transition
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <Globe2 size={20} />
              </div>

              <div>

                <h3
                  className="
                    text-sm
                    font-semibold
                    text-slate-800
                    dark:text-white
                  "
                >
                  Language
                </h3>

                <p
                  className="
                    text-xs
                    text-slate-400
                    mt-1
                  "
                >
                  Select your preferred application language.
                </p>

              </div>

            </div>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
              className="
                w-44
                h-10
                px-4
                rounded-xl
                border
                border-slate-200
                dark:border-slate-700
                bg-slate-50
                dark:bg-slate-800
                text-slate-700
                dark:text-slate-200
                text-sm
                outline-none
              "
            >

              <option value="English">
                English
              </option>

            

            </select>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SettingsPage;