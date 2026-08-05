import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUsersRequest } from "../../../features/user/userSlice";
import { createProjectRequest } from "../../../features/project/projectSlice";

const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, getUsersLoading } = useSelector(
    (state) => state.user
  );

  const { createProjectLoading } = useSelector(
    (state) => state.project
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectManager: "",
    teamMembers: [],
    priority: "Medium",
    status: "Planning",
    startDate: "",
    endDate: "",
    budget: "",
  });

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTeamMembers = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setFormData((prev) => ({
      ...prev,
      teamMembers: values,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      console.log("SUBMIT CLICKED");
  console.log(formData);


    if (
      !formData.name ||
      !formData.projectManager ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    dispatch(createProjectRequest(formData));

    navigate("/projects");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-bold mb-8">
          Create New Project
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Project Name */}

          <div>

            <label className="font-medium block mb-2">
              Project Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name"
              className="w-full border rounded-lg p-3"
            />

          </div>

          {/* Priority */}

          <div>

            <label className="font-medium block mb-2">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >

              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>

              <option value="Critical">
                Critical
              </option>

            </select>

          </div>

          {/* Description */}

          <div className="md:col-span-2">

            <label className="font-medium block mb-2">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project description"
              className="w-full border rounded-lg p-3"
            />

          </div>

          {/* Project Manager */}

          <div>

            <label className="font-medium block mb-2">
              Project Manager
            </label>

            <select
              name="projectManager"
              value={formData.projectManager}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >

              <option value="">
                Select Project Manager
              </option>

              {users.map((user) => (

                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name}
                </option>

              ))}

            </select>

            {getUsersLoading && (
              <p className="text-sm text-gray-500 mt-2">
                Loading Users...
              </p>
            )}

          </div>

          {/* Status */}

          <div>

            <label className="font-medium block mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >

              <option value="Planning">
                Planning
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="On Hold">
                On Hold
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>


                    {/* Team Members */}

          <div className="md:col-span-2">

            <label className="font-medium block mb-2">
              Team Members
            </label>

            <select
              multiple
              value={formData.teamMembers}
              onChange={handleTeamMembers}
              className="w-full border rounded-lg p-3 h-40"
            >
              {users.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name} ({user.email})
                </option>
              ))}
            </select>

            <p className="text-sm text-gray-500 mt-2">
              Hold Ctrl (Windows) or Cmd (Mac) to select multiple users.
            </p>

          </div>

          {/* Start Date */}

          <div>

            <label className="font-medium block mb-2">
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          {/* End Date */}

          <div>

            <label className="font-medium block mb-2">
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          {/* Budget */}

          <div>

            <label className="font-medium block mb-2">
              Budget
            </label>

            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter project budget"
              className="w-full border rounded-lg p-3"
            />

          </div>

          {/* Summary */}

          <div className="bg-slate-50 border rounded-lg p-4">

            <h4 className="font-semibold mb-3">
              Project Summary
            </h4>

            <p>
              <span className="font-medium">
                Manager:
              </span>{" "}
              {users.find(
                (u) => u._id === formData.projectManager
              )?.name || "-"}
            </p>

            <p className="mt-2">
              <span className="font-medium">
                Team Members:
              </span>{" "}
              {formData.teamMembers.length}
            </p>

            <p className="mt-2">
              <span className="font-medium">
                Priority:
              </span>{" "}
              {formData.priority}
            </p>

            <p className="mt-2">
              <span className="font-medium">
                Status:
              </span>{" "}
              {formData.status}
            </p>

          </div>

          {/* Submit */}

          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={createProjectLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {createProjectLoading
                ? "Creating Project..."
                : "Create Project"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddProject;