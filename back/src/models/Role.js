import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    // =====================================================
    // ROLE NAME
    // =====================================================

    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // =====================================================
    // DESCRIPTION
    // =====================================================

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // =====================================================
    // DASHBOARD / DATA SCOPE
    // =====================================================

    scope: {
      type: String,
      enum: [
        "global",
        "project",
        "hr",
        "self",
      ],
      default: "self",
    },

    // =====================================================
    // PERMISSIONS
    // =====================================================

   permissions: [
  {
    module: {
      type: String,
      required: true,
    },

    view: {
      type: Boolean,
      default: false,
    },

    create: {
      type: Boolean,
      default: false,
    },

    edit: {
      type: Boolean,
      default: false,
    },

    delete: {
      type: Boolean,
      default: false,
    },

    addMember: {
      type: Boolean,
      default: false,
    },
  },
],
    // =====================================================
    // DEFAULT ROLE
    // =====================================================

    isDefault: {
      type: Boolean,
      default: false,
    },

    // =====================================================
    // SYSTEM ROLE
    // =====================================================

    isSystem: {
      type: Boolean,
      default: false,
    },

    // =====================================================
    // CREATED BY
    // =====================================================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Role", roleSchema);