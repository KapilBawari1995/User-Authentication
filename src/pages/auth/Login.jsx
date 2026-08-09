import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { loginRequest } from "../../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginLoading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginRequest({
        data: formData,
        navigate,
      })
    );
  };

  return (
    <div style={styles.container}>
      {/* ================= LEFT SECTION ================= */}

      <div style={styles.leftSection}>
        <div style={styles.leftContent}>
          <div style={styles.brandIcon}>
            <ShieldCheck size={28} />
          </div>

          <h1 style={styles.brandTitle}>
            ProjectFlow
          </h1>

          <p style={styles.brandSubtitle}>
            Manage projects, teams and tasks
            <br />
            from one powerful workspace.
          </p>

          <div style={styles.featureBox}>
            <div style={styles.featureIcon}>
              ✓
            </div>

            <div>
              <h4 style={styles.featureTitle}>
                Secure Workspace
              </h4>

              <p style={styles.featureText}>
                Your projects and team data are protected.
              </p>
            </div>
          </div>

          <div style={styles.featureBox}>
            <div style={styles.featureIcon}>
              ✓
            </div>

            <div>
              <h4 style={styles.featureTitle}>
                Team Collaboration
              </h4>

              <p style={styles.featureText}>
                Assign projects and tasks with ease.
              </p>
            </div>
          </div>

          <div style={styles.featureBox}>
            <div style={styles.featureIcon}>
              ✓
            </div>

            <div>
              <h4 style={styles.featureTitle}>
                Smart Management
              </h4>

              <p style={styles.featureText}>
                Track progress and manage your workflow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}

      <div style={styles.rightSection}>
        <div style={styles.card}>

          {/* Header */}

         
          {/* Form */}

          <form
            onSubmit={handleSubmit}
            style={styles.form}
          >
            {/* Email */}

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Email Address
              </label>

              <div style={styles.inputWrapper}>
                <Mail
                  size={19}
                  style={styles.inputIcon}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            {/* Password */}

            <div style={styles.inputGroup}>
              <div style={styles.labelRow}>
                <label style={styles.label}>
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  style={styles.forgotLink}
                >
                  Forgot Password?
                </Link>
              </div>

              <div style={styles.inputWrapper}>
                <Lock
                  size={19}
                  style={styles.inputIcon}
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    ...styles.input,
                    paddingRight: "48px",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  style={styles.eyeButton}
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loginLoading}
              style={{
                ...styles.button,
                opacity: loginLoading ? 0.7 : 1,
                cursor: loginLoading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              <span>
                {loginLoading
                  ? "Signing in..."
                  : "Sign In"}
              </span>

              {!loginLoading && (
                <ArrowRight size={19} />
              )}
            </button>
          </form>

          {/* Divider */}

          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>

            <span style={styles.dividerText}>
              New to ProjectFlow?
            </span>

            <span style={styles.dividerLine}></span>
          </div>

          {/* Signup */}

          <Link
            to="/signup"
            style={styles.signupButton}
          >
            Create an account
          </Link>

          {/* Footer */}

          <p style={styles.footer}>
            © 2026 ProjectFlow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

// ================= STYLES =================

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    fontFamily:
      "Inter, Segoe UI, Arial, sans-serif",
    background: "#f8fafc",
  },

  // ================= LEFT =================

  leftSection: {
    width: "46%",
    minHeight: "100vh",
    background:
      "linear-gradient(145deg, #312e81 0%, #4f46e5 55%, #6366f1 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
    boxSizing: "border-box",
  },

  leftContent: {
    width: "100%",
    maxWidth: "470px",
  },

  brandIcon: {
    width: "58px",
    height: "58px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.15)",
    border:
      "1px solid rgba(255,255,255,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    marginBottom: "22px",
  },

  brandTitle: {
    margin: 0,
    color: "#ffffff",
    fontSize: "38px",
    fontWeight: "800",
    letterSpacing: "-1px",
  },

  brandSubtitle: {
    marginTop: "14px",
    marginBottom: "42px",
    color: "rgba(255,255,255,0.78)",
    fontSize: "16px",
    lineHeight: "1.7",
  },

  featureBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "24px",
  },

  featureIcon: {
    width: "30px",
    height: "30px",
    minWidth: "30px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.16)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
  },

  featureTitle: {
    margin: 0,
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "700",
  },

  featureText: {
    margin: "5px 0 0",
    color: "rgba(255,255,255,0.68)",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  // ================= RIGHT =================

  rightSection: {
    flex: 1,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
    boxSizing: "border-box",
    background: "#f8fafc",
  },

  card: {
    width: "100%",
    maxWidth: "440px",
    background: "#ffffff",
    borderRadius: "22px",
    padding: "42px",
    boxSizing: "border-box",
    border: "1px solid #e2e8f0",
    boxShadow:
      "0 20px 50px rgba(15,23,42,0.08)",
  },

  // ================= HEADER =================

  header: {
    textAlign: "center",
    marginBottom: "32px",
  },

  mobileLogo: {
    width: "48px",
    height: "48px",
    margin: "0 auto 18px",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    margin: 0,
    color: "#0f172a",
    fontSize: "27px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    margin: "9px 0 0",
    color: "#64748b",
    fontSize: "14px",
  },

  // ================= FORM =================

  form: {
    display: "flex",
    flexDirection: "column",
  },

  inputGroup: {
    marginBottom: "21px",
  },

  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#334155",
    fontSize: "13px",
    fontWeight: "700",
  },

  inputWrapper: {
    position: "relative",
    width: "100%",
  },

  inputIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    pointerEvents: "none",
  },

  input: {
    width: "100%",
    height: "50px",
    boxSizing: "border-box",
    border: "1px solid #dbe2ea",
    borderRadius: "11px",
    outline: "none",
    padding:
      "0 15px 0 45px",
    color: "#0f172a",
    background: "#ffffff",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },

  eyeButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    color: "#64748b",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
  },

  forgotLink: {
    color: "#4f46e5",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "700",
  },

  // ================= BUTTON =================

  button: {
    width: "100%",
    height: "51px",
    border: "none",
    borderRadius: "11px",
    background:
      "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    fontSize: "14px",
    fontWeight: "700",
    boxShadow:
      "0 8px 18px rgba(79,70,229,0.22)",
    marginTop: "3px",
  },

  // ================= DIVIDER =================

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "27px 0 18px",
  },

  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e2e8f0",
  },

  dividerText: {
    color: "#94a3b8",
    fontSize: "11px",
    whiteSpace: "nowrap",
  },

  // ================= SIGNUP =================

  signupButton: {
    height: "48px",
    border: "1px solid #c7d2fe",
    borderRadius: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#4f46e5",
    background: "#f8f8ff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "700",
  },

  footer: {
    margin: "25px 0 0",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "11px",
  },
};

export default Login;