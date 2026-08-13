import React from "react";
import {
  Bell,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const { user, isSuperAdmin } = useSelector(
    (state) => state.auth
  );

  const userName = user?.name || "Admin";

  const roleName = isSuperAdmin
    ? "Super Admin"
    : user?.role?.name || "User";

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-[100]

        h-[70px]

        flex
        items-center
        justify-between

        px-[30px]

        bg-white
        dark:bg-slate-900

        border-b
        border-slate-200
        dark:border-slate-800

        shadow-[0_2px_8px_rgba(0,0,0,0.05)]
        dark:shadow-[0_2px_8px_rgba(0,0,0,0.25)]

        transition-colors
        duration-300
      "
    >
      {/* ================================================= */}
      {/* LOGO SECTION */}
      {/* ================================================= */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        {/* LOGO ICON */}

        <div
          className="
            w-[42px]
            h-[42px]

            rounded-xl

            flex
            items-center
            justify-center

            bg-gradient-to-br
            from-indigo-600
            to-violet-600

            text-white

            shadow-[0_5px_12px_rgba(79,70,229,0.20)]
          "
        >
          <ShieldCheck size={22} />
        </div>

        {/* LOGO TEXT */}

        <div>
          <h2
            className="
              m-0

              text-[18px]
              font-bold

              text-slate-800
              dark:text-white

              transition-colors
              duration-300
            "
          >
            Task Portal
          </h2>

          <p
            className="
              mt-0.5
              mb-0

              text-[10px]

              text-slate-400
              dark:text-slate-500
            "
          >
            Management System
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* RIGHT SECTION */}
      {/* ================================================= */}

      <div
        className="
          flex
          items-center
          gap-[18px]
        "
      >
        {/* ================================================= */}
        {/* NOTIFICATION */}
        {/* ================================================= */}

        <button
          type="button"
          title="Notifications"
          className="
            relative

            w-[42px]
            h-[42px]

            rounded-xl

            flex
            items-center
            justify-center

            cursor-pointer

            border
            border-slate-200
            dark:border-slate-700

            bg-slate-50
            dark:bg-slate-800

            text-slate-500
            dark:text-slate-300

            transition-all
            duration-200

            hover:bg-slate-100
            dark:hover:bg-slate-700

            hover:text-slate-700
            dark:hover:text-white
          "
        >
          <Bell size={20} />

          {/* NOTIFICATION DOT */}

          <span
            className="
              absolute

              top-2
              right-2

              w-[7px]
              h-[7px]

              rounded-full

              bg-red-500

              border-2
              border-white
              dark:border-slate-800
            "
          />
        </button>

        {/* ================================================= */}
        {/* PROFILE */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            gap-2.5

            min-w-[165px]

            px-2.5
            py-1.5
            pl-[7px]

            rounded-xl

            bg-slate-50
            dark:bg-slate-800

            border
            border-slate-200
            dark:border-slate-700

            transition-colors
            duration-300
          "
        >
          {/* AVATAR */}

          <div
            className="
              w-[38px]
              h-[38px]
              min-w-[38px]

              rounded-[10px]

              flex
              items-center
              justify-center

              bg-gradient-to-br
              from-indigo-50
              to-violet-50

              dark:from-indigo-500/20
              dark:to-violet-500/20

              text-indigo-600
              dark:text-indigo-400

              text-[15px]
              font-bold
            "
          >
            {userName?.charAt(0)?.toUpperCase()}
          </div>

          {/* PROFILE INFO */}

          <div
            className="
              flex-1
              min-w-0
            "
          >
            <p
              className="
                m-0

                text-[13px]
                font-bold

                text-slate-800
                dark:text-white

                whitespace-nowrap
                overflow-hidden
                text-ellipsis

                transition-colors
                duration-300
              "
            >
              {userName}
            </p>

            <span
              className="
                block

                mt-0.5

                text-[10px]
                font-medium

                text-slate-500
                dark:text-slate-400
              "
            >
              {roleName}
            </span>
          </div>

          {/* CHEVRON */}

          <ChevronDown
            size={17}
            className="
              text-slate-500
              dark:text-slate-400

              shrink-0
            "
          />
        </div>
      </div>
    </header>
  );
};

export default Header;