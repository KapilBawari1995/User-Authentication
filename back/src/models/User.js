import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    isSuperAdmin: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    avatar: {
      type: String,
      default: "",
    },

    otp: String,
    otpExpiry: Date,

    // =====================================================
    // USER SETTINGS
    // =====================================================

    settings: {
      notifications: {
        type: Boolean,
        default: true,
      },

      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },

      language: {
        type: String,
        enum: ["English", "Hindi"],
        default: "English",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);