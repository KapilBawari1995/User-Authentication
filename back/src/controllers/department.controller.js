import Department from "../models/department.model.js";
import User from "../models/User.js";
import createNotification from "../utils/notificationHelper.js";


export const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Department name is required",
      });
    }

    const existingDepartment = await Department.findOne({
      name: name.trim(),
    });

    if (existingDepartment) {
      return res.status(409).json({
        success: false,
        message: "Department already exists",
      });
    }

    const department = await Department.create({
      name: name.trim(),
      description,
    });
await createNotification({
  title: "Role Deleted",
  message: `Role "${role.name}" has been deleted.`,
  type: "Role",
  receiver: req.user.id,
  sender: req.user.id,
  referenceId: role._id,
  referenceType: "Role",
});


    return res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalCount: departments.length,
      data: departments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDepartmentManagers = async (req, res) => {
  try {
    const managers = await User.find()
      .populate("role", "name")
      .select("name email role department");

    const filteredManagers = managers.filter(
      (user) => user.role?.name === "Manager"
    );

    return res.status(200).json({
      success: true,
      data: filteredManagers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const assignDepartmentManager = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { managerId } = req.body;

    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    const manager = await User.findById(managerId).populate(
      "role",
      "name"
    );

    if (!manager) {
      return res.status(404).json({
        success: false,
        message: "Manager user not found",
      });
    }

    if (manager.role?.name !== "Manager") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a Manager",
      });
    }

    manager.department = departmentId;

    await manager.save();

    await createNotification({
  title: "Department Manager Assigned",
  message: `You have been assigned as manager of department "${department.name}".`,
  type: "Department",
  receiver: manager._id,
  sender: req.user.id,
  referenceId: department._id,
  referenceType: "Department",
});

    return res.status(200).json({
      success: true,
      message: "Manager assigned successfully",
      data: manager,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};