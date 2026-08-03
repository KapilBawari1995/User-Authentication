import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import ChangePasswordModal from "../../components/ChangePasswordModal";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2 style={styles.navLogo}>My App</h2>

        <div style={styles.profileContainer}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={styles.profileBtn}
          >
            {user?.name || "User"} ▾
          </button>

          {dropdownOpen && (
            <div style={styles.dropdownMenu}>
              <button
                onClick={() => {
                  setIsChangePasswordOpen(true);
                  setDropdownOpen(false);
                }}
                style={styles.dropdownItem}
              >
                🔐 Change Password
              </button>

              <button
                onClick={handleLogout}
                style={{ ...styles.dropdownItem, color: "#ef4444" }}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <div style={styles.card}>
        <div style={styles.avatar}>🎉</div>

        <h1 style={styles.title}>
          Welcome,{" "}
          <span style={styles.nameHighlight}>
            {user?.name || "User"}
          </span>
          !
        </h1>

        <p style={styles.subtitle}>
          You have successfully logged into your account.
        </p>

        <p style={styles.emailText}>
          {user?.email || "user@example.com"}
        </p>

        <div style={styles.badge}>Login Successful ✅</div>

        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Change Password Modal */}
      {isChangePasswordOpen && (
        <ChangePasswordModal
          onClose={() => setIsChangePasswordOpen(false)}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "#f4f7fb",
    fontFamily: "Segoe UI, sans-serif",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  navLogo: {
    margin: 0,
    color: "#4f46e5",
    fontSize: "24px",
    fontWeight: "700",
  },

  profileContainer: {
    position: "relative",
  },

  profileBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    color: "#334155",
    fontSize: "14px",
  },

  dropdownMenu: {
    position: "absolute",
    right: 0,
    top: "50px",
    width: "200px",
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    zIndex: 100,
  },

  dropdownItem: {
    width: "100%",
    padding: "14px 16px",
    border: "none",
    background: "#fff",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "14px",
    color: "#374151",
    borderBottom: "1px solid #f1f5f9",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    margin: "60px auto",
    background: "#fff",
    borderRadius: "20px",
    padding: "45px 35px",
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
  },

  avatar: {
    fontSize: "60px",
    marginBottom: "20px",
  },

  title: {
    margin: 0,
    fontSize: "30px",
    color: "#1f2937",
    fontWeight: "700",
  },

  nameHighlight: {
    color: "#4f46e5",
  },

  subtitle: {
    marginTop: "12px",
    color: "#6b7280",
    fontSize: "15px",
    lineHeight: "24px",
  },

  emailText: {
    marginTop: "18px",
    color: "#4b5563",
    fontSize: "15px",
    fontWeight: "500",
  },

  badge: {
    display: "inline-block",
    marginTop: "25px",
    padding: "8px 18px",
    background: "#dcfce7",
    color: "#166534",
    borderRadius: "999px",
    fontWeight: "600",
    fontSize: "14px",
  },

  logoutButton: {
    marginTop: "35px",
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#ef4444",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Welcome;