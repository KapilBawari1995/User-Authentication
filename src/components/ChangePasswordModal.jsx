import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendChangePasswordOtpRequest,
  verifyAndChangePasswordRequest,
  clearChangePasswordState,
} from "../features/auth/authSlice";

const ChangePasswordModal = ({ onClose }) => {
  const dispatch = useDispatch();
  
  const { changePassLoading, changePassOtpSent } = useSelector(
    (state) => state.auth
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();
    dispatch(
      sendChangePasswordOtpRequest({
        data: { oldPassword, newPassword },
      })
    );
  };

  const handleVerifyAndChange = (e) => {
    e.preventDefault();
    dispatch(
      verifyAndChangePasswordRequest({
        data: { newPassword, otp },
        onSuccessCallback: () => {
          dispatch(clearChangePasswordState());
          onClose(); 
        },
      })
    );
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.headerContainer}>
          <h3 style={styles.modalTitle}>(Change Password)</h3>
          <button onClick={onClose} style={styles.closeXBtn}>×</button>
        </div>

        {!changePassOtpSent ? (
         <form onSubmit={handleSendOtp} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>(Old Password)</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                style={styles.input}
placeholder="Enter your current password"              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>(New Password)</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={styles.input}
placeholder="Enter your new password"              />
              
            </div>

            <button type="submit" disabled={changePassLoading} style={styles.submitBtn}>
{changePassLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          /* ================= Step 2 Form ================= */
          <form onSubmit={handleVerifyAndChange} style={styles.form}>
            <p style={styles.infoText}>
An OTP has been sent to your registered email address. Please enter it below:            </p>

            <div style={styles.inputGroup}>
              <label style={styles.label}>6-digit OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength="6"
                style={styles.input}
placeholder="Enter 6-digit OTP"                
              />
            </div>

            <button type="submit" disabled={changePassLoading} style={styles.submitBtn}>
{changePassLoading ? "Updating Password..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  modalTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#1e293b",
  },
  closeXBtn: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "#64748b",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  },
  submitBtn: {
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },
  infoText: {
    fontSize: "13px",
    color: "#64748b",
    margin: "0 0 10px 0",
    textAlign: "left",
  },
};

export default ChangePasswordModal;