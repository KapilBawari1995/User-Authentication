import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  Save,
  CheckCircle2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { getRolesRequest } from "../../../features/Role/roleSlice";

import {
  getPermissionsRequest,
  assignPermissionRequest,
} from "../../../features/permissions/permissionSlice";

// ======================================================
// MODULES
// ======================================================

const modules = [
  "Dashboard",
  "Tasks",
  "Add Member",
  "Projects",
  "Calendar",
  "Users",
  "Roles",
  "Permission",
  "AssignManager",
  "Department",
  "Reports",
  "Notifications",
  "Profile",
  "Settings",
  "Change Password",
];

// ======================================================
// ACTIONS
// ======================================================

const actions = [
  "view",
  "create",
  "edit",
  "delete",
];

// ======================================================
// DEFAULT PERMISSIONS
// ======================================================

const createDefaultPermissions = () => {
  const obj = {};

  modules.forEach((module) => {
    obj[module] = {};

    actions.forEach((action) => {
      obj[module][action] = false;
    });
  });

  return obj;
};

// ======================================================
// COMPONENT
// ======================================================

export default function PermissionManagement() {
  const dispatch = useDispatch();

  // ====================================================
  // REDUX STATE
  // ====================================================

  const { roles = [] } = useSelector(
    (state) => state.role || {}
  );

  const {
    permissions: rolePermissions = [],
    loading = false,
    saveLoading = false,
  } = useSelector(
    (state) => state.permissions || {}
  );

  // ====================================================
  // LOCAL STATE
  // ====================================================

  const [selectedRole, setSelectedRole] = useState("");

  const [permissions, setPermissions] = useState(
    createDefaultPermissions()
  );

  // ====================================================
  // GET ROLES
  // ====================================================

  useEffect(() => {
    dispatch(getRolesRequest());
  }, [dispatch]);

  // ====================================================
  // ROLE CHANGE
  // ====================================================

  const handleRoleChange = (e) => {
    const roleId = e.target.value;

    setSelectedRole(roleId);
    setPermissions(createDefaultPermissions());

    if (roleId) {
      dispatch(getPermissionsRequest(roleId));
    }
  };

  // ====================================================
  // LOAD SAVED PERMISSIONS
  // ====================================================

  useEffect(() => {
    if (!rolePermissions) {
      return;
    }

    const permissionList = Array.isArray(rolePermissions)
      ? rolePermissions
      : rolePermissions?.data || [];

    const data = createDefaultPermissions();

    permissionList.forEach((item) => {
      if (!item?.module) {
        return;
      }

      if (data[item.module]) {
        data[item.module] = {
          view: Boolean(item.view),
          create: Boolean(item.create),
          edit: Boolean(item.edit),
          delete: Boolean(item.delete),
        };
      }
    });

    setPermissions(data);
  }, [rolePermissions]);

  // ====================================================
  // CHECKBOX CHANGE
  // ====================================================

  const handlePermissionChange = (
    module,
    action
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action],
      },
    }));
  };

  // ====================================================
  // SAVE PERMISSIONS
  // ====================================================

  const handleSave = () => {
    if (!selectedRole) {
      alert("Please Select Role");
      return;
    }

    const permissionArray = modules.map(
      (module) => ({
        module,
        view: Boolean(
          permissions[module]?.view
        ),
        create: Boolean(
          permissions[module]?.create
        ),
        edit: Boolean(
          permissions[module]?.edit
        ),
        delete: Boolean(
          permissions[module]?.delete
        ),
      })
    );

    dispatch(
      assignPermissionRequest({
        roleId: selectedRole,
        permissions: permissionArray,
      })
    );
  };

  return (
    <div className="w-full text-slate-800 dark:text-slate-100">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">

        <div className="flex items-center gap-4">

          <div
            className="
              w-14 h-14
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-violet-600
              text-white
              shadow-lg shadow-indigo-200
              dark:shadow-none
              flex items-center justify-center
            "
          >
            <ShieldCheck size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
              Permission Management
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage role based access and permissions.
            </p>

          </div>

        </div>

      </div>

      {/* =================================================
          ROLE SELECT
      ================================================= */}

      <div
        className="
          bg-white dark:bg-slate-900
          rounded-2xl
          border border-slate-200 dark:border-slate-700
          shadow-sm dark:shadow-none
          p-5
          mb-6
        "
      >

        <div className="flex flex-col md:flex-row md:items-center gap-4">

          <div className="flex-1">

            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Role
            </p>

            <p className="text-xs text-slate-400 dark:text-slate-500">
              Choose a role to manage its permissions.
            </p>

          </div>

          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="
              h-12
              w-full md:w-72
              px-4
              border border-slate-200 dark:border-slate-700
              rounded-xl
              bg-slate-50 dark:bg-slate-800
              text-sm text-slate-700 dark:text-slate-200
              outline-none
              focus:bg-white dark:focus:bg-slate-900
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-500/10
              transition
            "
          >

            <option value="">
              Select Role
            </option>

            {roles?.map((role) => (
              <option
                key={role._id}
                value={role._id}
              >
                {role.name}
              </option>
            ))}

          </select>

        </div>

      </div>

      {/* =================================================
          PERMISSION CARD
      ================================================= */}

      <div
        className="
          bg-white dark:bg-slate-900
          rounded-2xl
          border border-slate-200 dark:border-slate-700
          shadow-sm dark:shadow-none
          overflow-hidden
        "
      >

        {/* TABLE HEADER */}

        <div
          className="
            px-6 py-5
            border-b border-slate-200 dark:border-slate-700
            flex items-center justify-between
          "
        >

          <div>

            <h2 className="font-bold text-slate-800 dark:text-white">
              Role Permissions
            </h2>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Configure module access for the selected role.
            </p>

          </div>

          <div
            className="
              flex items-center gap-2
              px-3 py-1.5
              rounded-lg
              bg-indigo-50 dark:bg-indigo-500/10
              text-indigo-600 dark:text-indigo-400
              text-xs font-semibold
            "
          >
            <CheckCircle2 size={15} />
            Access Control
          </div>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="py-16 text-center">

            <div
              className="
                w-8 h-8 mx-auto
                border-[3px]
                border-indigo-600 dark:border-indigo-400
                border-t-transparent
                rounded-full animate-spin
              "
            />

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Loading permissions...
            </p>

          </div>

        ) : (

          <>

            {/* TABLE */}

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-slate-50 dark:bg-slate-800/70">

                    <th
                      className="
                        px-6 py-4
                        text-left
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400 dark:text-slate-500
                      "
                    >
                      Module
                    </th>

                    {actions.map((action) => (

                      <th
                        key={action}
                        className="
                          px-6 py-4
                          text-center
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-wider
                          text-slate-400 dark:text-slate-500
                        "
                      >
                        {action}
                      </th>

                    ))}

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                  {modules.map((module) => (

                    <tr
                      key={module}
                      className="
                        hover:bg-slate-50/70
                        dark:hover:bg-slate-800/60
                        transition-colors
                      "
                    >

                      {/* MODULE */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              w-10 h-10
                              rounded-xl
                              bg-gradient-to-br
                              from-indigo-50
                              to-violet-50
                              dark:from-indigo-500/10
                              dark:to-violet-500/10
                              text-indigo-600
                              dark:text-indigo-400
                              border border-indigo-100
                              dark:border-indigo-500/20
                              flex items-center justify-center
                            "
                          >
                            <ShieldCheck size={18} />
                          </div>

                          <div>

                            <p className="font-semibold text-slate-800 dark:text-slate-100">
                              {module === "AssignManager"
                                ? "Assign Manager"
                                : module}
                            </p>

                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                              Module access
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* ACTION CHECKBOXES */}

                      {actions.map((action) => (

                        <td
                          key={action}
                          className="px-6 py-5 text-center"
                        >

                          <label
                            className="
                              inline-flex
                              items-center
                              justify-center
                              cursor-pointer
                            "
                          >

                            <input
                              type="checkbox"
                              checked={Boolean(
                                permissions[module]?.[action]
                              )}
                              onChange={() =>
                                handlePermissionChange(
                                  module,
                                  action
                                )
                              }
                              disabled={!selectedRole}
                              className="
                                w-5 h-5
                                rounded-md
                                border-slate-300
                                text-indigo-600
                                focus:ring-indigo-500
                                dark:bg-slate-800
                                dark:border-slate-600
                                cursor-pointer
                                disabled:opacity-40
                                disabled:cursor-not-allowed
                              "
                            />

                          </label>

                        </td>

                      ))}

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* FOOTER */}

            <div
              className="
                px-6 py-5
                border-t border-slate-200 dark:border-slate-700
                bg-slate-50/70 dark:bg-slate-800/50
                flex flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
              "
            >

              <div>

                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Permission Settings
                </p>

                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Save the selected permissions for this role.
                </p>

              </div>

              <button
                onClick={handleSave}
                disabled={
                  !selectedRole ||
                  saveLoading
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
                  px-6 py-3
                  rounded-xl
                  font-semibold
                  text-sm
                  shadow-md
                  shadow-indigo-100
                  dark:shadow-none
                  transition-all
                "
              >

                <Save size={18} />

                {saveLoading
                  ? "Saving..."
                  : "Save Permissions"}

              </button>

            </div>

          </>

        )}

      </div>

    </div>
  );
}