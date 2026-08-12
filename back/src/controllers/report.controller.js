import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const getReports = async (req, res) => {
  try {
    const projects = await Project.find({
      isActive: true,
    })
      .populate("projectManager", "name email")
      .lean();

    const tasks = await Task.find({
      isActive: true,
    })
      .populate("assignedTo", "name email")
      .populate("project", "name")
      .lean();

    // =====================================================
    // PROJECT REPORT
    // =====================================================

    const projectReports = projects.map((project) => {
      const projectTasks = tasks.filter(
        (task) =>
          task.project?._id?.toString() ===
          project._id.toString()
      );

      const completedTasks = projectTasks.filter(
        (task) => task.status === "Completed"
      ).length;

      const inProgressTasks = projectTasks.filter(
        (task) => task.status === "In Progress"
      ).length;

      const pendingTasks = projectTasks.filter(
        (task) => task.status === "Pending"
      ).length;

      return {
        projectId: project._id,
        projectName: project.name,

        manager: project.projectManager
          ? {
              id: project.projectManager._id,
              name: project.projectManager.name,
              email: project.projectManager.email,
            }
          : null,

        status: project.status,
        priority: project.priority,
        progress: project.progress || 0,

        startDate: project.startDate,
        endDate: project.endDate,

        totalTasks: projectTasks.length,
        completedTasks,
        inProgressTasks,
        pendingTasks,
      };
    });

    // =====================================================
    // MANAGER REPORT
    // =====================================================

    const managers = await User.find({
      isActive: true,
    })
      .populate("role", "name")
      .select("name email role")
      .lean();

    const managerReports = managers
      .filter(
        (user) =>
          user.role?.name?.toLowerCase() ===
          "manager"
      )
      .map((manager) => {
        const managerProjects = projects.filter(
          (project) =>
            project.projectManager?._id?.toString() ===
            manager._id.toString()
        );

        const managerProjectIds =
          managerProjects.map((project) =>
            project._id.toString()
          );

        const managerTasks = tasks.filter(
          (task) =>
            task.project?._id &&
            managerProjectIds.includes(
              task.project._id.toString()
            )
        );

        const completedTasks =
          managerTasks.filter(
            (task) =>
              task.status === "Completed"
          ).length;

        const completedProjects =
          managerProjects.filter(
            (project) =>
              project.status === "Completed"
          ).length;

        const inProgressProjects =
          managerProjects.filter(
            (project) =>
              project.status === "In Progress"
          ).length;

        const completionRate =
          managerTasks.length > 0
            ? Math.round(
                (completedTasks /
                  managerTasks.length) *
                  100
              )
            : 0;

        return {
          managerId: manager._id,
          managerName: manager.name,
          email: manager.email,

          totalProjects:
            managerProjects.length,

          completedProjects,

          inProgressProjects,

          totalTasks:
            managerTasks.length,

          completedTasks,

          completionRate,
        };
      });

    // =====================================================
    // SUMMARY
    // =====================================================

    const totalProjects = projects.length;

    const completedProjects =
      projects.filter(
        (project) =>
          project.status === "Completed"
      ).length;

    const inProgressProjects =
      projects.filter(
        (project) =>
          project.status === "In Progress"
      ).length;

    const pendingProjects =
      projects.filter(
        (project) =>
          project.status === "Planning" ||
          project.status === "On Hold"
      ).length;

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const inProgressTasks = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const pendingTasks = tasks.filter(
      (task) => task.status === "Pending"
    ).length;

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,

      data: {
        summary: {
          totalProjects,
          completedProjects,
          inProgressProjects,
          pendingProjects,

          totalManagers:
            managerReports.length,

          totalTasks,
          completedTasks,
          inProgressTasks,
          pendingTasks,
        },

        projects: projectReports,

        managers: managerReports,
      },
    });
  } catch (error) {
    console.error(
      "GET REPORTS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
      error: error.message,
    });
  }
};