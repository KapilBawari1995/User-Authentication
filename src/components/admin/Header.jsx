import React from "react";
import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header style={styles.header}>

      <div style={styles.logo}>
        Admin Portal
      </div>

      <div style={styles.rightSection}>

        <button style={styles.iconBtn}>
          <Bell size={20} />
        </button>

        <div style={styles.profile}>
          <User size={20} />
          <span>Admin</span>
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
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },

  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#4f46e5",
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  iconBtn: {
    border: "none",
    background: "#f1f5f9",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#f8fafc",
    padding: "8px 15px",
    borderRadius: "8px",
    fontWeight: "600",
  },
};


export default Header;