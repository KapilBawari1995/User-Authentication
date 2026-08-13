import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";

import { forgotPasswordRequest } from "../../features/auth/authSlice";
import ForgotOtpModal from "../../components/ForgotOtpModal";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  const { forgotLoading, forgotSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (forgotSuccess) {
      setShowOtpModal(true);
    }
  }, [forgotSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    dispatch(
      forgotPasswordRequest({
        data: {
          email: email.trim(),
        },
      })
    );
  };

  return (
    <>
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
              Reset your account password and
              <br />
              get back to your workspace securely.
            </p>

            <div style={styles.featureBox}>
              <div style={styles.featureIcon}>✓</div>

              <div>
                <h4 style={styles.featureTitle}>
                  Secure Password Recovery
                </h4>

                <p style={styles.featureText}>
                  Recover your account using a secure
                  verification process.
                </p>
              </div>
            </div>

            <div style={styles.featureBox}>
              <div style={styles.featureIcon}>✓</div>

              <div>
                <h4 style={styles.featureTitle}>
                  Email Verification
                </h4>

                <p style={styles.featureText}>
                  A verification OTP will be sent to
                  your registered email.
                </p>
              </div>
            </div>

            <div style={styles.featureBox}>
              <div style={styles.featureIcon}>✓</div>

              <div>
                <h4 style={styles.featureTitle}>
                  Quick & Secure
                </h4>

                <p style={styles.featureText}>
                  Verify your identity and create a
                  new password securely.
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
                Forgot Password?
              </h2>

              <p style={styles.subtitle}>
                Enter your registered email address
                and we'll send you a verification OTP.
              </p>

            </div>

            {/* EMAIL BOX */}

            <div style={styles.infoBox}>

              <div style={styles.infoIcon}>
                <Mail size={19} />
              </div>

              <div>
                <p style={styles.infoTitle}>
                  Password Recovery
                </p>

                <p style={styles.infoText}>
                  We'll send a 6-digit OTP to your
                  registered email address.
                </p>
              </div>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              style={styles.form}
            >

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
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    autoComplete="email"
                    style={styles.input}
                  />

                </div>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={forgotLoading}
                style={{
                  ...styles.button,
                  opacity: forgotLoading ? 0.7 : 1,
                  cursor: forgotLoading
                    ? "not-allowed"
                    : "pointer",
                }}
              >

                <span>
                  {forgotLoading
                    ? "Sending OTP..."
                    : "Send OTP"}
                </span>

                {!forgotLoading && (
                  <ArrowRight size={19} />
                )}

              </button>

            </form>

            {/* BACK TO LOGIN */}

            <div style={styles.backSection}>

              <span style={styles.backText}>
                Remember your password?
              </span>

              <Link
                to="/login"
                style={styles.loginLink}
              >
                Back to Login
              </Link>

            </div>

            {/* FOOTER */}

            <p style={styles.footer}>
              © 2026 ProjectFlow. All rights reserved.
            </p>

          </div>
        </div>

      </div>

      {/* ================= OTP MODAL ================= */}

      {showOtpModal && (
        <ForgotOtpModal
          email={email}
          onClose={() => setShowOtpModal(false)}
        />
      )}
    </>
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

  /* ================= INFO ================= */

  infoBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "14px 15px",
    borderRadius: "12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    marginBottom: "25px",
  },

  infoIcon: {
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

  infoTitle: {
    margin: 0,
    color: "#334155",
    fontSize: "13px",
    fontWeight: "700",
  },

  infoText: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "11px",
    lineHeight: "1.5",
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
    height: "52px",
    boxSizing: "border-box",
    border: "1px solid #dbe2ea",
    borderRadius: "11px",
    outline: "none",
    padding: "0 15px 0 45px",
    color: "#0f172a",
    background: "#ffffff",
    fontSize: "14px",
    transition: "all 0.2s ease",
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

  /* ================= LOGIN ================= */

  backSection: {
    marginTop: "25px",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0",
    textAlign: "center",
  },

  backText: {
    color: "#94a3b8",
    fontSize: "12px",
    marginRight: "6px",
  },

  loginLink: {
    color: "#4f46e5",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "700",
  },

  /* ================= FOOTER ================= */

  footer: {
    margin: "25px 0 0",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "11px",
  },
};

export default ForgotPassword;