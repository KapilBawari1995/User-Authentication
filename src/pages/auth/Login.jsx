import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginRequest } from "../../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    dispatch(loginRequest({ data: formData, navigate }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome! 👋</h2>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
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

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.forgotWrapper}>
            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            style={styles.button}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

// Modern & Beautiful Styling
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "40px 30px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  },

  header: {
    marginBottom: "25px",
    textAlign: "center",
  },

  title: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    color: "#1e293b",
    fontWeight: "700",
  },

  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "15px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
  },

  forgotWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "18px",
  },

  forgotLink: {
    color: "#4f46e5",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
  },

  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  footerText: {
    marginTop: "25px",
    textAlign: "center",
    fontSize: "14px",
    color: "#64748b",
  },

  link: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;