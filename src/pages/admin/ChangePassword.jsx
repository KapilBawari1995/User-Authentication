import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Save,
  X,
} from "lucide-react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Redux Saga Dispatch yaha karna
    // dispatch(changePasswordRequest(formData));
  };

  return (
    <div className="change-password-page">

      <div className="password-card">

        <div className="password-header">
          <ShieldCheck size={55} />
          <h2>Change Password</h2>
          <p>Update your account password securely.</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Current Password */}

          <div className="form-group">
            <label>
              <Lock size={18} />
              Current Password
            </label>

            <div className="password-input">

              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={() => togglePassword("current")}
              >
                {showPassword.current ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>
          </div>

          {/* New Password */}

          <div className="form-group">
            <label>
              <Lock size={18} />
              New Password
            </label>

            <div className="password-input">

              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={() => togglePassword("new")}
              >
                {showPassword.new ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>
          </div>

          {/* Confirm Password */}

          <div className="form-group">
            <label>
              <Lock size={18} />
              Confirm Password
            </label>

            <div className="password-input">

              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                onClick={() => togglePassword("confirm")}
              >
                {showPassword.confirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>
          </div>

          {/* Password Rules */}

          <div className="password-rules">
            <h4>Password Requirements</h4>

            <ul>
              <li>✔ Minimum 8 characters</li>
              <li>✔ One uppercase letter</li>
              <li>✔ One lowercase letter</li>
              <li>✔ One number</li>
              <li>✔ One special character</li>
            </ul>
          </div>

          {/* Buttons */}

          <div className="button-group">

            <button type="button" className="cancel-btn">
              <X size={18} />
              Cancel
            </button>

            <button type="submit" className="update-btn">
              <Save size={18} />
              Update Password
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ChangePassword;