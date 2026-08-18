import Role from "../models/Role.js";
import User from "../models/User.js";

const createDefaultRole = async () => {
  try {
    // =====================================================
    // DEFAULT USER ROLE
    // =====================================================

    let userRole = await Role.findOne({
      name: "User",
    });

    if (userRole) {
      console.log("✅ Default User Role already exists");
    } else {
      userRole = await Role.create({
        name: "User",
        description: "Default role for registered users",
        permissions: [],
        isDefault: true,
        isSystem: true,
        scope: "self",
      });

      console.log("✅ Default User Role Created");
    }

    // =====================================================
    // SUPER ADMIN ROLE
    // =====================================================

    let superAdminRole = await Role.findOne({
      name: "Super Admin",
    });

    if (superAdminRole) {
      console.log("✅ Super Admin Role already exists");
    } else {
      superAdminRole = await Role.create({
        name: "Super Admin",
        description: "Full system access",
        permissions: [
          {
            module: "Dashboard",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "Tasks",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "Projects",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "Calendar",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "Users",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "Roles",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "Permission",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "AssignManager",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "Department",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "Reports",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "Notifications",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "Profile",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "Settings",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
          {
            module: "Change Password",
            view: true,
            create: true,
            edit: true,
            delete: true,
            addMember: true,
          },
        ],
        isDefault: false,
        isSystem: true,
        scope: "global",
      });

      console.log("✅ Super Admin Role Created");
    }

    // =====================================================
    // ASSIGN SUPER ADMIN ROLE
    // =====================================================

    const superAdmin = await User.findOne({
      isSuperAdmin: true,
    });

    if (!superAdmin) {
      console.log("⚠️ Super Admin User not found");
      return;
    }

    if (
      !superAdmin.role ||
      superAdmin.role.toString() !==
        superAdminRole._id.toString()
    ) {
      superAdmin.role = superAdminRole._id;

      await superAdmin.save();

      console.log(
        "✅ Super Admin Role assigned to Super Admin User"
      );
    } else {
      console.log(
        "✅ Super Admin Role already assigned"
      );
    }
  } catch (error) {
    console.log(
      "❌ Default Role Error:",
      error.message
    );
  }
};

export default createDefaultRole;