import User from "../models/User.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Role from "../models/Role.js";

export const getDashboard = async (req, res) => {
  try {
    // =====================================================
    // AUTH CHECK
    // =====================================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // =====================================================
    // GET LOGGED-IN USER + ROLE
    // =====================================================

    const user = await User.findById(
      req.user.id || req.user._id
    ).populate("role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // =====================================================
    // ROLE CHECK
    // =====================================================

    const role = user.role;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: "User role is not assigned",
      });
    }

    const scope = role.scope;

    // =====================================================
    // GLOBAL / ADMIN DASHBOARD
    // =====================================================

    if (scope === "global" || user.isSuperAdmin) {
      // ---------------------------------------------------
      // GET MANAGER ROLE
      // ---------------------------------------------------

      const managerRole = await Role.findOne({
        name: { $regex: /^manager$/i },
      }).select("_id");

      // ---------------------------------------------------
      // GLOBAL COUNTS
      // ---------------------------------------------------

      const [
        totalUsers,
        activeUsers,
        totalManagers,

        totalProjects,
        activeProjects,
        completedProjects,
        pendingProjects,
        onHoldProjects,
      ] = await Promise.all([
        // ================================================
        // USERS
        // ================================================

        // Total Users
        User.countDocuments(),

        // Active Users
        User.countDocuments({
          isActive: true,
        }),

        // Total Managers
        managerRole
          ? User.countDocuments({
              role: managerRole._id,
            })
          : 0,

        // ================================================
        // PROJECTS
        // ================================================

        // Total Projects
        Project.countDocuments(),

        // Active / In Progress Projects
        Project.countDocuments({
          status: "In Progress",
        }),

        // Completed Projects
        Project.countDocuments({
          status: "Completed",
        }),

        // Pending Projects
        Project.countDocuments({
          status: "Pending",
        }),

        // On Hold Projects
        Project.countDocuments({
          status: "On Hold",
        }),
      ]);

      // ---------------------------------------------------
      // DEBUG
      // ---------------------------------------------------

      console.log("GLOBAL DASHBOARD:", {
        totalUsers,
        activeUsers,
        totalManagers,
        totalProjects,
        activeProjects,
        completedProjects,
        pendingProjects,
        onHoldProjects,
      });

      // ---------------------------------------------------
      // RESPONSE
      // ---------------------------------------------------

      return res.status(200).json({
        success: true,
        dashboardType: "global",

        data: {
          totalUsers,
          activeUsers,
          totalManagers,

          totalProjects,
          activeProjects,
          completedProjects,
          pendingProjects,
          onHoldProjects,
        },
      });
    }

    // =====================================================
    // PROJECT / MANAGER DASHBOARD
    // =====================================================

    if (scope === "project") {
      const managerId = user._id;

      // ---------------------------------------------------
      // MANAGER KE PROJECTS
      // ---------------------------------------------------

      const projects = await Project.find({
        projectManager: managerId,
      }).select("_id name status");

      const projectIds = projects.map(
        (project) => project._id
      );

      // ---------------------------------------------------
      // OVERALL PROJECT DATA
      // ---------------------------------------------------

      const [
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
      ] = await Promise.all([
        // Total Projects
        Project.countDocuments({
          projectManager: managerId,
        }),

        // Total Tasks
        Task.countDocuments({
          project: {
            $in: projectIds,
          },
        }),

        // Completed Tasks
        Task.countDocuments({
          project: {
            $in: projectIds,
          },
          status: "Completed",
        }),

        // Pending Tasks
        Task.countDocuments({
          project: {
            $in: projectIds,
          },
          status: "Pending",
        }),

        // In Progress Tasks
        Task.countDocuments({
          project: {
            $in: projectIds,
          },
          status: "In Progress",
        }),
      ]);

      // ---------------------------------------------------
      // PROJECT-WISE TASK SUMMARY
      // ---------------------------------------------------

      const projectSummary = await Promise.all(
        projects.map(async (project) => {
          const [
            total,
            completed,
            pending,
            inProgress,
          ] = await Promise.all([
            // Total Tasks
            Task.countDocuments({
              project: project._id,
            }),

            // Completed Tasks
            Task.countDocuments({
              project: project._id,
              status: "Completed",
            }),

            // Pending Tasks
            Task.countDocuments({
              project: project._id,
              status: "Pending",
            }),

            // In Progress Tasks
            Task.countDocuments({
              project: project._id,
              status: "In Progress",
            }),
          ]);

          return {
            projectId: project._id,
            projectName: project.name,
            projectStatus: project.status,

            totalTasks: total,
            completedTasks: completed,
            pendingTasks: pending,
            inProgressTasks: inProgress,
          };
        })
      );

      // ---------------------------------------------------
      // RESPONSE
      // ---------------------------------------------------

      return res.status(200).json({
        success: true,
        dashboardType: "project",

        data: {
          totalProjects,
          totalTasks,
          completedTasks,
          pendingTasks,
          inProgressTasks,

          projects: projectSummary,
        },
      });
    }

    // =====================================================
    // HR DASHBOARD
    // =====================================================

    if (scope === "hr") {
      const [
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
      ] = await Promise.all([
        // Total Employees
        User.countDocuments(),

        // Active Employees
        User.countDocuments({
          isActive: true,
        }),

        // Inactive Employees
        User.countDocuments({
          isActive: false,
        }),
      ]);

      return res.status(200).json({
        success: true,
        dashboardType: "hr",

        data: {
          totalEmployees,
          activeEmployees,
          inactiveEmployees,
        },
      });
    }

    // =====================================================
    // SELF DASHBOARD
    // =====================================================

    if (scope === "self") {
      const [
        myTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
      ] = await Promise.all([
        // My Tasks
        Task.countDocuments({
          assignedTo: user._id,
        }),

        // My Completed Tasks
        Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        }),

        // My Pending Tasks
        Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        }),

        // My In Progress Tasks
        Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        }),
      ]);

      return res.status(200).json({
        success: true,
        dashboardType: "self",

        data: {
          myTasks,
          completedTasks,
          pendingTasks,
          inProgressTasks,
        },
      });
    }

    // =====================================================
    // UNKNOWN / INVALID SCOPE
    // =====================================================

    return res.status(400).json({
      success: false,
      message:
        "Dashboard scope is not configured for this role",
    });
  } catch (error) {
    // =====================================================
    // ERROR
    // =====================================================

    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
};