import Permission from "../models/Permission.js";

// ================= Create Permission =================

export const createPermission = async (req, res) => {
  try {
    const { name, code, description, module } = req.body;

    const permissionExists = await Permission.findOne({ code });

    if (permissionExists) {
      return res.status(400).json({
        success: false,
        message: "Permission already exists.",
      });
    }

    const permission = await Permission.create({
      name,
      code,
      description,
      module,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Permission created successfully.",
      data: permission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get All Permissions =================

export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: permissions.length,
      data: permissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get Permission By Id =================

export const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: permission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Update Permission =================

export const updatePermission = async (req, res) => {
  try {
    const { name, code, description, module } = req.body;

    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found.",
      });
    }

    permission.name = name || permission.name;
    permission.code = code || permission.code;
    permission.description = description || permission.description;
    permission.module = module || permission.module;

    await permission.save();

    res.status(200).json({
      success: true,
      message: "Permission updated successfully.",
      data: permission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Delete Permission =================

export const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({
        success: false,
        message: "Permission not found.",
      });
    }

    if (permission.isSystem) {
      return res.status(403).json({
        success: false,
        message: "System permission cannot be deleted.",
      });
    }

    await permission.deleteOne();

    res.status(200).json({
      success: true,
      message: "Permission deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};