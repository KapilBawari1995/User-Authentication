import Role from "../models/Role.js";


const createDefaultRole = async () => {
  try {

    const existingRole = await Role.findOne({
      name: "User"
    });


    if (existingRole) {
      console.log("✅ Default User Role already exists");
      return;
    }


    await Role.create({
      name: "User",
      description: "Default role for registered users",
      permissions: [],
      isDefault: true,
      isSystem: true,
    });


    console.log("✅ Default User Role Created");

  } catch (error) {

    console.log("❌ Default Role Error:", error.message);

  }
};


export default createDefaultRole;