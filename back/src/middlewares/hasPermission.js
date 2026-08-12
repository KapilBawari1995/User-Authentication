import User from "../models/User.js";

const hasPermission = (moduleName, action) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).populate("role");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // ==========================================
      // SUPER ADMIN = FULL ACCESS
      // ==========================================

      if (user.isSuperAdmin) {
        return next();
      }

      // ==========================================
      // ROLE CHECK
      // ==========================================

      if (!user.role) {
        return res.status(403).json({
          success: false,
          message: "User role not assigned",
        });
      }

      const permissions = user.role.permissions || [];

      // ==========================================
      // FIND MODULE PERMISSION
      // ==========================================

      const modulePermission = permissions.find(
        (permission) =>
          permission.module?.toLowerCase() ===
          moduleName.toLowerCase()
      );

      if (!modulePermission) {
        return res.status(403).json({
          success: false,
          message: `You do not have permission to access ${moduleName}`,
        });
      }

      // ==========================================
      // CHECK ACTION
      // ==========================================

      if (!modulePermission[action]) {
        return res.status(403).json({
          success: false,
          message: `You do not have ${action} permission for ${moduleName}`,
        });
      }

      next();
    } catch (error) {
      console.error("PERMISSION MIDDLEWARE ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default hasPermission;