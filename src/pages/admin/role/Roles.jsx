import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Plus,
  Search,
  Users,
  Settings,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Lock,
  CheckCircle2,
} from "lucide-react";

import {
  getRolesRequest,
} from "../../../features/role/roleSlice";

const Roles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const {
    roles,
    loading,
    error,
  } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getRolesRequest());
  }, [dispatch]);

  // ================= FILTER =================

  const filteredRoles = roles?.filter((role) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      role.name?.toLowerCase().includes(searchText) ||
      role.description?.toLowerCase().includes(searchText);

    const matchesType =
      typeFilter === "All" ||
      (typeFilter === "System"
        ? role.isSystem
        : !role.isSystem);

    return matchesSearch && matchesType;
  });

  // ================= COUNTS =================

  const totalRoles = roles?.length || 0;

  const systemRoles =
    roles?.filter((role) => role.isSystem).length || 0;

  const customRoles =
    roles?.filter((role) => !role.isSystem).length || 0;

  // ================= PERMISSION COUNT =================

  const getPermissionCount = (role) => {
    return (
      role.permissions?.filter(
        (permission) =>
          permission.view ||
          permission.create ||
          permission.edit ||
          permission.delete
      ).length || 0
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 p-6 text-slate-800 dark:text-slate-100">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div className="flex items-center gap-4">

          <div
            className="
              w-14 h-14 rounded-2xl
              bg-gradient-to-br from-indigo-500 to-violet-600
              text-white
              shadow-lg shadow-indigo-200 dark:shadow-none
              flex items-center justify-center
            "
          >
            <ShieldCheck size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
              Roles & Permissions
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage user roles and control access permissions.
            </p>

          </div>

        </div>

        <button
          onClick={() =>
            navigate("/admin/roles/addrole")
          }
          className="
            inline-flex items-center justify-center
            gap-2 bg-indigo-600 hover:bg-indigo-700
            text-white px-5 py-3 rounded-xl
            font-semibold shadow-md shadow-indigo-100 dark:shadow-none
            transition-all duration-200
          "
        >
          <Plus size={19} />
          Add Role
        </button>

      </div>

      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-7">

        {/* TOTAL */}

        <div
          className="
            bg-white dark:bg-slate-900
            rounded-2xl border border-slate-200 dark:border-slate-700
            p-5 shadow-sm dark:shadow-none
            hover:shadow-md dark:hover:bg-slate-800
            transition
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Roles
              </p>

              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
                {totalRoles}
              </h2>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                All available roles
              </p>

            </div>

            <div
              className="
                w-12 h-12 rounded-xl
                bg-indigo-50 dark:bg-indigo-500/10
                text-indigo-600 dark:text-indigo-400
                flex items-center justify-center
              "
            >
              <ShieldCheck size={23} />
            </div>

          </div>

        </div>

        {/* SYSTEM */}

        <div
          className="
            bg-white dark:bg-slate-900
            rounded-2xl border border-slate-200 dark:border-slate-700
            p-5 shadow-sm dark:shadow-none
            hover:shadow-md dark:hover:bg-slate-800
            transition
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                System Roles
              </p>

              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {systemRoles}
              </h2>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Protected system roles
              </p>

            </div>

            <div
              className="
                w-12 h-12 rounded-xl
                bg-blue-50 dark:bg-blue-500/10
                text-blue-600 dark:text-blue-400
                flex items-center justify-center
              "
            >
              <Lock size={21} />
            </div>

          </div>

        </div>

        {/* CUSTOM */}

        <div
          className="
            bg-white dark:bg-slate-900
            rounded-2xl border border-slate-200 dark:border-slate-700
            p-5 shadow-sm dark:shadow-none
            hover:shadow-md dark:hover:bg-slate-800
            transition
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Custom Roles
              </p>

              <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                {customRoles}
              </h2>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Roles created by admin
              </p>

            </div>

            <div
              className="
                w-12 h-12 rounded-xl
                bg-emerald-50 dark:bg-emerald-500/10
                text-emerald-600 dark:text-emerald-400
                flex items-center justify-center
              "
            >
              <Users size={22} />
            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* SEARCH / FILTER */}
      {/* ================================================= */}

      <div
        className="
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-700
          rounded-2xl p-4 mb-6
          shadow-sm dark:shadow-none
        "
      >

        <div className="flex flex-col md:flex-row gap-4">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={19}
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-slate-400 dark:text-slate-500
              "
            />

            <input
              type="text"
              placeholder="Search roles..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full h-12
                pl-11 pr-4
                border border-slate-200 dark:border-slate-700
                rounded-xl
                bg-slate-50 dark:bg-slate-800
                text-slate-700 dark:text-slate-200
                placeholder:text-slate-400 dark:placeholder:text-slate-500
                text-sm outline-none
                focus:bg-white dark:focus:bg-slate-900
                focus:border-indigo-400
                focus:ring-4 focus:ring-indigo-500/10
                transition
              "
            />

          </div>

          {/* FILTER */}

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
            className="
              h-12 min-w-[180px]
              px-4
              border border-slate-200 dark:border-slate-700
              rounded-xl
              bg-slate-50 dark:bg-slate-800
              text-sm text-slate-700 dark:text-slate-200
              outline-none
              focus:bg-white dark:focus:bg-slate-900
              focus:border-indigo-400
              focus:ring-4 focus:ring-indigo-500/10
            "
          >

            <option value="All">
              All Roles
            </option>

            <option value="System">
              System Roles
            </option>

            <option value="Custom">
              Custom Roles
            </option>

          </select>

        </div>

      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (

        <div
          className="
            mb-6 p-4 rounded-xl
            bg-red-50 dark:bg-red-500/10
            border border-red-200 dark:border-red-500/20
            text-red-600 dark:text-red-400 text-sm
          "
        >
          {error}
        </div>

      )}

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

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
              All Roles
            </h2>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {filteredRoles?.length || 0} roles available
            </p>

          </div>

          <div
            className="
              flex items-center gap-2
              text-xs text-slate-400 dark:text-slate-500
            "
          >
            <CheckCircle2 size={15} />
            Access controlled
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-slate-50 dark:bg-slate-800/70">

                <th
                  className="
                    px-6 py-4 text-left
                    text-[11px] font-bold uppercase
                    tracking-wider text-slate-400 dark:text-slate-500
                  "
                >
                  #
                </th>

                <th
                  className="
                    px-6 py-4 text-left
                    text-[11px] font-bold uppercase
                    tracking-wider text-slate-400 dark:text-slate-500
                  "
                >
                  Role
                </th>

                <th
                  className="
                    px-6 py-4 text-left
                    text-[11px] font-bold uppercase
                    tracking-wider text-slate-400 dark:text-slate-500
                  "
                >
                  Description
                </th>

                <th
                  className="
                    px-6 py-4 text-left
                    text-[11px] font-bold uppercase
                    tracking-wider text-slate-400 dark:text-slate-500
                  "
                >
                  Type
                </th>

                <th
                  className="
                    px-6 py-4 text-left
                    text-[11px] font-bold uppercase
                    tracking-wider text-slate-400 dark:text-slate-500
                  "
                >
                  Permissions
                </th>

                <th
                  className="
                    px-6 py-4 text-right
                    text-[11px] font-bold uppercase
                    tracking-wider text-slate-400 dark:text-slate-500
                  "
                >
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

              {/* LOADING */}

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="py-16 text-center"
                  >

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
                      Loading roles...
                    </p>

                  </td>

                </tr>

              ) : filteredRoles?.length > 0 ? (

                filteredRoles.map((role, index) => (

                  <tr
                    key={role._id}
                    className="
                      group
                      hover:bg-slate-50/80 dark:hover:bg-slate-800/60
                      transition-colors
                    "
                  >

                    {/* NUMBER */}

                    <td className="px-6 py-5">

                      <span className="text-sm text-slate-400 dark:text-slate-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                    </td>

                    {/* ROLE */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-11 h-11 rounded-xl
                            bg-gradient-to-br
                            from-indigo-50 to-violet-50
                            dark:from-indigo-500/10 dark:to-violet-500/10
                            text-indigo-600 dark:text-indigo-400
                            flex items-center justify-center
                            border border-indigo-100 dark:border-indigo-500/20
                          "
                        >
                          <ShieldCheck size={20} />
                        </div>

                        <div>

                          <p className="font-semibold text-slate-800 dark:text-slate-100">
                            {role.name}
                          </p>

                          {role.isDefault && (

                            <span
                              className="
                                text-[11px]
                                font-medium
                                text-indigo-500 dark:text-indigo-400
                              "
                            >
                              Default Role
                            </span>

                          )}

                        </div>

                      </div>

                    </td>

                    {/* DESCRIPTION */}

                    <td className="px-6 py-5 max-w-sm">

                      <p
                        className="
                          text-sm
                          text-slate-500 dark:text-slate-400
                          line-clamp-2
                        "
                      >
                        {role.description || "No description provided"}
                      </p>

                    </td>

                    {/* TYPE */}

                    <td className="px-6 py-5">

                      {role.isSystem ? (

                        <span
                          className="
                            inline-flex items-center
                            gap-1.5 px-3 py-1.5
                            rounded-full
                            bg-blue-50 dark:bg-blue-500/10
                            text-blue-700 dark:text-blue-400
                            border border-blue-100 dark:border-blue-500/20
                            text-xs font-semibold
                          "
                        >
                          <Lock size={12} />
                          System
                        </span>

                      ) : (

                        <span
                          className="
                            inline-flex items-center
                            gap-1.5 px-3 py-1.5
                            rounded-full
                            bg-emerald-50 dark:bg-emerald-500/10
                            text-emerald-700 dark:text-emerald-400
                            border border-emerald-100 dark:border-emerald-500/20
                            text-xs font-semibold
                          "
                        >
                          <Users size={12} />
                          Custom
                        </span>

                      )}

                    </td>

                    {/* PERMISSIONS */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <div
                          className="
                            w-8 h-8 rounded-lg
                            bg-violet-50 dark:bg-violet-500/10
                            text-violet-600 dark:text-violet-400
                            flex items-center justify-center
                          "
                        >
                          <Settings size={15} />
                        </div>

                        <div>

                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {getPermissionCount(role)}
                          </p>

                          <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            Modules
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">

                      <div
                        className="
                          flex items-center
                          justify-end gap-2
                        "
                      >

                        <button
                          title="View Role"
                          className="
                            w-9 h-9 rounded-lg
                            border border-slate-200 dark:border-slate-700
                            bg-white dark:bg-slate-800
                            text-slate-500 dark:text-slate-400
                            flex items-center justify-center
                            hover:text-indigo-600 dark:hover:text-indigo-400
                            hover:border-indigo-200 dark:hover:border-indigo-500/30
                            hover:bg-indigo-50 dark:hover:bg-indigo-500/10
                            transition
                          "
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          title="Edit Role"
                          className="
                            w-9 h-9 rounded-lg
                            border border-slate-200 dark:border-slate-700
                            bg-white dark:bg-slate-800
                            text-slate-500 dark:text-slate-400
                            flex items-center justify-center
                            hover:text-indigo-600 dark:hover:text-indigo-400
                            hover:border-indigo-200 dark:hover:border-indigo-500/30
                            hover:bg-indigo-50 dark:hover:bg-indigo-500/10
                            transition
                          "
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          title="Delete Role"
                          className="
                            w-9 h-9 rounded-lg
                            border border-slate-200 dark:border-slate-700
                            bg-white dark:bg-slate-800
                            text-slate-500 dark:text-slate-400
                            flex items-center justify-center
                            hover:text-red-600 dark:hover:text-red-400
                            hover:border-red-200 dark:hover:border-red-500/30
                            hover:bg-red-50 dark:hover:bg-red-500/10
                            transition
                          "
                        >
                          <Trash2 size={16} />
                        </button>

                        <button
                          title="More"
                          className="
                            w-9 h-9 rounded-lg
                            border border-slate-200 dark:border-slate-700
                            bg-white dark:bg-slate-800
                            text-slate-500 dark:text-slate-400
                            flex items-center justify-center
                            hover:bg-slate-100 dark:hover:bg-slate-700
                            transition
                          "
                        >
                          <MoreHorizontal size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                /* EMPTY */

                <tr>

                  <td
                    colSpan="6"
                    className="py-16 text-center"
                  >

                    <div
                      className="
                        w-14 h-14 mx-auto
                        rounded-2xl
                        bg-slate-100 dark:bg-slate-800
                        text-slate-400 dark:text-slate-500
                        flex items-center justify-center mb-4
                      "
                    >
                      <ShieldCheck size={26} />
                    </div>

                    <h3 className="font-semibold text-slate-700 dark:text-slate-200">
                      No roles found
                    </h3>

                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                      Try changing your search or filter.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Roles;