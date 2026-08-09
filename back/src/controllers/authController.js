import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import sendEmailOtp from "../utils/emailService.js";

import Role from "../models/Role.js";



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

    const defaultRole = await Role.findOne({
      isDefault: true
    });




    if (!defaultRole) {
      return res.status(400).json({
        success: false,
        message: "Default User Role not found"
      });
    }

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: defaultRole._id,
      isVerified: false,
      otp,
      otpExpires,
        mustChangePassword: false,

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

    const user = await User.findOne({ email }).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id);


    // Admin / Super Admin ko force password change nahi karna
    const requirePasswordChange =
      user.mustChangePassword && !user.isSuperAdmin;


    user.password = undefined;
    user.otp = undefined;
    user.otpExpiry = undefined;


    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user,
      mustChangePassword: requirePasswordChange,
    });


  } catch (error) {

    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




export const sendChangePasswordOtp = async (req, res) => {
  try {
    const { oldPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Sirf normal users ke liye old password verify karo
    if (!user.mustChangePassword) {
      if (!oldPassword) {
        return res.status(400).json({
          success: false,
          message: "Old password is required.",
        });
      }

      const isMatch = await bcrypt.compare(
        oldPassword,
        user.password
      );

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Old password is incorrect.",
        });
      }
    }

    // OTP Generate
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendEmailOtp(user.email, otp);

    return res.status(200).json({
      success: true,
      message: user.mustChangePassword
        ? "Welcome! Please verify OTP and set your new password."
        : "OTP has been sent to your registered email.",
      firstLogin: user.mustChangePassword,
    });

  } catch (error) {
    console.error("sendChangePasswordOtp Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const verifyAndChangePassword = async (req, res) => {
  try {
    const { newPassword, otp } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required.",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password is required.",
      });
    }

    if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP
    user.otp = null;
    user.otpExpiry = null;

    // First login completed
    user.mustChangePassword = false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
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


// ================= LOGOUT =================

export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






