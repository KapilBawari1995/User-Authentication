import React, { useEffect, useState } from "react";
import {
  Building2,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Users,
  CheckCircle2,
  RefreshCcw,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getDepartmentsRequest,
} from "../../../features/department/departmentSlice";

const Departments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const {
    departments,
    loading,
    error,
  } = useSelector((state) => state.department);

  // ================= GET DEPARTMENTS =================

  useEffect(() => {
    dispatch(getDepartmentsRequest());
  }, [dispatch]);

  // ================= FILTER =================

  const filteredDepartments = departments?.filter((department) => {
    const searchText = search.toLowerCase();

    return (
      department.name?.toLowerCase().includes(searchText) ||
      department.description?.toLowerCase().includes(searchText)
    );
  });

  // ================= RESET =================

  const handleReset = () => {
    setSearch("");
  };

  // ================= COUNTS =================

  const totalDepartments = departments?.length || 0;

  const activeDepartments =
    departments?.filter(
      (department) => department.isActive !== false
    ).length || 0;

  const inactiveDepartments =
    departments?.filter(
      (department) => department.isActive === false
    ).length || 0;

  return (
    <div className="text-slate-800 dark:text-slate-100">

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
            <Building2 size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
              Departments
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage departments and their assigned managers.
            </p>

          </div>

        </div>

        <button
          onClick={() => navigate("/admin/department/add")}
          className="
            inline-flex items-center justify-center
            gap-2
            bg-indigo-600 hover:bg-indigo-700
            text-white
            px-5 py-3
            rounded-xl
            font-semibold
            shadow-md shadow-indigo-100 dark:shadow-none
            transition-all duration-200
          "
        >
          <Plus size={19} />
          Add Department
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
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            p-5
            shadow-sm dark:shadow-none
            hover:shadow-md dark:hover:bg-slate-800
            transition
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Departments
              </p>

              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
                {totalDepartments}
              </h2>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                All available departments
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
              <Building2 size={23} />
            </div>

          </div>

        </div>

        {/* ACTIVE */}

        <div
          className="
            bg-white dark:bg-slate-900
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            p-5
            shadow-sm dark:shadow-none
            hover:shadow-md dark:hover:bg-slate-800
            transition
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Active Departments
              </p>

              <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                {activeDepartments}
              </h2>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Currently active
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
              <CheckCircle2 size={22} />
            </div>

          </div>

        </div>

        {/* INACTIVE */}

        <div
          className="
            bg-white dark:bg-slate-900
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            p-5
            shadow-sm dark:shadow-none
            hover:shadow-md dark:hover:bg-slate-800
            transition
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Inactive Departments
              </p>

              <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                {inactiveDepartments}
              </h2>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Currently inactive
              </p>

            </div>

            <div
              className="
                w-12 h-12 rounded-xl
                bg-red-50 dark:bg-red-500/10
                text-red-600 dark:text-red-400
                flex items-center justify-center
              "
            >
              <Building2 size={22} />
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
          rounded-2xl
          p-4
          mb-6
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
              placeholder="Search departments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full h-12
                pl-11 pr-4
                border border-slate-200 dark:border-slate-700
                rounded-xl
                bg-slate-50 dark:bg-slate-800
                text-slate-700 dark:text-slate-200
                placeholder:text-slate-400 dark:placeholder:text-slate-500
                text-sm
                outline-none
                focus:bg-white dark:focus:bg-slate-900
                focus:border-indigo-400
                focus:ring-4 focus:ring-indigo-500/10
                transition
              "
            />

          </div>

          {/* RESET */}

          <button
            onClick={handleReset}
            className="
              h-12
              inline-flex items-center
              justify-center
              gap-2
              px-5
              rounded-xl
              border border-slate-200 dark:border-slate-700
              bg-white dark:bg-slate-900
              text-slate-600 dark:text-slate-300
              text-sm
              font-semibold
              hover:bg-slate-50 dark:hover:bg-slate-800
              transition
            "
          >
            <RefreshCcw size={16} />
            Reset
          </button>

        </div>

      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <div
          className="
            mb-6
            p-4
            rounded-xl
            bg-red-50 dark:bg-red-500/10
            border border-red-200 dark:border-red-500/20
            text-red-600 dark:text-red-400
            text-sm
          "
        >
          {error}
        </div>
      )}

      {/* ================================================= */}
      {/* TABLE CARD */}
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
              All Departments
            </h2>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {filteredDepartments?.length || 0} departments available
            </p>

          </div>

          <div
            className="
              flex items-center gap-2
              text-xs text-slate-400 dark:text-slate-500
            "
          >
            <CheckCircle2 size={15} />
            Department Management
          </div>

        </div>

        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-slate-50 dark:bg-slate-800/70">

                <th
                  className="
                    px-6 py-4 text-left
                    text-[11px]
                    font-bold uppercase
                    tracking-wider
                    text-slate-400 dark:text-slate-500
                  "
                >
                  #
                </th>

                <th
                  className="
                    px-6 py-4 text-left
                    text-[11px]
                    font-bold uppercase
                    tracking-wider
                    text-slate-400 dark:text-slate-500
                  "
                >
                  Department
                </th>

                <th
                  className="
                    px-6 py-4 text-left
                    text-[11px]
                    font-bold uppercase
                    tracking-wider
                    text-slate-400 dark:text-slate-500
                  "
                >
                  Description
                </th>

                <th
                  className="
                    px-6 py-4 text-left
                    text-[11px]
                    font-bold uppercase
                    tracking-wider
                    text-slate-400 dark:text-slate-500
                  "
                >
                  Manager
                </th>

                <th
                  className="
                    px-6 py-4 text-left
                    text-[11px]
                    font-bold uppercase
                    tracking-wider
                    text-slate-400 dark:text-slate-500
                  "
                >
                  Status
                </th>

                <th
                  className="
                    px-6 py-4 text-right
                    text-[11px]
                    font-bold uppercase
                    tracking-wider
                    text-slate-400 dark:text-slate-500
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
                        w-8 h-8
                        mx-auto
                        border-[3px]
                        border-indigo-600 dark:border-indigo-400
                        border-t-transparent
                        rounded-full
                        animate-spin
                      "
                    />

                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                      Loading departments...
                    </p>

                  </td>

                </tr>

              ) : filteredDepartments?.length > 0 ? (

                filteredDepartments.map((department, index) => (

                  <tr
                    key={department._id}
                    className="
                      group
                      hover:bg-slate-50/80
                      dark:hover:bg-slate-800/60
                      transition-colors
                    "
                  >

                    {/* NUMBER */}

                    <td className="px-6 py-5">

                      <span className="text-sm text-slate-400 dark:text-slate-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                    </td>

                    {/* DEPARTMENT */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-11 h-11
                            rounded-xl
                            bg-gradient-to-br
                            from-indigo-50 to-violet-50
                            dark:from-indigo-500/10 dark:to-violet-500/10
                            text-indigo-600 dark:text-indigo-400
                            flex items-center
                            justify-center
                            border border-indigo-100 dark:border-indigo-500/20
                          "
                        >
                          <Building2 size={20} />
                        </div>

                        <div>

                          <p className="font-semibold text-slate-800 dark:text-slate-100">
                            {department.name}
                          </p>

                          <span className="text-[11px] text-slate-400 dark:text-slate-500">
                            Department
                          </span>

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
                        {department.description ||
                          "No description provided"}
                      </p>

                    </td>

                    {/* MANAGER */}

                    <td className="px-6 py-5">

                      {department.manager?.name ? (

                        <div className="flex items-center gap-2">

                          <div
                            className="
                              w-9 h-9
                              rounded-full
                              bg-indigo-100 dark:bg-indigo-500/10
                              text-indigo-700 dark:text-indigo-400
                              flex items-center
                              justify-center
                              font-semibold
                              text-sm
                            "
                          >
                            {department.manager.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <div>

                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                              {department.manager.name}
                            </p>

                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                              Manager
                            </p>

                          </div>

                        </div>

                      ) : (

                        <span
                          className="
                            inline-flex
                            items-center gap-1.5
                            px-3 py-1.5
                            rounded-lg
                            bg-slate-100 dark:bg-slate-800
                            text-slate-500 dark:text-slate-400
                            text-xs
                            font-semibold
                          "
                        >
                          <Users size={13} />
                          No Manager
                        </span>

                      )}

                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">

                      {department.isActive === false ? (

                        <span
                          className="
                            inline-flex
                            items-center gap-1.5
                            px-3 py-1.5
                            rounded-full
                            bg-red-50 dark:bg-red-500/10
                            text-red-700 dark:text-red-400
                            border border-red-100 dark:border-red-500/20
                            text-xs
                            font-semibold
                          "
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Inactive
                        </span>

                      ) : (

                        <span
                          className="
                            inline-flex
                            items-center gap-1.5
                            px-3 py-1.5
                            rounded-full
                            bg-emerald-50 dark:bg-emerald-500/10
                            text-emerald-700 dark:text-emerald-400
                            border border-emerald-100 dark:border-emerald-500/20
                            text-xs
                            font-semibold
                          "
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>

                      )}

                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5 relative">

                      <div
                        className="
                          flex items-center
                          justify-end
                          gap-2
                        "
                      >

                        {/* VIEW */}

                        <button
                          title="View Department"
                          className="
                            w-9 h-9
                            rounded-lg
                            border border-slate-200 dark:border-slate-700
                            bg-white dark:bg-slate-800
                            text-slate-500 dark:text-slate-400
                            flex items-center
                            justify-center
                            hover:text-indigo-600 dark:hover:text-indigo-400
                            hover:border-indigo-200 dark:hover:border-indigo-500/30
                            hover:bg-indigo-50 dark:hover:bg-indigo-500/10
                            transition
                          "
                        >
                          <Eye size={16} />
                        </button>

                        {/* EDIT */}

                        <button
                          title="Edit Department"
                          onClick={() =>
                            navigate(
                              `/admin/departments/edit/${department._id}`
                            )
                          }
                          className="
                            w-9 h-9
                            rounded-lg
                            border border-slate-200 dark:border-slate-700
                            bg-white dark:bg-slate-800
                            text-slate-500 dark:text-slate-400
                            flex items-center
                            justify-center
                            hover:text-indigo-600 dark:hover:text-indigo-400
                            hover:border-indigo-200 dark:hover:border-indigo-500/30
                            hover:bg-indigo-50 dark:hover:bg-indigo-500/10
                            transition
                          "
                        >
                          <Edit size={16} />
                        </button>

                        {/* DELETE */}

                        <button
                          title="Delete Department"
                          className="
                            w-9 h-9
                            rounded-lg
                            border border-slate-200 dark:border-slate-700
                            bg-white dark:bg-slate-800
                            text-slate-500 dark:text-slate-400
                            flex items-center
                            justify-center
                            hover:text-red-600 dark:hover:text-red-400
                            hover:border-red-200 dark:hover:border-red-500/30
                            hover:bg-red-50 dark:hover:bg-red-500/10
                            transition
                          "
                        >
                          <Trash2 size={16} />
                        </button>

                        {/* MORE */}

                        <button
                          title="More"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === department._id
                                ? null
                                : department._id
                            )
                          }
                          className="
                            w-9 h-9
                            rounded-lg
                            border border-slate-200 dark:border-slate-700
                            bg-white dark:bg-slate-800
                            text-slate-500 dark:text-slate-400
                            flex items-center
                            justify-center
                            hover:bg-slate-100 dark:hover:bg-slate-700
                            transition
                          "
                        >
                          <MoreHorizontal size={16} />
                        </button>

                      </div>

                      {openMenu === department._id && (
                        <div
                          className="
                            absolute
                            right-6
                            top-16
                            z-50
                            w-44
                            rounded-xl
                            border border-slate-200 dark:border-slate-700
                            bg-white dark:bg-slate-900
                            shadow-xl dark:shadow-black/30
                            overflow-hidden
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/departments/edit/${department._id}`
                              )
                            }
                            className="
                              w-full
                              px-4 py-3
                              text-left
                              text-sm
                              text-slate-600 dark:text-slate-300
                              hover:bg-slate-50 dark:hover:bg-slate-800
                            "
                          >
                            Edit Department
                          </button>

                          <button
                            type="button"
                            className="
                              w-full
                              px-4 py-3
                              text-left
                              text-sm
                              text-red-600 dark:text-red-400
                              hover:bg-red-50 dark:hover:bg-red-500/10
                            "
                          >
                            Delete Department
                          </button>
                        </div>
                      )}

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
                        w-14 h-14
                        mx-auto
                        rounded-2xl
                        bg-slate-100 dark:bg-slate-800
                        text-slate-400 dark:text-slate-500
                        flex items-center
                        justify-center
                        mb-4
                      "
                    >
                      <Building2 size={26} />
                    </div>

                    <h3 className="font-semibold text-slate-700 dark:text-slate-200">
                      No departments found
                    </h3>

                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                      Try changing your search.
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

export default Departments;