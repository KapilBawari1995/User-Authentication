import React, { useEffect, useMemo, useState } from "react";

import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ShieldCheck,
  Users,
  RefreshCw,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import usePermissions from "../../../hooks/usePermissions";

import {
  getRolesRequest,
  getRoleByIdRequest,
  deleteRoleRequest,
  clearRoleState,
} from "../../../features/role/roleSlice";

import RoleViewModal from "./ViewRoleModal";

const Roles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [viewRole, setViewRole] = useState(false);

  // =========================================================
  // REDUX
  // =========================================================

  const roleState = useSelector(
    (state) => state.role || {}
  );

  const {
    roles = [],
    totalCount = 0,

    getRolesLoading = false,
    getRolesError = null,

    role = null,
    getRoleLoading = false,

    deleteLoading = false,
    deleteSuccess = false,
    deleteError = null,
  } = roleState;

  // =========================================================
  // PERMISSIONS
  // =========================================================

  const {
    canView,
    canCreate,
    canEdit,
    canDelete,
  } = usePermissions("Roles");

  // =========================================================
  // GET ROLES
  // =========================================================

  const fetchRoles = () => {
    dispatch(getRolesRequest());
  };

  useEffect(() => {
    fetchRoles();
  }, [dispatch]);

  // =========================================================
  // DELETE SUCCESS
  // =========================================================

  useEffect(() => {
    if (!deleteSuccess) return;

    setDeleteId(null);

    dispatch(clearRoleState());

    fetchRoles();
  }, [deleteSuccess]);

  // =========================================================
  // SEARCH FILTER
  // =========================================================

  const filteredRoles = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return roles;
    }

    return roles.filter((roleItem) => {
      const name =
        roleItem?.name?.toLowerCase() || "";

      const description =
        roleItem?.description?.toLowerCase() || "";

      return (
        name.includes(value) ||
        description.includes(value)
      );
    });
  }, [roles, search]);

  // =========================================================
  // ROLE ICON
  // =========================================================

  const getRoleIcon = (index) => {
    const icons = [
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
      "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    ];

    return icons[index % icons.length];
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (id) => {
    if (!id) return;

    setOpenMenu(null);

    navigate(`/admin/roles/edit/${id}`);
  };

  // =========================================================
  // VIEW
  // =========================================================

  const handleView = (id) => {
    if (!id) return;

    setOpenMenu(null);

    // First open modal
    setViewRole(true);

    // Then API call
    dispatch(getRoleByIdRequest(id));
  };

  // =========================================================
  // ADD ROLE
  // =========================================================

  const handleAddRole = () => {
    navigate("/admin/roles/addrole");
  };

  // =========================================================
  // DELETE
  // =========================================================

  const handleDelete = (id) => {
    if (!id) return;

    setOpenMenu(null);
    setDeleteId(id);

    /*
      Abhi simple browser confirm use kar rahe hain.
      Baad mein isko separate DeleteRoleModal
      se replace kar sakte hain.
    */

    const confirmed = window.confirm(
      "Are you sure you want to delete this role?"
    );

    if (!confirmed) {
      setDeleteId(null);
      return;
    }

    dispatch(
      deleteRoleRequest(id)
    );
  };

  // =========================================================
  // CLOSE VIEW MODAL
  // =========================================================

  const handleCloseView = () => {
    setViewRole(false);

    dispatch(clearRoleState());
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      className="
        min-h-screen
        bg-[#f8fafc]
        dark:bg-slate-950
        p-4 sm:p-6
        text-slate-800
        dark:text-slate-100
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          mb-7
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              w-14 h-14
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-violet-600
              text-white
              shadow-lg
              shadow-indigo-200
              dark:shadow-none
              flex items-center
              justify-center
              shrink-0
            "
          >
            <ShieldCheck size={28} />
          </div>

          <div>
            <h1
              className="
                text-2xl sm:text-3xl
                font-bold
                text-slate-800
                dark:text-white
              "
            >
              Roles
            </h1>

            <p
              className="
                text-sm
                text-slate-500
                dark:text-slate-400
                mt-1
              "
            >
              Manage user roles and access levels.
            </p>
          </div>
        </div>

        {/* ADD ROLE */}

        {canCreate && (
          <button
            type="button"
            onClick={handleAddRole}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-5 py-3
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              font-semibold
              text-sm
              shadow-md
              shadow-indigo-100
              dark:shadow-none
              transition
            "
          >
            <Plus size={19} />
            Add Role
          </button>
        )}
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4
          mb-6
        "
      >
        {/* TOTAL */}

        <div
          className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-2xl
            p-5
            shadow-sm
            dark:shadow-none
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Total Roles
              </p>

              <h2
                className="
                  text-2xl
                  font-bold
                  mt-1
                  text-slate-800
                  dark:text-white
                "
              >
                {totalCount || roles.length}
              </h2>
            </div>

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-indigo-50
                dark:bg-indigo-500/10
                text-indigo-600
                dark:text-indigo-400
                flex items-center
                justify-center
              "
            >
              <ShieldCheck size={21} />
            </div>
          </div>
        </div>

        {/* VISIBLE */}

        <div
          className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-2xl
            p-5
            shadow-sm
            dark:shadow-none
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Visible Roles
              </p>

              <h2
                className="
                  text-2xl
                  font-bold
                  mt-1
                  text-slate-800
                  dark:text-white
                "
              >
                {filteredRoles.length}
              </h2>
            </div>

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-emerald-50
                dark:bg-emerald-500/10
                text-emerald-600
                dark:text-emerald-400
                flex items-center
                justify-center
              "
            >
              <Users size={21} />
            </div>
          </div>
        </div>

        {/* SEARCH */}

        <div
          className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-2xl
            p-5
            shadow-sm
            dark:shadow-none
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Search Result
              </p>

              <h2
                className="
                  text-2xl
                  font-bold
                  mt-1
                  text-slate-800
                  dark:text-white
                "
              >
                {search
                  ? filteredRoles.length
                  : "All"}
              </h2>
            </div>

            <div
              className="
                w-11 h-11
                rounded-xl
                bg-violet-50
                dark:bg-violet-500/10
                text-violet-600
                dark:text-violet-400
                flex items-center
                justify-center
              "
            >
              <Search size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div
        className="
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          rounded-2xl
          p-4
          mb-6
          shadow-sm
          dark:shadow-none
        "
      >
        <div
          className="
            flex flex-col
            sm:flex-row
            gap-3
          "
        >
          <div className="relative flex-1">
            <Search
              size={19}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search roles..."
              className="
                w-full
                h-11
                pl-11
                pr-4
                rounded-xl
                border
                border-slate-200
                dark:border-slate-700
                bg-slate-50
                dark:bg-slate-800
                text-sm
                text-slate-800
                dark:text-slate-100
                placeholder:text-slate-400
                outline-none
                focus:border-indigo-400
                focus:ring-4
                focus:ring-indigo-500/10
                transition
              "
            />
          </div>

          {/* REFRESH */}

          <button
            type="button"
            onClick={fetchRoles}
            disabled={getRolesLoading}
            className="
              h-11
              px-4
              rounded-xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              text-slate-600
              dark:text-slate-300
              inline-flex
              items-center
              justify-center
              gap-2
              text-sm
              font-medium
              hover:bg-slate-50
              dark:hover:bg-slate-700
              disabled:opacity-50
              transition
            "
          >
            <RefreshCw
              size={17}
              className={
                getRolesLoading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>
      </div>

      {/* =====================================================
          ERRORS
      ===================================================== */}

      {getRolesError && (
        <div
          className="
            mb-6
            p-4
            rounded-xl
            border
            border-red-200
            dark:border-red-500/20
            bg-red-50
            dark:bg-red-500/10
            text-red-600
            dark:text-red-400
            text-sm
          "
        >
          {getRolesError}
        </div>
      )}

      {deleteError && (
        <div
          className="
            mb-6
            p-4
            rounded-xl
            border
            border-red-200
            dark:border-red-500/20
            bg-red-50
            dark:bg-red-500/10
            text-red-600
            dark:text-red-400
            text-sm
          "
        >
          {deleteError}
        </div>
      )}

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div
        className="
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          rounded-2xl
          shadow-sm
          dark:shadow-none
          overflow-hidden
        "
      >
        {/* TABLE HEADER */}

        <div
          className="
            px-5 py-4
            border-b
            border-slate-200
            dark:border-slate-800
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2
              className="
                font-bold
                text-slate-800
                dark:text-white
              "
            >
              All Roles
            </h2>

            <p
              className="
                text-xs
                text-slate-400
                mt-1
              "
            >
              Manage role information and actions.
            </p>
          </div>

          <span
            className="
              px-3 py-1.5
              rounded-lg
              bg-slate-100
              dark:bg-slate-800
              text-xs
              font-semibold
              text-slate-600
              dark:text-slate-300
            "
          >
            {filteredRoles.length} Roles
          </span>
        </div>

        {/* LOADING */}

        {getRolesLoading ? (
          <div
            className="
              min-h-[300px]
              flex flex-col
              items-center
              justify-center
              gap-3
            "
          >
            <div
              className="
                w-10 h-10
                border-4
                border-indigo-100
                dark:border-slate-700
                border-t-indigo-600
                rounded-full
                animate-spin
              "
            />

            <p
              className="
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Loading roles...
            </p>
          </div>
        ) : filteredRoles.length === 0 ? (
          <div
            className="
              min-h-[300px]
              flex flex-col
              items-center
              justify-center
              text-center
              px-5
            "
          >
            <div
              className="
                w-16 h-16
                rounded-2xl
                bg-slate-100
                dark:bg-slate-800
                text-slate-400
                flex items-center
                justify-center
                mb-4
              "
            >
              <ShieldCheck size={30} />
            </div>

            <h3
              className="
                text-base
                font-semibold
                text-slate-700
                dark:text-slate-200
              "
            >
              {search
                ? "No roles found"
                : "No roles available"}
            </h3>

            <p
              className="
                text-sm
                text-slate-400
                mt-1
                max-w-sm
              "
            >
              {search
                ? "Try changing your search keyword."
                : "Create your first role to get started."}
            </p>

            {!search && canCreate && (
              <button
                type="button"
                onClick={handleAddRole}
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  px-4 py-2.5
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  text-sm
                  font-semibold
                  transition
                "
              >
                <Plus size={17} />
                Add Role
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr
                  className="
                    bg-slate-50
                    dark:bg-slate-800/50
                    border-b
                    border-slate-200
                    dark:border-slate-800
                  "
                >
                  <th
                    className="
                      px-5 py-4
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wide
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Role
                  </th>

                  <th
                    className="
                      px-5 py-4
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wide
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Description
                  </th>

                  <th
                    className="
                      px-5 py-4
                      text-center
                      text-xs
                      font-bold
                      uppercase
                      tracking-wide
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Type
                  </th>

                  <th
                    className="
                      px-5 py-4
                      text-center
                      text-xs
                      font-bold
                      uppercase
                      tracking-wide
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRoles.map(
                  (roleItem, index) => (
                    <tr
                      key={
                        roleItem?._id || index
                      }
                      className="
                        border-b
                        border-slate-100
                        dark:border-slate-800
                        last:border-b-0
                        hover:bg-slate-50
                        dark:hover:bg-slate-800/40
                        transition
                      "
                    >
                      {/* ROLE */}

                      <td className="px-5 py-4">
                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >
                          <div
                            className={`
                              w-11 h-11
                              rounded-xl
                              flex
                              items-center
                              justify-center
                              shrink-0
                              ${getRoleIcon(index)}
                            `}
                          >
                            <ShieldCheck
                              size={20}
                            />
                          </div>

                          <div>
                            <p
                              className="
                                font-semibold
                                text-sm
                                text-slate-800
                                dark:text-white
                              "
                            >
                              {roleItem?.name ||
                                "Unnamed Role"}
                            </p>

                            <p
                              className="
                                text-xs
                                text-slate-400
                                mt-0.5
                              "
                            >
                              ID:{" "}
                              {roleItem?._id?.slice(
                                -8
                              ) || "-"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* DESCRIPTION */}

                      <td className="px-5 py-4">
                        <p
                          className="
                            text-sm
                            text-slate-600
                            dark:text-slate-300
                            max-w-md
                            truncate
                          "
                          title={
                            roleItem?.description ||
                            ""
                          }
                        >
                          {roleItem?.description ||
                            "No description available"}
                        </p>
                      </td>

                      {/* TYPE */}

                      <td className="px-5 py-4 text-center">
                        {roleItem?.isSystem ? (
                          <span
                            className="
                              inline-flex
                              items-center
                              px-3 py-1.5
                              rounded-lg
                              bg-violet-50
                              dark:bg-violet-500/10
                              text-violet-600
                              dark:text-violet-400
                              text-xs
                              font-semibold
                            "
                          >
                            System
                          </span>
                        ) : (
                          <span
                            className="
                              inline-flex
                              items-center
                              px-3 py-1.5
                              rounded-lg
                              bg-emerald-50
                              dark:bg-emerald-500/10
                              text-emerald-600
                              dark:text-emerald-400
                              text-xs
                              font-semibold
                            "
                          >
                            Custom
                          </span>
                        )}
                      </td>

                      {/* ACTION */}

                      <td className="px-5 py-4 text-center">
                        <div className="relative flex items-center justify-center">
                          {/* 3 DOT */}

                          <button
                            type="button"
                            title="Actions"
                            onClick={(e) => {
                              e.stopPropagation();

                              setOpenMenu(
                                openMenu ===
                                  roleItem?._id
                                  ? null
                                  : roleItem?._id
                              );
                            }}
                            className="
                              w-9 h-9
                              inline-flex
                              items-center
                              justify-center
                              rounded-lg
                              text-slate-500
                              dark:text-slate-400
                              hover:bg-slate-100
                              dark:hover:bg-slate-800
                              hover:text-slate-700
                              dark:hover:text-slate-200
                              transition
                            "
                          >
                            <MoreVertical size={19} />
                          </button>

                          {/* DROPDOWN */}

                          {openMenu ===
                            roleItem?._id && (
                            <div
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                              className="
                                absolute
                                right-8
                                top-11
                                w-44
                                bg-white
                                dark:bg-slate-900
                                border
                                border-slate-200
                                dark:border-slate-700
                                rounded-xl
                                shadow-xl
                                z-50
                                overflow-hidden
                              "
                            >
                              {/* VIEW */}

                              {canView && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleView(
                                      roleItem?._id
                                    )
                                  }
                                  className="
                                    flex
                                    items-center
                                    gap-3
                                    w-full
                                    px-4
                                    py-3
                                    text-sm
                                    text-slate-600
                                    dark:text-slate-300
                                    hover:bg-slate-50
                                    dark:hover:bg-slate-800
                                    transition
                                  "
                                >
                                  <Eye
                                    size={16}
                                    className="
                                      text-blue-500
                                      dark:text-blue-400
                                    "
                                  />

                                  View Role
                                </button>
                              )}

                              {/* EDIT */}

                              {canEdit && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEdit(
                                      roleItem?._id
                                    )
                                  }
                                  className="
                                    flex
                                    items-center
                                    gap-3
                                    w-full
                                    px-4
                                    py-3
                                    text-sm
                                    text-slate-600
                                    dark:text-slate-300
                                    hover:bg-slate-50
                                    dark:hover:bg-slate-800
                                    transition
                                  "
                                >
                                  <Edit
                                    size={16}
                                    className="
                                      text-amber-500
                                      dark:text-amber-400
                                    "
                                  />

                                  Edit Role
                                </button>
                              )}

                              {/* DELETE */}

                              {canDelete && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(
                                      roleItem?._id
                                    )
                                  }
                                  disabled={
                                    deleteLoading &&
                                    deleteId ===
                                      roleItem?._id
                                  }
                                  className="
                                    flex
                                    items-center
                                    gap-3
                                    w-full
                                    px-4
                                    py-3
                                    text-sm
                                    text-red-600
                                    dark:text-red-400
                                    hover:bg-red-50
                                    dark:hover:bg-red-500/10
                                    transition
                                    disabled:opacity-50
                                  "
                                >
                                  {deleteLoading &&
                                  deleteId ===
                                    roleItem?._id ? (
                                    <RefreshCw
                                      size={16}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Trash2 size={16} />
                                  )}

                                  Delete Role
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =====================================================
          VIEW ROLE MODAL
      ===================================================== */}

      <RoleViewModal
        open={viewRole}
        role={role}
        loading={getRoleLoading}
        onClose={handleCloseView}
      />
    </div>
  );
};

export default Roles;