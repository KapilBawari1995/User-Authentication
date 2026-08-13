import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  ArrowLeft,
  Save,
  ClipboardList,
} from "lucide-react";

import {
  createTaskRequest,
  updateTaskRequest,
  getTaskByIdRequest,
  clearTaskState,
} from "../../../features/task/taskSlice";

import {
  getProjectTeamMembersRequest,
} from "../../../features/project/projectSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectId, id } = useParams();
  const isEditMode = !!id;

  const {
    task,
    createSuccess,
    updateSuccess,
    createLoading,
    updateLoading,
  } = useSelector((state) => state.task);

  const { teamMembers } = useSelector(
    (state) => state.project
  );

  useEffect(() => {
    dispatch(
      getProjectTeamMembersRequest(projectId)
    );

    if (isEditMode) {
      dispatch(getTaskByIdRequest(id));
    }
  }, [dispatch, id, isEditMode, projectId]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      dispatch(clearTaskState());

      if (projectId) {
        navigate(`/admin/projects/${projectId}`);
      } else {
        navigate("/admin/projects");
      }
    }
  }, [
    createSuccess,
    updateSuccess,
    dispatch,
    navigate,
    projectId,
  ]);

  useEffect(() => {
    return () => {
      dispatch(clearTaskState());
    };
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: task?.title || "",
      description: task?.description || "",
      project:
        projectId ||
        task?.project?._id ||
        "",
      assignedTo:
        task?.assignedTo?._id ||
        "",
      status:
        task?.status ||
        "Pending",
      priority:
        task?.priority ||
        "Medium",
      dueDate: task?.dueDate
        ? task.dueDate.substring(0, 10)
        : "",
      estimatedHours:
        task?.estimatedHours ||
        "",
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .trim()
        .required("Task title is required"),

      assignedTo: Yup.string()
        .required("Assign user is required"),

      dueDate: Yup.string()
        .required("Due date is required"),
    }),

    onSubmit: (values) => {
      const taskData = {
        title: values.title,
        description: values.description,
        project: values.project,
        assignedTo: values.assignedTo,
        status: values.status,
        priority: values.priority,
        dueDate: values.dueDate,
        estimatedHours: values.estimatedHours,
      };

      console.log("TASK DATA:", taskData);

      if (isEditMode) {
        dispatch(
          updateTaskRequest({
            id,
            data: taskData,
          })
        );
      } else {
        dispatch(
          createTaskRequest(taskData)
        );
      }
    },
  });

  const handleBack = () => {
    if (projectId) {
      navigate(`/admin/projects/${projectId}`);
    } else {
      navigate("/admin/projects");
    }
  };

  return (
    <div className="w-full text-slate-800 dark:text-slate-100">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
        mb-7
      ">

        <div className="flex items-center gap-4">

          <div className="
            w-12 h-12
            rounded-xl
            bg-indigo-50 dark:bg-indigo-500/10
            text-indigo-600 dark:text-indigo-400
            flex
            items-center
            justify-center
          ">
            <ClipboardList size={24} />
          </div>

          <div>

            <h1 className="
              text-2xl
              font-bold
              text-slate-800 dark:text-white
            ">
              {isEditMode
                ? "Edit Task"
                : "Create New Task"}
            </h1>

            <p className="
              text-sm
              text-slate-500 dark:text-slate-400
              mt-1
            ">
              {isEditMode
                ? "Update task details and assignment"
                : "Create and assign a task to this project"}
            </p>

          </div>

        </div>

        {/* BACK */}

        <button
          type="button"
          onClick={handleBack}
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-white dark:bg-slate-900
            border
            border-slate-200 dark:border-slate-700
            text-slate-700 dark:text-slate-300
            px-5
            py-2.5
            rounded-xl
            font-medium
            hover:bg-slate-50 dark:hover:bg-slate-800
            transition
            shadow-sm
          "
        >
          <ArrowLeft size={18} />
          Back to Project
        </button>

      </div>

      {/* =================================================
          PROJECT INFO
      ================================================= */}

      <div className="
        bg-indigo-50 dark:bg-indigo-500/10
        border
        border-indigo-100 dark:border-indigo-500/20
        rounded-2xl
        px-5
        py-4
        mb-6
      ">

        <div className="flex items-center gap-3">

          <div className="
            w-10 h-10
            rounded-xl
            bg-white dark:bg-slate-900
            text-indigo-600 dark:text-indigo-400
            flex
            items-center
            justify-center
            border
            border-indigo-100 dark:border-indigo-500/20
          ">
            <ClipboardList size={19} />
          </div>

          <div>

            <p className="
              text-xs
              text-indigo-500 dark:text-indigo-400
              font-semibold
              uppercase
              tracking-wide
            ">
              Project Task
            </p>

            <p className="
              text-sm
              font-semibold
              text-slate-700 dark:text-slate-200
              mt-0.5
            ">
              This task will automatically belong to the selected project.
            </p>

          </div>

        </div>

      </div>

      {/* =================================================
          FORM CARD
      ================================================= */}

      <div className="
        bg-white dark:bg-slate-900
        border
        border-slate-200 dark:border-slate-700
        rounded-2xl
        shadow-sm dark:shadow-none
        max-w-5xl
        overflow-hidden
      ">

        {/* CARD HEADER */}

        <div className="
          px-7
          py-5
          border-b
          border-slate-200 dark:border-slate-700
          bg-slate-50/50 dark:bg-slate-800/50
        ">

          <div className="flex items-center gap-3">

            <div className="
              w-10 h-10
              rounded-xl
              bg-indigo-100 dark:bg-indigo-500/10
              flex
              items-center
              justify-center
            ">
              <Save
                size={20}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </div>

            <div>

              <h3 className="
                font-semibold
                text-slate-800 dark:text-white
              ">
                Task Information
              </h3>

              <p className="
                text-sm
                text-slate-500 dark:text-slate-400
              ">
                Enter the task details below
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={formik.handleSubmit}
          className="p-7 space-y-6"
        >

          {/* TITLE */}

          <div>

            <label className="
              block
              mb-2
              text-sm
              font-semibold
              text-slate-700 dark:text-slate-300
            ">
              Task Title
              <span className="text-red-500 ml-1">
                *
              </span>
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                transition
                bg-white dark:bg-slate-800
                text-slate-800 dark:text-slate-100
                placeholder:text-slate-400 dark:placeholder:text-slate-500
                ${
                  formik.touched.title &&
                  formik.errors.title
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                }
              `}
            />

            {formik.touched.title &&
              formik.errors.title && (
                <p className="
                  text-red-500 dark:text-red-400
                  text-sm
                  mt-1
                ">
                  {formik.errors.title}
                </p>
              )}

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="
              block
              mb-2
              text-sm
              font-semibold
              text-slate-700 dark:text-slate-300
            ">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              placeholder="Enter task description..."
              value={formik.values.description}
              onChange={formik.handleChange}
              className="
                w-full
                border
                border-slate-300 dark:border-slate-700
                rounded-xl
                px-4
                py-3
                outline-none
                resize-none
                bg-white dark:bg-slate-800
                text-slate-800 dark:text-slate-100
                placeholder:text-slate-400 dark:placeholder:text-slate-500
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/20
                transition
              "
            />

          </div>

          {/* ASSIGN TEAM MEMBER */}

          <div>

            <label className="
              block
              mb-2
              text-sm
              font-semibold
              text-slate-700 dark:text-slate-300
            ">
              Assign Team Member
              <span className="text-red-500 ml-1">
                *
              </span>
            </label>

            <select
              name="assignedTo"
              value={formik.values.assignedTo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`
                w-full
                border
                rounded-xl
                px-4
                py-3
                bg-white dark:bg-slate-800
                text-slate-800 dark:text-slate-100
                outline-none
                transition
                ${
                  formik.touched.assignedTo &&
                  formik.errors.assignedTo
                    ? "border-red-500"
                    : "border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                }
              `}
            >

              <option value="">
                Select Team Member
              </option>

              {teamMembers?.map((member) => (
                <option
                  key={member._id}
                  value={member._id}
                >
                  {member.name}
                </option>
              ))}

            </select>

            {formik.touched.assignedTo &&
              formik.errors.assignedTo && (
                <p className="
                  text-red-500 dark:text-red-400
                  text-sm
                  mt-1
                ">
                  {formik.errors.assignedTo}
                </p>
              )}

          </div>

          {/* STATUS / PRIORITY */}

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          ">

            {/* STATUS */}

            <div>

              <label className="
                block
                mb-2
                text-sm
                font-semibold
                text-slate-700 dark:text-slate-300
              ">
                Status
              </label>

              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                className="
                  w-full
                  border
                  border-slate-300 dark:border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  bg-white dark:bg-slate-800
                  text-slate-800 dark:text-slate-100
                  outline-none
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/20
                "
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

                <option value="On Hold">
                  On Hold
                </option>

              </select>

            </div>

            {/* PRIORITY */}

            <div>

              <label className="
                block
                mb-2
                text-sm
                font-semibold
                text-slate-700 dark:text-slate-300
              ">
                Priority
              </label>

              <select
                name="priority"
                value={formik.values.priority}
                onChange={formik.handleChange}
                className="
                  w-full
                  border
                  border-slate-300 dark:border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  bg-white dark:bg-slate-800
                  text-slate-800 dark:text-slate-100
                  outline-none
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/20
                "
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

          </div>

          {/* DATE / HOURS */}

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          ">

            {/* DUE DATE */}

            <div>

              <label className="
                block
                mb-2
                text-sm
                font-semibold
                text-slate-700 dark:text-slate-300
              ">
                Due Date
                <span className="text-red-500 ml-1">
                  *
                </span>
              </label>

              <input
                type="date"
                name="dueDate"
                value={formik.values.dueDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  transition
                  bg-white dark:bg-slate-800
                  text-slate-800 dark:text-slate-100
                  ${
                    formik.touched.dueDate &&
                    formik.errors.dueDate
                      ? "border-red-500"
                      : "border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  }
                `}
              />

              {formik.touched.dueDate &&
                formik.errors.dueDate && (
                  <p className="
                    text-red-500 dark:text-red-400
                    text-sm
                    mt-1
                  ">
                    {formik.errors.dueDate}
                  </p>
                )}

            </div>

            {/* ESTIMATED HOURS */}

            <div>

              <label className="
                block
                mb-2
                text-sm
                font-semibold
                text-slate-700 dark:text-slate-300
              ">
                Estimated Hours
              </label>

              <input
                type="number"
                min="0"
                name="estimatedHours"
                placeholder="e.g. 8"
                value={formik.values.estimatedHours}
                onChange={formik.handleChange}
                className="
                  w-full
                  border
                  border-slate-300 dark:border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  bg-white dark:bg-slate-800
                  text-slate-800 dark:text-slate-100
                  placeholder:text-slate-400 dark:placeholder:text-slate-500
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/20
                "
              />

            </div>

          </div>

          {/* ACTIONS */}

          <div className="
            flex
            flex-col-reverse
            sm:flex-row
            sm:justify-end
            gap-3
            pt-6
            border-t
            border-slate-200 dark:border-slate-700
          ">

            <button
              type="button"
              onClick={handleBack}
              className="
                px-6
                py-3
                rounded-xl
                border
                border-slate-300 dark:border-slate-700
                text-slate-700 dark:text-slate-300
                bg-white dark:bg-slate-900
                font-semibold
                hover:bg-slate-50 dark:hover:bg-slate-800
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                createLoading ||
                updateLoading
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                px-7
                py-3
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                disabled:bg-slate-400
                dark:disabled:bg-slate-700
                text-white
                font-semibold
                transition
                shadow-sm
              "
            >

              <Save size={18} />

              {createLoading ||
                updateLoading
                ? "Please Wait..."
                : isEditMode
                  ? "Update Task"
                  : "Create Task"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddTask;