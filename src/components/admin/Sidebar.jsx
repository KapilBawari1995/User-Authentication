import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ShieldCheck,
  CalendarDays,
  BarChart3,
  Bell,
  Settings,
  User,
  Lock,
  LogOut,
  Building2,
  UserCog,
} from "lucide-react";

import { logoutRequest } from "../../features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { permissions, isSuperAdmin } = useSelector(
    (state) => state.auth
  );

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    dispatch(
      logoutRequest({
        navigate,
      })
    );
  };

  // =====================================================
  // MENU
  // =====================================================

  const menu = [
    {
      name: "Dashboard",
      module: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },

    {
      name: "Projects",
      module: "Projects",
      icon: FolderKanban,
      path: "/admin/projects",
    },

    {
      name: "Calendar",
      module: "Calendar",
      icon: CalendarDays,
      path: "/admin/calendar",
    },

    {
      name: "Users",
      module: "Users",
      icon: Users,
      path: "/admin/users",
    },

    {
      name: "Roles",
      module: "Roles",
      icon: UserCog,
      path: "/admin/roles",
    },

    {
      name: "Permission",
      module: "Permission",
      icon: ShieldCheck,
      path: "/admin/permission-management",
    },

    {
      name: "Assign Manager",
      module: "AssignManager",
      icon: UserCog,
      path: "/admin/assign-manager",
    },

    {
      name: "Department",
      module: "Department",
      icon: Building2,
      path: "/admin/department",
    },

    {
      name: "Reports",
      module: "Reports",
      icon: BarChart3,
      path: "/admin/reports",
    },

    {
      name: "Notifications",
      module: "Notifications",
      icon: Bell,
      path: "/admin/notifications",
    },

    {
      name: "Profile",
      module: "Profile",
      icon: User,
      path: "/admin/profile",
    },

    {
      name: "Settings",
      module: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },

    {
      name: "Change Password",
      module: "Change Password",
      icon: Lock,
      path: "/admin/change-password",
    },
  ];

  // =====================================================
  // PERMISSION FILTER
  // =====================================================

  const filteredMenu = menu.filter((item) => {
    // Super Admin -> All menus
    if (isSuperAdmin) {
      return true;
    }

    const permission = permissions?.find(
      (p) => p.module === item.module
    );

    return permission?.view === true;
  });

  // =====================================================
  // UI
  // =====================================================

  return (
    <aside
      className="
        fixed
        top-[70px]
        left-0
        z-[90]

        w-[250px]
        h-[calc(100vh-70px)]

        flex
        flex-col

        px-[14px]
        py-[18px]

        bg-white
        dark:bg-slate-900

        border-r
        border-slate-200
        dark:border-slate-800

        transition-colors
        duration-300
      "
    >
      {/* ================================================= */}
      {/* MENU */}
      {/* ================================================= */}

      <div
        className="
          flex-1
          overflow-y-auto
          overflow-x-hidden

          scrollbar-thin
          scrollbar-thumb-slate-300
          dark:scrollbar-thumb-slate-700
        "
      >
        <nav className="flex flex-col gap-[5px]">
          {filteredMenu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="
                  group
                  relative

                  flex
                  items-center
                  gap-[11px]

                  min-h-[46px]
                  px-[9px]
                  py-2

                  rounded-xl

                  no-underline
                  font-semibold

                  transition-all
                  duration-200

                  hover:bg-slate-100
                  dark:hover:bg-slate-800
                "
              >
                {({ isActive }) => (
                  <>
                    {/* ===================================== */}
                    {/* ACTIVE BACKGROUND */}
                    {/* ===================================== */}

                    <div
                      className={`
                        absolute
                        inset-0
                        rounded-xl
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? "bg-gradient-to-br from-indigo-600 to-indigo-500 shadow-[0_6px_15px_rgba(79,70,229,0.18)]"
                            : "bg-transparent"
                        }
                      `}
                    />

                    {/* ===================================== */}
                    {/* ICON */}
                    {/* ===================================== */}

                    <span
                      className={`
                        relative
                        z-10

                        flex
                        items-center
                        justify-center

                        w-[34px]
                        h-[34px]
                        min-w-[34px]

                        rounded-[9px]

                        transition-all
                        duration-200

                        ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        }
                      `}
                    >
                      <Icon
                        size={19}
                        strokeWidth={2.2}
                      />
                    </span>

                    {/* ===================================== */}
                    {/* TEXT */}
                    {/* ===================================== */}

                    <span
                      className={`
                        relative
                        z-10

                        flex-1

                        text-[13px]
                        font-semibold

                        transition-colors
                        duration-200

                        ${
                          isActive
                            ? "text-white"
                            : "text-slate-600 dark:text-slate-300"
                        }
                      `}
                    >
                      {item.name}
                    </span>

                    {/* ===================================== */}
                    {/* ACTIVE INDICATOR */}
                    {/* ===================================== */}

                    {isActive && (
                      <span
                        className="
                          relative
                          z-10

                          w-1
                          h-[22px]

                          rounded-full

                          bg-white

                          opacity-90
                        "
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* ================================================= */}
      {/* LOGOUT */}
      {/* ================================================= */}

      <div
        className="
          mt-3
          pt-[14px]

          border-t
          border-slate-100
          dark:border-slate-800

          transition-colors
          duration-300
        "
      >
        <button
          type="button"
          onClick={handleLogout}
          className="
            group

            w-full

            border
            border-red-100
            dark:border-red-900/50

            bg-red-50
            dark:bg-red-950/30

            text-red-600
            dark:text-red-400

            px-[10px]
            py-[9px]

            rounded-[11px]

            flex
            items-center
            gap-[11px]

            cursor-pointer

            font-semibold
            text-[13px]

            transition-all
            duration-200

            hover:bg-red-100
            dark:hover:bg-red-950/50
          "
        >
          {/* LOGOUT ICON */}

          <span
            className="
              w-[34px]
              h-[34px]
              min-w-[34px]

              rounded-[9px]

              bg-red-100
              dark:bg-red-900/40

              flex
              items-center
              justify-center

              transition-colors
              duration-200
            "
          >
            <LogOut size={18} />
          </span>

          {/* TEXT */}

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;