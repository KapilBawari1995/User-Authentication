import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import sendEmailOtp from "../utils/emailService.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ success: false, message: "User already exists with this email!" });
      }

      const currentTime = new Date();
      if (existingUser.otpExpires > currentTime) {
        return res.status(400).json({
          success: false,
          message: "Verification is already pending for this email. Please check your inbox or wait for OTP to expire!"
        });
      } else {
        await User.deleteOne({ _id: existingUser._id });
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      otp,
      otpExpires
    });

    await sendEmailOtp(email, otp);

    res.status(201).json({
      success: true,
      message: "OTP sent to your email! Please verify within 10 minutes."
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Wrong OTP!",
      });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP Verify Successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "User is already verified!" });
    }

    const currentTime = new Date();
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP!" });
    }
    if (user.otpExpires < currentTime) {
      return res.status(400).json({ success: false, message: "OTP has expired! Please signup again." });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully! You can now login.",
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password!" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email with OTP first before logging in!"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password!" });
    }

    res.json({
      success: true,
      message: "Login successful!",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res.status(404).json({ success: false, message: "No verified user found with this email." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmailOtp(user.email, otp);

    res.status(200).json({ success: true, message: "Password reset OTP has been sent to your email." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const sendChangePasswordOtp = async (req, res) => {

  try {
    const { oldPassword } = req.body;

    console.log(req.user);

    console.log(req.user);

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect."
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendEmailOtp(user.email, otp);

    res.status(200).json({
      success: true,
      message: "OTP has been sent to your registered email to change your password."
    });
  } catch (error) {
    console.error("sendChangePasswordOtp Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};


export const verifyAndChangePassword = async (req, res) => {
  try {
    const { newPassword, otp } = req.body;
    const user = await User.findById(req.user.id || req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: "यूजर नहीं मिला!" });
    }

    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP!" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



export const verifyForgotOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "wrong  OTP!",
      });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP Verify Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const createNewPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};