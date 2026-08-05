import React from "react";
import {
  FolderKanban,
  Plus,
  Search,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  MoreVertical,
} from "lucide-react";

const Projects = () => {
  return (
    <div className="projects-page">

      {/* Header */}
      <div className="projects-header">
        <div>
          <h2>Projects</h2>
          <p>Manage all your projects in one place.</p>
        </div>

        <button className="project-btn">
          <Plus size={18} />
          New Project
        </button>
      </div>

      {/* Stats */}
      <div className="project-stats">

        <div className="project-card">
          <FolderKanban size={35} />
          <h3>18</h3>
          <p>Total Projects</p>
        </div>

        <div className="project-card">
          <Clock size={35} />
          <h3>7</h3>
          <p>Active</p>
        </div>

        <div className="project-card">
          <CheckCircle size={35} />
          <h3>11</h3>
          <p>Completed</p>
        </div>

        <div className="project-card">
          <Users size={35} />
          <h3>25</h3>
          <p>Team Members</p>
        </div>

      </div>

      {/* Search */}

      <div className="search-project">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search Project..."
        />
      </div>

      {/* Project List */}

      <div className="project-list">

        <div className="project-item">

          <div className="project-info">
            <h3>Task Management Portal</h3>
            <p>
              Build a complete task management
              application using React & Node.js.
            </p>

            <div className="project-meta">
              <span>
                <Calendar size={15} />
                15 Aug 2026
              </span>

              <span>
                <Users size={15} />
                5 Members
              </span>
            </div>

            <div className="progress">
              <div
                className="progress-fill"
                style={{ width: "70%" }}
              ></div>
            </div>

            <small>70% Completed</small>
          </div>

          <button className="more-btn">
            <MoreVertical />
          </button>

        </div>

        <div className="project-item">

          <div className="project-info">
            <h3>CRM Dashboard</h3>

            <p>
              Admin dashboard for customer
              relationship management.
            </p>

            <div className="project-meta">
              <span>
                <Calendar size={15} />
                30 Aug 2026
              </span>

              <span>
                <Users size={15} />
                8 Members
              </span>
            </div>

            <div className="progress">
              <div
                className="progress-fill"
                style={{ width: "45%" }}
              ></div>
            </div>

            <small>45% Completed</small>

          </div>

          <button className="more-btn">
            <MoreVertical />
          </button>

        </div>

        <div className="project-item">

          <div className="project-info">

            <h3>HR Management System</h3>

            <p>
              Employee management and payroll
              application.
            </p>

            <div className="project-meta">

              <span>
                <Calendar size={15} />
                05 Sep 2026
              </span>

              <span>
                <Users size={15} />
                6 Members
              </span>

            </div>

            <div className="progress">

              <div
                className="progress-fill"
                style={{ width: "95%" }}
              ></div>

            </div>

            <small>95% Completed</small>

          </div>

          <button className="more-btn">
            <MoreVertical />
          </button>

        </div>

      </div>

    </div>
  );
};

export default Projects;