import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  signupRequest,
  clearSignupState,
} from "../../features/auth/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signupLoading, signupSuccess, signupError } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      signupRequest({
        data: formData,
      })
    );
  };

useEffect(() => {
  if (signupSuccess) {
    navigate("/verify-otp");
  }
}, [signupSuccess, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearSignupState());
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-5">
          Create Account
        </h2>

        {signupError && (
          <p className="text-red-500 text-center mb-3">{signupError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />

          <button
            disabled={signupLoading}
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            {signupLoading ? "Sending OTP..." : "Signup"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have account?
          <Link to="/login" className="text-blue-600 ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;