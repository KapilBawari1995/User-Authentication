import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/auth/verify-otp",
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
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-4">
          Verify OTP
        </h2>

        <p className="text-center mb-5">
          OTP sent to
          <br />
          <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6 Digit OTP"
            className="w-full border p-3 rounded"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;