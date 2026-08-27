import React, { useEffect, useState } from "react";
import {
  Building2,
  UserCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  getDepartmentsRequest,
  getDepartmentManagersRequest,
  assignDepartmentManagerRequest,
  clearDepartmentState,
} from "../../../features/department/departmentSlice";

const AssignManager = () => {
  const dispatch = useDispatch();

  const [departmentId, setDepartmentId] = useState("");
  const [managerId, setManagerId] = useState("");

  const {
    departments,
    managers,
    managersLoading,
    assignLoading,
    assignSuccess,
    assignError,
  } = useSelector((state) => state.department);


  useEffect(() => {
    dispatch(getDepartmentsRequest());
  }, [dispatch]);


  useEffect(() => {
    if (departmentId) {
      setManagerId("");

      dispatch(
        getDepartmentManagersRequest(departmentId)
      );
    }
  }, [departmentId, dispatch]);


  useEffect(() => {
    if (assignSuccess) {
      setDepartmentId("");
      setManagerId("");

      dispatch(clearDepartmentState());
    }
  }, [assignSuccess, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!departmentId || !managerId) {
      return;
    }

    dispatch(
      assignDepartmentManagerRequest({
        departmentId,
        managerId,
      })
    );
  };

  return (
    <div className="text-slate-800 dark:text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">

        <div
          className="
            w-14 h-14 rounded-2xl
            bg-gradient-to-br
            from-indigo-500 to-violet-600
            text-white
            shadow-lg shadow-indigo-200 dark:shadow-none
            flex items-center justify-center
          "
        >
          <UserCheck size={27} />
        </div>

        <div>

          <h1
            className="
              text-3xl font-bold
              text-slate-800 dark:text-white
              tracking-tight
            "
          >
            Assign Department Manager
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Assign a manager to a department
          </p>

        </div>

      </div>

      <div
        className="
          bg-white dark:bg-slate-900
          rounded-2xl
          border border-slate-200 dark:border-slate-700
          shadow-sm dark:shadow-none
          overflow-hidden
          max-w-3xl
        "
      >


        <div
          className="
            px-6 py-5
            border-b border-slate-200 dark:border-slate-700
            flex items-center gap-3
          "
        >

          <div
            className="
              w-10 h-10
              rounded-xl
              bg-indigo-50 dark:bg-indigo-500/10
              text-indigo-600 dark:text-indigo-400
              flex items-center justify-center
            "
          >
            <Building2 size={19} />
          </div>

          <div>

            <h2 className="font-bold text-slate-800 dark:text-white">
              Department Manager
            </h2>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Select a department and assign its manager.
            </p>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          <div>

            <label
              className="
                block
                text-sm
                font-semibold
                text-slate-700 dark:text-slate-300
                mb-2
              "
            >
              Department
            </label>

            <select
              value={departmentId}
              onChange={(e) =>
                setDepartmentId(e.target.value)
              }
              className="
                w-full
                h-12
                px-4
                border border-slate-200 dark:border-slate-700
                rounded-xl
                bg-slate-50 dark:bg-slate-800
                text-sm
                text-slate-700 dark:text-slate-200
                outline-none
                focus:bg-white dark:focus:bg-slate-900
                focus:border-indigo-400
                focus:ring-4
                focus:ring-indigo-500/10
                transition
              "
            >

              <option value="">
                Select Department
              </option>

              {departments?.map((department) => (
                <option
                  key={department._id}
                  value={department._id}
                >
                  {department.name}
                </option>
              ))}

            </select>

          </div>

        

          <div>

            <label
              className="
                block
                text-sm
                font-semibold
                text-slate-700 dark:text-slate-300
                mb-2
              "
            >
              Manager
            </label>

            <select
              value={managerId}
              onChange={(e) =>
                setManagerId(e.target.value)
              }
              disabled={
                !departmentId ||
                managersLoading
              }
              className="
                w-full
                h-12
                px-4
                border border-slate-200 dark:border-slate-700
                rounded-xl
                bg-slate-50 dark:bg-slate-800
                text-sm
                text-slate-700 dark:text-slate-200
                outline-none
                focus:bg-white dark:focus:bg-slate-900
                focus:border-indigo-400
                focus:ring-4
                focus:ring-indigo-500/10
                disabled:bg-slate-100
                dark:disabled:bg-slate-800
                disabled:text-slate-400
                transition
              "
            >

              <option value="">
                {managersLoading
                  ? "Loading Managers..."
                  : "Select Manager"}
              </option>

              {managers?.map((manager) => (
                <option
                  key={manager._id}
                  value={manager._id}
                >
                  {manager.name}
                </option>
              ))}

            </select>

            {/* NO MANAGER */}

            {!managersLoading &&
              departmentId &&
              managers?.length === 0 && (

                <div
                  className="
                    flex items-center gap-2
                    mt-2
                    text-sm
                    text-red-500 dark:text-red-400
                  "
                >

                  <AlertCircle size={15} />

                  <span>
                    No Manager found for this department.
                  </span>

                </div>

              )}

          </div>

          {/* ================================================= */}
          {/* ERROR */}
          {/* ================================================= */}

          {assignError && (

            <div
              className="
                flex items-center gap-2
                p-4
                rounded-xl
                bg-red-50 dark:bg-red-500/10
                border border-red-200 dark:border-red-500/20
                text-red-600 dark:text-red-400
                text-sm
              "
            >

              <AlertCircle size={17} />

              <span>
                {assignError}
              </span>

            </div>

          )}

          {/* ================================================= */}
          {/* SUCCESS */}
          {/* ================================================= */}

          {assignSuccess && (

            <div
              className="
                flex items-center gap-2
                p-4
                rounded-xl
                bg-emerald-50 dark:bg-emerald-500/10
                border border-emerald-200 dark:border-emerald-500/20
                text-emerald-600 dark:text-emerald-400
                text-sm
              "
            >

              <CheckCircle2 size={17} />

              <span>
                Manager assigned successfully.
              </span>

            </div>

          )}

          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <div
            className="
              pt-5
              border-t border-slate-200 dark:border-slate-700
              flex justify-end
            "
          >

            <button
              type="submit"
              disabled={
                !departmentId ||
                !managerId ||
                assignLoading
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-indigo-600
                hover:bg-indigo-700
                disabled:bg-slate-300
                dark:disabled:bg-slate-700
                disabled:cursor-not-allowed
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                text-sm
                shadow-md
                shadow-indigo-100
                dark:shadow-none
                transition
              "
            >

              <UserCheck size={18} />

              {assignLoading
                ? "Assigning..."
                : "Assign Manager"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AssignManager;