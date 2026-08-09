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

import {
  logoutRequest,
} from "../../features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    permissions,
    isSuperAdmin,
  } = useSelector((state) => state.auth);

  // ================= LOGOUT =================

  const handleLogout = () => {
    dispatch(
      logoutRequest({
        navigate,
      })
    );
  };

  // ================= MENU =================

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

  // ================= PERMISSION FILTER =================

  const filteredMenu = menu.filter((item) => {
    // Super Admin ko sab menu
    if (isSuperAdmin) {
      return true;
    }

    const permission = permissions?.find(
      (p) => p.module === item.module
    );

    return permission?.view === true;
  });

  return (
    <aside style={styles.sidebar}>

      {/* ================= MENU ================= */}

      <div style={styles.menuWrapper}>
        <nav style={styles.menu}>

          {filteredMenu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  ...styles.link,

                  ...(isActive
                    ? styles.activeLink
                    : styles.inactiveLink),
                })}
              >
                {({ isActive }) => (
                  <>
                    {/* ICON */}

                    <span
                      style={{
                        ...styles.iconBox,

                        ...(isActive
                          ? styles.activeIconBox
                          : styles.inactiveIconBox),
                      }}
                    >
                      <Icon
                        size={19}
                        strokeWidth={2.2}
                      />
                    </span>

                    {/* TEXT */}

                    <span
                      style={{
                        ...styles.linkText,

                        color: isActive
                          ? "#ffffff"
                          : "#475569",
                      }}
                    >
                      {item.name}
                    </span>

                    {/* ACTIVE INDICATOR */}

                    {isActive && (
                      <span
                        style={styles.activeIndicator}
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

        </nav>
      </div>

      {/* ================= LOGOUT ================= */}

      <div style={styles.bottomSection}>
        <button
          type="button"
          onClick={handleLogout}
          style={styles.logout}
        >
          <span style={styles.logoutIcon}>
            <LogOut size={18} />
          </span>

          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};

// ================= STYLES =================

const styles = {
  sidebar: {
    width: "250px",
    height: "calc(100vh - 70px)",
    background: "#ffffff",
    position: "fixed",
    top: "70px",
    left: 0,
    display: "flex",
    flexDirection: "column",
    padding: "18px 14px",
    borderRight: "1px solid #e2e8f0",
    zIndex: 90,
  },

  menuWrapper: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },

  link: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "11px",
    padding: "8px 9px",
    minHeight: "46px",
    textDecoration: "none",
    borderRadius: "12px",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },

  activeLink: {
    background:
      "linear-gradient(135deg, #4f46e5, #6366f1)",
    boxShadow:
      "0 6px 15px rgba(79,70,229,0.18)",
  },

  inactiveLink: {
    background: "transparent",
  },

  iconBox: {
    width: "34px",
    height: "34px",
    minWidth: "34px",
    borderRadius: "9px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },

  activeIconBox: {
    background: "rgba(255,255,255,0.18)",
    color: "#ffffff",
  },

  inactiveIconBox: {
    background: "#f1f5f9",
    color: "#64748b",
  },

  linkText: {
    fontSize: "13px",
    fontWeight: "600",
    flex: 1,
  },

  activeIndicator: {
    width: "4px",
    height: "22px",
    borderRadius: "999px",
    background: "#ffffff",
    opacity: 0.9,
  },

  bottomSection: {
    borderTop: "1px solid #f1f5f9",
    paddingTop: "14px",
    marginTop: "12px",
  },

  logout: {
    width: "100%",
    border: "1px solid #fee2e2",
    background: "#fff7f7",
    color: "#dc2626",
    padding: "9px 10px",
    borderRadius: "11px",
    display: "flex",
    alignItems: "center",
    gap: "11px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
  },

  logoutIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "9px",
    background: "#fee2e2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Sidebar;