import Role from "../models/Role.js";


export const assignPermissionToRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissions } = req.body;

    if (!permissions || !Array.isArray(permissions)) {
      return res.status(400).json({
        success: false,
        message: "Permissions are required.",
      });
    }

    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    role.permissions = permissions;

    await role.save();

    return res.status(200).json({
      success: true,
      message: "Permissions assigned successfully.",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;

    const role = await Role.findById(roleId).select(
      "name permissions"
    );

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: role.permissions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};