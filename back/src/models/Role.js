import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    permissions: [
      {
        module: String,
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
      },
    ],

    isDefault: {
      type: Boolean,
      default: false,
    },

    isSystem: {
      type: Boolean,
      default: false,
    },

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