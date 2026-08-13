import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";
import createNotification from "../utils/notificationHelper.js";


export const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const defaultPassword = "";

    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Role are required.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const roleData = await Role.findById(role);

    if (!roleData) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isVerified: true,
      mustChangePassword: true,
    });

    const createdUser = await User.findById(user._id)
      .select("-password -otp -otpExpiry")
      .populate("role", "name");

await createNotification({
  title: "New User Created",
  message: `User "${user.name}" has been created.`,
  type: "User",
  receiver: user._id,
  sender: req.user.id,
  referenceId: user._id,
  referenceType: "User",
});


    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: createdUser,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { search = "", status = "" } = req.query;

    const filter = {
      isSuperAdmin: false,
    };

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (status) {
      filter.isActive = status === "active";
    }

    const users = await User.find(filter)
      .select("-password -otp -otpExpiry")
      .populate("role", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalUsers: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("-password -otp -otpExpiry")
      .populate("role", "name");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, isActive } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({
        email,
        _id: { $ne: id },
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists.",
        });
      }
    }

    if (role) {
      const roleExists = await Role.findById(role);

      if (!roleExists) {
        return res.status(404).json({
          success: false,
          message: "Role not found.",
        });
      }

      user.role = role;
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (typeof isActive === "boolean") {
      user.isActive = isActive;
    }

    await user.save();

    const updatedUser = await User.findById(id)
      .select("-password -otp -otpExpiry")
      .populate("role", "name");

await createNotification({
  title: "User Updated",
  message: `User "${user.name}" has been updated.`,
  type: "User",
  receiver: user._id,
  sender: req.user.id,
  referenceId: user._id,
  referenceType: "User",
});


    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isSuperAdmin) {
      return res.status(403).json({
        success: false,
        message: "Super Admin cannot be deleted.",
      });
    }

    await User.findByIdAndDelete(id);
await createNotification({
  title: "User Updated",
  message: `User "${user.name}" has been updated.`,
  type: "User",
  receiver: user._id,
  sender: req.user.id,
  referenceId: user._id,
  referenceType: "User",
});


    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .populate("role", "name");


        if (!user) {

            return res.status(404).json({

                success:false,

                message:"User not found"

            });

        }


        return res.status(200).json({

            success:true,

            data:user

        });


    } catch(error) {


        return res.status(500).json({

            success:false,

            message:error.message

        });


    }

};