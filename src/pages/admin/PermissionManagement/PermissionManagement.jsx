import React, { useEffect, useState } from "react";
import "../PermissionManagement/ermissionManagement.css"; 
import { useDispatch, useSelector } from "react-redux";

import { getRolesRequest } from "../../../features/Role/roleSlice";

import {
  getPermissionsRequest,
  assignPermissionRequest,
} from "../../../features/permissions/permissionSlice";

const modules = [
  "Dashboard",
  "Users",
  "Roles",
  "Products",
  "Reports",
  "Calendar",
  "Notifications",
  "Profile",
  "Settings",
];

const actions = ["view", "create", "edit", "delete"];

export default function PermissionManagement() {
  const dispatch = useDispatch();

  const { roles } = useSelector((state) => state.role);

  // Store.js ke hisab se permission ya permissions use karna
  const { permissions: rolePermissions } = useSelector(
    (state) => state.permissions
  );

  const [selectedRole, setSelectedRole] = useState("");

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

  const [permissions, setPermissions] = useState(
    createDefaultPermissions()
  );

  // ================= Load Roles =================

  useEffect(() => {
    dispatch(getRolesRequest());
  }, [dispatch]);

  // ================= Role Change =================

  const handleRoleChange = (e) => {
    const roleId = e.target.value;

    setSelectedRole(roleId);

    setPermissions(createDefaultPermissions());

    if (roleId) {
      dispatch(getPermissionsRequest(roleId));
    }
  };

  // ================= Load Saved Permission =================

  useEffect(() => {
    if (!rolePermissions) return;

    const data = createDefaultPermissions();

    rolePermissions.forEach((item) => {
      if (data[item.module]) {
        data[item.module] = {
          view: item.view,
          create: item.create,
          edit: item.edit,
          delete: item.delete,
        };
      }
    });

    setPermissions(data);
  }, [rolePermissions]);

  // ================= Checkbox =================

  const handlePermissionChange = (module, action) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action],
      },
    }));
  };

  // ================= Save =================

  const handleSave = () => {
    if (!selectedRole) {
      alert("Please Select Role");
      return;
    }

    const permissionArray = modules.map((module) => ({
      module,
      ...permissions[module],
    }));

    dispatch(
      assignPermissionRequest({
        roleId: selectedRole,
        permissions: permissionArray,
      })
    );

    alert("Permission Saved Successfully");
  };

  return (
    <div className="permission-page">

      <div className="permission-header">
        <h2>Permission Management</h2>

        <select
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <option value="">Select Role</option>

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

      <table className="permission-table">

        <thead>
          <tr>
            <th>Module</th>

            {actions.map((action) => (
              <th key={action}>
                {action.toUpperCase()}
              </th>
            ))}

          </tr>
        </thead>

        <tbody>

          {modules.map((module) => (

            <tr key={module}>

              <td>{module}</td>

              {actions.map((action) => (

                <td key={action}>

                  <input
                    type="checkbox"
                    checked={permissions[module][action]}
                    onChange={() =>
                      handlePermissionChange(module, action)
                    }
                  />

                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

      <div className="permission-footer">

        <button onClick={handleSave}>
          Save Permissions
        </button>

      </div>

    </div>
  );
}