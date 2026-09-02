import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";

const VerifyOtp = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("verifyEmail");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email not found. Please signup again.");
      navigate("/signup");
      return;
    }

    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "https://user-authentication-1-6l2c.onrender.com/api/v1/auth/verify-otp",
        
        {
          email,
          otp,
        }
      );

      if (data.success) {
        alert(data.message);

        localStorage.removeItem("verifyEmail");

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        navigate("/login");
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
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
            Verify your account and start
            <br />
            managing your projects securely.
          </p>

          <div style={styles.featureBox}>
            <div style={styles.featureIcon}>✓</div>

            <div>
              <h4 style={styles.featureTitle}>
                Secure Verification
              </h4>

              <p style={styles.featureText}>
                Your account is protected with secure
                email verification.
              </p>
            </div>
          </div>

          <div style={styles.featureBox}>
            <div style={styles.featureIcon}>✓</div>

            <div>
              <h4 style={styles.featureTitle}>
                Quick Verification
              </h4>

              <p style={styles.featureText}>
                Enter the OTP sent to your email to
                continue.
              </p>
            </div>
          </div>

          <div style={styles.featureBox}>
            <div style={styles.featureIcon}>✓</div>

            <div>
              <h4 style={styles.featureTitle}>
                Secure Workspace
              </h4>

              <p style={styles.featureText}>
                Access your projects and collaborate
                with your team securely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}

      <div style={styles.rightSection}>
        <div style={styles.card}>

          {/* HEADER */}

          <div style={styles.header}>
            <div style={styles.logo}>
              <LockKeyhole size={23} />
            </div>

            <h2 style={styles.title}>
              Verify Your Account
            </h2>

            <p style={styles.subtitle}>
              Enter the 6-digit verification code
              sent to your email address.
            </p>
          </div>

          {/* EMAIL */}

          <div style={styles.emailBox}>
            <div style={styles.emailIcon}>
              <Mail size={18} />
            </div>

            <div>
              <p style={styles.emailLabel}>
                OTP sent to
              </p>

              <p style={styles.email}>
                {email || "Email not found"}
              </p>
            </div>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleVerifyOtp}
            style={styles.form}
          >
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Verification Code
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  )
                }
                placeholder="Enter 6 digit OTP"
                autoComplete="one-time-code"
                style={styles.input}
                required
              />

              <p style={styles.helper}>
                Enter the 6-digit code received in your
                email.
              </p>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              <span>
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </span>

              {!loading && (
                <ArrowRight size={19} />
              )}
            </button>
          </form>

          {/* FOOTER */}

          <p style={styles.footer}>
            © 2026 ProjectFlow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ================================================= */
/* STYLES */
/* ================================================= */

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    fontFamily:
      "Inter, Segoe UI, Arial, sans-serif",
    background: "#f8fafc",
  },

  /* ================= LEFT ================= */

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
    background:
      "rgba(255,255,255,0.15)",
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
    background:
      "rgba(255,255,255,0.16)",
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

  /* ================= RIGHT ================= */

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

  /* ================= HEADER ================= */

  header: {
    textAlign: "center",
    marginBottom: "28px",
  },

  logo: {
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
    lineHeight: "1.6",
  },

  /* ================= EMAIL ================= */

  emailBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px 15px",
    borderRadius: "12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    marginBottom: "24px",
  },

  emailIcon: {
    width: "38px",
    height: "38px",
    minWidth: "38px",
    borderRadius: "10px",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  emailLabel: {
    margin: 0,
    color: "#94a3b8",
    fontSize: "11px",
    fontWeight: "600",
  },

  email: {
    margin: "3px 0 0",
    color: "#334155",
    fontSize: "13px",
    fontWeight: "700",
    wordBreak: "break-word",
  },

  /* ================= FORM ================= */

  form: {
    display: "flex",
    flexDirection: "column",
  },

  inputGroup: {
    marginBottom: "22px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#334155",
    fontSize: "13px",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    height: "52px",
    boxSizing: "border-box",
    border: "1px solid #dbe2ea",
    borderRadius: "11px",
    outline: "none",
    padding: "0 15px",
    color: "#0f172a",
    background: "#ffffff",
    fontSize: "18px",
    fontWeight: "700",
    letterSpacing: "7px",
    textAlign: "center",
  },

  helper: {
    margin: "8px 0 0",
    color: "#94a3b8",
    fontSize: "11px",
    textAlign: "center",
  },

  /* ================= BUTTON ================= */

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
  },

  /* ================= FOOTER ================= */

  footer: {
    margin: "27px 0 0",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "11px",
  },
};

export default VerifyOtp;