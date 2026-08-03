import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPasswordRequest } from "../../features/auth/authSlice";
import ForgotOtpModal from "../../components/ForgotOtpModal";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  const {
    forgotLoading,
    forgotSuccess,
  } = useSelector((state) => state.auth);

  useEffect(() => {
      console.log("forgotSuccess :", forgotSuccess);

    if (forgotSuccess) {
      setShowOtpModal(true);
    }
  }, [forgotSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      forgotPasswordRequest({
        data: {
          email,
        },
      })
    );
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Forgot Password</h2>

          <p style={styles.subTitle}>
            Enter your registered email address to receive OTP.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />

            <button
              type="submit"
              style={styles.button}
              disabled={forgotLoading}
            >
              {forgotLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <Link to="/login" style={styles.link}>
              Back To Login
            </Link>
          </div>
        </div>
      </div>

      {showOtpModal && (
        <ForgotOtpModal
          email={email}
          onClose={() => setShowOtpModal(false)}
        />
      )}
    </>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },

  card: {
    width: 420,
    background: "#fff",
    borderRadius: 12,
    padding: 30,
    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
  },

  title: {
    textAlign: "center",
    marginBottom: 10,
  },

  subTitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
  },

  input: {
    width: "100%",
    padding: 13,
    border: "1px solid #ccc",
    borderRadius: 8,
    marginBottom: 20,
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: 13,
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 600,
  },

  link: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: 600,
  },
};

export default ForgotPassword;