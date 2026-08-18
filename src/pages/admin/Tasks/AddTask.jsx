import React, { useEffect, useMemo } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  ArrowLeft,
  Save,
  ClipboardList,
  UserRound,
  ShieldCheck,
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

  // =====================================================
  // ROUTE PARAMS
  // =====================================================

  const { id, projectId } = useParams();

  // =====================================================
  // REDUX - TASK
  // =====================================================

  const {
    task,
    createSuccess,
    updateSuccess,
    createLoading,
    updateLoading,
  } = useSelector(
    (state) => state.task
  );

  // =====================================================
  // REDUX - PROJECT
  // =====================================================

  const {
    teamMembers = [],
  } = useSelector(
    (state) => state.project
  );

  // =====================================================
  // PROJECT ID
  // =====================================================

  const currentProjectId = useMemo(() => {
    return (
      projectId ||
      task?.project?._id ||
      task?.project ||
      ""
    );
  }, [
    projectId,
    task,
  ]);

  // =====================================================
  // GET TASK FOR EDIT
  // =====================================================

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(
      getTaskByIdRequest(id)
    );
  }, [
    dispatch,
    id,
  ]);

  // =====================================================
  // GET PROJECT TEAM MEMBERS
  // =====================================================

  useEffect(() => {
    if (!currentProjectId) {
      return;
    }

    dispatch(
      getProjectTeamMembersRequest(
        currentProjectId
      )
    );
  }, [
    dispatch,
    currentProjectId,
  ]);

  // =====================================================
  // CREATE / UPDATE SUCCESS
  // =====================================================

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      dispatch(clearTaskState());

      navigate(
        `/admin/projects/view/${currentProjectId}`
      );
    }
  }, [
    createSuccess,
    updateSuccess,
    currentProjectId,
    dispatch,
    navigate,
  ]);

  // =====================================================
  // DEVELOPERS
  // =====================================================

  const developers = useMemo(() => {
    return teamMembers.filter(
      (member) => {
        const role =
          member?.role?.name ||
          member?.role ||
          member?.user?.role?.name ||
          "";

        return String(role)
          .toLowerCase()
          .includes("developer");
      }
    );
  }, [
    teamMembers,
  ]);

  // =====================================================
  // QA / TESTER
  // =====================================================

  const qaMembers = useMemo(() => {
    return teamMembers.filter(
      (member) => {
        const role =
          member?.role?.name ||
          member?.role ||
          member?.user?.role?.name ||
          "";

        const normalizedRole =
          String(role).toLowerCase();

        return (
          normalizedRole.includes("qa") ||
          normalizedRole.includes("tester")
        );
      }
    );
  }, [
    teamMembers,
  ]);

  // =====================================================
  // FORMIK
  // =====================================================

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title:
        task?.title || "",

      description:
        task?.description || "",

      project:
        currentProjectId || "",

      assignedTo:
        task?.assignedTo?._id ||
        task?.assignedTo ||
        "",

      qaAssignedTo:
        task?.qaAssignedTo?._id ||
        task?.qaAssignedTo ||
        "",

      status:
        task?.status ||
        "Pending",

      priority:
        task?.priority ||
        "Medium",

      dueDate:
        task?.dueDate
          ? String(
              task.dueDate
            ).substring(0, 10)
          : "",

      estimatedHours:
        task?.estimatedHours ?? "",
    },

    validationSchema:
      Yup.object({
        title:
          Yup.string()
            .trim()
            .required(
              "Task title is required"
            ),

        assignedTo:
          Yup.string()
            .required(
              "Developer is required"
            ),

        qaAssignedTo:
          Yup.string()
            .required(
              "QA / Tester is required"
            ),

        dueDate:
          Yup.string()
            .required(
              "Due date is required"
            ),
      }),

    // ===================================================
    // SUBMIT
    // ===================================================

    onSubmit: (values) => {
      const taskData = {
        title:
          values.title.trim(),

        description:
          values.description?.trim() ||
          "",

        project:
          values.project ||
          currentProjectId,

        assignedTo:
          values.assignedTo,

        qaAssignedTo:
          values.qaAssignedTo,

        status:
          values.status,

        priority:
          values.priority,

        dueDate:
          values.dueDate,

        estimatedHours:
          Number(
            values.estimatedHours
          ) || 0,
      };

      // =================================================
      // UPDATE
      // =================================================

      if (id) {
        dispatch(
          updateTaskRequest({
            id,
            data: taskData,
          })
        );

        return;
      }

      // =================================================
      // CREATE
      // =================================================

      dispatch(
        createTaskRequest(
          taskData
        )
      );
    },
  });

  // =====================================================
  // BACK / CANCEL
  // =====================================================

  const handleBack = () => {
    dispatch(clearTaskState());

    navigate(
      `/admin/projects/view/${currentProjectId}`
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="w-full text-slate-800 dark:text-slate-100">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <ClipboardList size={24} />
          </div>

          <div>

            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              {id
                ? "Edit Task"
                : "Create New Task"}
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {id
                ? "Update task details and assignment"
                : "Create and assign a task to this project"}
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={handleBack}
          className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm"
        >
          <ArrowLeft size={18} />
          Back to Project
        </button>

      </div>

      {/* =================================================
          PROJECT INFO
      ================================================= */}

      <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl px-5 py-4 mb-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20">
            <ClipboardList size={19} />
          </div>

          <div>

            <p className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold uppercase tracking-wide">
              Project Task
            </p>

            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-0.5">
              {id
                ? "Update task details for this project."
                : "Create a new task for this project."}
            </p>

          </div>

        </div>

      </div>

      {/* =================================================
          FORM CARD
      ================================================= */}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm dark:shadow-none max-w-5xl overflow-hidden">

        {/* =================================================
            CARD HEADER
        ================================================= */}

        <div className="px-7 py-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">

              <Save
                size={20}
                className="text-indigo-600 dark:text-indigo-400"
              />

            </div>

            <div>

              <h3 className="font-semibold text-slate-800 dark:text-white">
                Task Information
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Enter the task details below
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={
            formik.handleSubmit
          }
          className="p-7 space-y-6"
        >

          {/* =================================================
              TITLE
          ================================================= */}

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">

              Task Title

              <span className="text-red-500 ml-1">
                *
              </span>

            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={
                formik.values.title
              }
              onChange={
                formik.handleChange
              }
              onBlur={
                formik.handleBlur
              }
              className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 outline-none transition bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            {formik.touched.title &&
              formik.errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    formik.errors.title
                  }
                </p>
              )}

          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              placeholder="Enter task description..."
              value={
                formik.values.description
              }
              onChange={
                formik.handleChange
              }
              onBlur={
                formik.handleBlur
              }
              className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 outline-none resize-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
            />

          </div>

          {/* =================================================
              DEVELOPER + QA
          ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* DEVELOPER */}

            <div>

              <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">

                <UserRound
                  size={17}
                  className="text-indigo-600 dark:text-indigo-400"
                />

                Developer

                <span className="text-red-500">
                  *
                </span>

              </label>

              <select
                name="assignedTo"
                value={
                  formik.values.assignedTo
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
                className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >

                <option value="">
                  Select Developer
                </option>

                {developers.map(
                  (member) => (
                    <option
                      key={
                        member._id
                      }
                      value={
                        member._id
                      }
                    >
                      {member.name ||
                        member.user?.name ||
                        member.user?.fullName ||
                        "Unnamed Developer"}
                    </option>
                  )
                )}

              </select>

              {developers.length === 0 && (
                <p className="text-xs text-amber-600 mt-2">
                  No Developer found in
                  this project team.
                </p>
              )}

              {formik.touched.assignedTo &&
                formik.errors.assignedTo && (
                  <p className="text-red-500 text-sm mt-1">
                    {
                      formik.errors.assignedTo
                    }
                  </p>
                )}

            </div>

            {/* QA */}

            <div>

              <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">

                <ShieldCheck
                  size={17}
                  className="text-emerald-600 dark:text-emerald-400"
                />

                QA / Tester

                <span className="text-red-500">
                  *
                </span>

              </label>

              <select
                name="qaAssignedTo"
                value={
                  formik.values.qaAssignedTo
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
                className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none cursor-pointer focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              >

                <option value="">
                  Select QA / Tester
                </option>

                {qaMembers.map(
                  (member) => (
                    <option
                      key={
                        member._id
                      }
                      value={
                        member._id
                      }
                    >
                      {member.name ||
                        member.user?.name ||
                        member.user?.fullName ||
                        "Unnamed QA"}
                    </option>
                  )
                )}

              </select>

              {qaMembers.length === 0 && (
                <p className="text-xs text-amber-600 mt-2">
                  No QA / Tester found in
                  this project team.
                </p>
              )}

              {formik.touched.qaAssignedTo &&
                formik.errors.qaAssignedTo && (
                  <p className="text-red-500 text-sm mt-1">
                    {
                      formik.errors.qaAssignedTo
                    }
                  </p>
                )}

            </div>

          </div>

          {/* =================================================
              STATUS + PRIORITY
          ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Status
              </label>

              <select
                name="status"
                value={
                  formik.values.status
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
                className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500"
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

              <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Priority
              </label>

              <select
                name="priority"
                value={
                  formik.values.priority
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
                className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-500"
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

          {/* =================================================
              DUE DATE + HOURS
          ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">

                Due Date

                <span className="text-red-500 ml-1">
                  *
                </span>

              </label>

              <input
                type="date"
                name="dueDate"
                value={
                  formik.values.dueDate
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
                className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 outline-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:border-indigo-500"
              />

              {formik.touched.dueDate &&
                formik.errors.dueDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {
                      formik.errors.dueDate
                    }
                  </p>
                )}

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                Estimated Hours
              </label>

              <input
                type="number"
                min="0"
                name="estimatedHours"
                placeholder="e.g. 8"
                value={
                  formik.values.estimatedHours
                }
                onChange={
                  formik.handleChange
                }
                onBlur={
                  formik.handleBlur
                }
                className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 outline-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:border-indigo-500"
              />

            </div>

          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">

            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                createLoading ||
                updateLoading
              }
              className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-semibold transition"
            >

              <Save size={18} />

              {createLoading ||
              updateLoading
                ? "Please Wait..."
                : id
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