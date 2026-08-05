import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTaskRequest } from "../../../features/task/taskSlice";
import { getUsersRequest } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, getUsersLoading } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
    estimatedHours: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.assignedTo ||
      !formData.dueDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    dispatch(createTaskRequest(formData));

    navigate("/tasks");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-5">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-bold mb-6">
          Create New Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Assign User
            </label>

            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                Select User
              </option>

              {users.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name} ({user.email})
                </option>
              ))}
            </select>

            {getUsersLoading && (
              <p className="text-sm text-gray-500 mt-2">
                Loading Users...
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
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
              </select>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Estimated Hours
              </label>

              <input
                type="number"
                name="estimatedHours"
                value={formData.estimatedHours}
                onChange={handleChange}
                placeholder="8"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Create Task
          </button>

        </form>

      </div>
    </div>
  );
};

export default AddTask;