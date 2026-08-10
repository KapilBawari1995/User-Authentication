
import React from "react";
import { Bell, User, ChevronDown, ShieldCheck } from "lucide-react";
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
    <header style={styles.header}>


      <div style={styles.logoSection}>

        <div style={styles.logoIcon}>
          <ShieldCheck size={22} />
        </div>

        <div>
          <h2 style={styles.logo}>
            Task Portal
          </h2>

          <p style={styles.subtitle}>
            Management System
          </p>
        </div>

      </div>

   

      <div style={styles.rightSection}>


        <button
          style={styles.iconBtn}
          title="Notifications"
        >
          <Bell size={20} />

          <span style={styles.notificationDot} />
        </button>

        {/* PROFILE */}

        <div style={styles.profile}>

          <div style={styles.avatar}>
            {userName
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <div style={styles.profileInfo}>

            <p style={styles.userName}>
              {userName}
            </p>

            <span style={styles.role}>
              {roleName}
            </span>

          </div>

          <ChevronDown
            size={17}
            color="#64748b"
          />

        </div>

      </div>

    </header>
  );
};

const styles = {
  header: {
    height: "70px",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
    borderBottom: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logoIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 5px 12px rgba(79,70,229,.20)",
  },

  logo: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
  },

  subtitle: {
    margin: "2px 0 0",
    fontSize: "10px",
    color: "#94a3b8",
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  iconBtn: {
    position: "relative",
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#475569",
  },

  notificationDot: {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#ef4444",
    border: "2px solid #ffffff",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "6px 10px 6px 7px",
    borderRadius: "12px",
    minWidth: "165px",
  },

  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #eef2ff, #ede9fe)",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    fontWeight: "700",
  },

  profileInfo: {
    flex: 1,
    minWidth: 0,
  },

  userName: {
    margin: 0,
    fontSize: "13px",
    fontWeight: "700",
    color: "#1e293b",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  role: {
    display: "block",
    marginTop: "2px",
    fontSize: "10px",
    color: "#64748b",
    fontWeight: "500",
  },
};

export default Header;
