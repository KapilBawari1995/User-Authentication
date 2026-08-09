import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Role from "../models/Role.js";

const createSuperAdmin = async () => {
  try {
    // 1. Super Admin Role check/create
    let superAdminRole = await Role.findOne({
      name: "Super Admin",
    });

    if (!superAdminRole) {
      superAdminRole = await Role.create({
        name: "Super Admin",
        description: "System Super Admin",
        permissions: ["*"],
        isSystem: true,
        isDefault: false,
      });

      console.log("✅ Super Admin Role Created.");
    }

    // 2. Default User Role check/create
    let userRole = await Role.findOne({
      name: "User",
    });

    if (!userRole) {
      userRole = await Role.create({
        name: "User",
        description: "Default User",
        permissions: [],
        isDefault: true,
        isSystem: true,
      });

      console.log("✅ Default User Role Created.");
    }

    // 3. Super Admin User check
    const admin = await User.findOne({
      isSuperAdmin: true,
    });

    if (admin) {
      console.log("✅ Super Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // 4. Create Super Admin
    await User.create({
      name: "Super Admin",
      email: "kapil.bawari12@gmail.com",
      password: hashedPassword,
      role: superAdminRole._id,
      isSuperAdmin: true,
      isVerified: true,
    });

    console.log("✅ Super Admin Created Successfully.");
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
};

export default createSuperAdmin;