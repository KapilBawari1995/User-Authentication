import Role from "../models/Role.js";


export const createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    const roleExists = await Role.findOne({ name });

    if (roleExists) {
      return res.status(400).json({
        success: false,
        message: "Role already exists.",
      });
    }

    const role = await Role.create({
      name,
      description,
      permissions,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Role created successfully.",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;

    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    role.name = name || role.name;
    role.description = description || role.description;
    role.permissions = permissions || role.permissions;

    await role.save();

    res.status(200).json({
      success: true,
      message: "Role updated successfully.",
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Role not found.",
      });
    }

    if (role.isSystem) {
      return res.status(403).json({
        success: false,
        message: "System role cannot be deleted.",
      });
    }

    await role.deleteOne();

    res.status(200).json({
      success: true,
      message: "Role deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};