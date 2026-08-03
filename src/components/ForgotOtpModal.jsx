import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyForgotPasswordOtpRequest } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";



const ForgotOtpModal = ({ email, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const { verifyForgotPasswordLoading } = useSelector(
    (state) => state.auth
  );

  const handleVerify = () => {
    if (otp.length !== 6) {
      alert("Please enter 6 digit OTP");
      return;
    }

    dispatch(
      verifyForgotPasswordOtpRequest({
        data: {
          email,
          otp,
        },
            navigate,

      })
    );
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Verify OTP</h2>

        <p style={styles.text}>
          Enter the OTP sent to
        </p>

        <p style={styles.email}>{email}</p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          placeholder="Enter 6 Digit OTP"
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, ""))
          }
          style={styles.input}
        />

        <button
          onClick={handleVerify}
          style={styles.verifyBtn}
          disabled={verifyForgotPasswordLoading}
        >
          {verifyForgotPasswordLoading
            ? "Verifying..."
            : "Verify OTP"}
        </button>

        <button
          onClick={onClose}
          style={styles.cancelBtn}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  modal: {
    width: "420px",
    background: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 20px 40px rgba(0,0,0,.25)",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
  },

  text: {
    textAlign: "center",
    color: "#666",
    marginBottom: "5px",
  },

  email: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "14px",
    fontSize: "18px",
    textAlign: "center",
    letterSpacing: "6px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: "20px",
  },

  verifyBtn: {
    width: "100%",
    padding: "13px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },

  cancelBtn: {
    width: "100%",
    padding: "13px",
    marginTop: "10px",
    background: "#e5e7eb",
    color: "#111827",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ForgotOtpModal;