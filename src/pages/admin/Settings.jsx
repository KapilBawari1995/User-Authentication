import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Settings,
  Moon,
  Sun,
  Globe2,
} from "lucide-react";

import {
  updateSettingsRequest,
} from "../../features/settings/settingsSlice";

const SettingsPage = () => {
  const dispatch = useDispatch();

  // =====================================================
  // REDUX
  // =====================================================

  const {
    settings,
    updateSettingsLoading,
  } = useSelector((state) => state.settings);

  // =====================================================
  // LOCAL STATE
  // =====================================================

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  // =====================================================
  // LOAD EXISTING SETTINGS FROM REDUX
  // IMPORTANT:
  // No API call here
  // =====================================================

  useEffect(() => {
    if (!settings) return;

    setDarkMode(settings.theme === "dark");

    setLanguage(
      settings.language || "English"
    );
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
  // APPEARANCE CHANGE
  // API CALL ONLY HERE
  // =====================================================

  const handleThemeChange = () => {
    const newDarkMode = !darkMode;

    // Immediately change UI
    setDarkMode(newDarkMode);

    // Save theme in backend
    dispatch(
      updateSettingsRequest({
        notifications:
          settings?.notifications ?? false,

        theme: newDarkMode
          ? "dark"
          : "light",

        language:
          language || "English",
      })
    );
  };

  // =====================================================
  // SAVE CHANGES
  // =====================================================

  const handleSaveSettings = () => {
    dispatch(
      updateSettingsRequest({
        notifications:
          settings?.notifications ?? false,

        theme: darkMode
          ? "dark"
          : "light",

        language:
          language || "English",
      })
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="
        min-h-full
        text-slate-800
        dark:text-slate-100
        transition-colors
        duration-300
      "
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          mb-8
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-5
        "
      >

        {/* TITLE */}

        <div className="flex items-center gap-4">

          <div
            className="
              w-14
              h-14
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
            <Settings size={27} />
          </div>

          <div>

            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
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

        {/* SAVE BUTTON */}

        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={updateSettingsLoading}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            h-11
            px-5
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
            active:bg-indigo-800
            disabled:bg-slate-400
            disabled:cursor-not-allowed
            text-white
            text-sm
            font-semibold
            transition-all
          "
        >
          {updateSettingsLoading
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

      {/* ================================================= */}
      {/* SETTINGS CARD */}
      {/* ================================================= */}

      <div
        className="
          max-w-5xl
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

        {/* ================================================= */}
        {/* GENERAL HEADER */}
        {/* ================================================= */}

        <div
          className="
            px-6
            py-5
            border-b
            border-slate-200
            dark:border-slate-700
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-indigo-50
                dark:bg-indigo-500/10
                text-indigo-600
                dark:text-indigo-400
                flex
                items-center
                justify-center
              "
            >
              <Settings size={20} />
            </div>

            <div>

              <h2
                className="
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
                  dark:text-slate-500
                  mt-1
                "
              >
                Customize your application preferences.
              </p>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* APPEARANCE */}
        {/* ================================================= */}

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

            {/* ICON */}

            <div
              className={`
                w-11
                h-11
                rounded-xl
                flex
                items-center
                justify-center
                transition
                ${
                  darkMode
                    ? `
                      bg-indigo-50
                      text-indigo-600
                      dark:bg-indigo-500/10
                      dark:text-indigo-400
                    `
                    : `
                      bg-amber-50
                      text-amber-600
                    `
                }
              `}
            >
              {darkMode ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} />
              )}
            </div>

            {/* TEXT */}

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
                  dark:text-slate-500
                  mt-1
                "
              >
                Choose between light and dark theme.
              </p>

            </div>

          </div>

          {/* TOGGLE */}

          <button
            type="button"
            onClick={handleThemeChange}
            disabled={updateSettingsLoading}
            aria-label="Toggle dark mode"
            className={`
              relative
              w-12
              h-6
              rounded-full
              shrink-0
              transition-all
              disabled:opacity-60
              disabled:cursor-not-allowed
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

        {/* ================================================= */}
        {/* LANGUAGE */}
        {/* ================================================= */}

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

            {/* ICON */}

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-blue-50
                dark:bg-blue-500/10
                text-blue-600
                dark:text-blue-400
                flex
                items-center
                justify-center
              "
            >
              <Globe2 size={20} />
            </div>

            {/* TEXT */}

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
                  dark:text-slate-500
                  mt-1
                "
              >
                Select your preferred application language.
              </p>

            </div>

          </div>

          {/* LANGUAGE SELECT */}

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
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-500/10
              transition
            "
          >
            <option value="English">
              English
            </option>
          </select>

        </div>

      </div>

    </div>
  );
};

export default SettingsPage;