
import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Users as UsersIcon,
  RefreshCcw,
  UserCheck,
  UserX,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../../hooks/useDebounce";
import ViewUserModal from "./ViewUserModal";

import {
  getUsersRequest,
  getUserByIdRequest,
  deleteUserRequest,
} from "../../../features/user/userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);
  const [viewUser, setViewUser] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const {
    users,
    getUsersLoading,
    user,
    getUserLoading,
  } = useSelector((state) => state.user);

  // ================= GET USERS =================

  useEffect(() => {
    dispatch(
      getUsersRequest({
        search: debouncedSearch,
        status,
      })
    );
  }, [dispatch, debouncedSearch, status]);

  // ================= RESET =================

  const handleResetFilters = () => {
    setSearch("");
    setStatus("");

    dispatch(
      getUsersRequest({
        search: "",
        status: "",
      })
    );
  };

  // ================= STATUS COLOR =================

  const getStatusColor = (isActive) => {
    return isActive
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-red-50 text-red-700 border-red-200";
  };

  // ================= COUNTS =================

  const totalUsers = users?.length || 0;

  const activeUsers =
    users?.filter((item) => item.isActive).length || 0;

  const inactiveUsers =
    users?.filter((item) => !item.isActive).length || 0;

  const usersWithRole =
    users?.filter((item) => item.role?.name).length || 0;


    const handleDeleteUser = (id) => {
 

  dispatch(deleteUserRequest(id));
  setOpenMenu(null);
};

  return (
    <div>

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="flex flex-col sm:flex-row
        sm:items-center sm:justify-between
        gap-5 mb-8"
      >

        <div className="flex items-center gap-4">

          <div
            className="w-14 h-14 rounded-2xl
            bg-gradient-to-br from-indigo-500 to-violet-600
            text-white shadow-lg shadow-indigo-200
            flex items-center justify-center"
          >
            <UsersIcon size={27} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Users
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage users, roles and account status
            </p>

          </div>

        </div>

        <button
          onClick={() =>
            navigate("/admin/users/add")
          }
          className="inline-flex items-center
          justify-center gap-2
          bg-indigo-600 hover:bg-indigo-700
          text-white px-5 py-3
          rounded-xl font-semibold text-sm
          shadow-md shadow-indigo-100
          transition-all duration-200"
        >
          <Plus size={18} />
          Add User
        </button>

      </div>


      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      <div
        className="grid grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5 mb-7"
      >

        {/* TOTAL USERS */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          p-5 shadow-sm
          hover:shadow-md transition"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total Users
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {totalUsers}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                All registered users
              </p>

            </div>

            <div
              className="w-12 h-12 rounded-xl
              bg-indigo-50 text-indigo-600
              flex items-center justify-center"
            >
              <UsersIcon size={22} />
            </div>

          </div>

        </div>


        {/* ACTIVE */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          p-5 shadow-sm
          hover:shadow-md transition"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Active Users
              </p>

              <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                {activeUsers}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Currently active
              </p>

            </div>

            <div
              className="w-12 h-12 rounded-xl
              bg-emerald-50 text-emerald-600
              flex items-center justify-center"
            >
              <UserCheck size={22} />
            </div>

          </div>

        </div>


        {/* INACTIVE */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          p-5 shadow-sm
          hover:shadow-md transition"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Inactive Users
              </p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {inactiveUsers}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Currently inactive
              </p>

            </div>

            <div
              className="w-12 h-12 rounded-xl
              bg-red-50 text-red-600
              flex items-center justify-center"
            >
              <UserX size={22} />
            </div>

          </div>

        </div>


        {/* USERS WITH ROLE */}

        <div
          className="bg-white rounded-2xl
          border border-slate-200
          p-5 shadow-sm
          hover:shadow-md transition"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Assigned Roles
              </p>

              <h2 className="text-3xl font-bold text-violet-600 mt-2">
                {usersWithRole}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Users with roles
              </p>

            </div>

            <div
              className="w-12 h-12 rounded-xl
              bg-violet-50 text-violet-600
              flex items-center justify-center"
            >
              <ShieldCheck size={22} />
            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* FILTER CARD */}
      {/* ================================================= */}

      <div
        className="bg-white rounded-2xl
        border border-slate-200
        shadow-sm p-5 mb-6"
      >

        <div
          className="flex flex-col
          lg:flex-row
          lg:items-center
          gap-3"
        >

          {/* SEARCH */}

          <div className="relative w-full lg:w-80">

            <Search
              size={18}
              className="absolute left-3.5
              top-1/2 -translate-y-1/2
              text-slate-400"
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full h-11
              border border-slate-200
              bg-slate-50
              rounded-xl
              pl-11 pr-4
              text-sm outline-none
              focus:bg-white
              focus:border-indigo-400
              focus:ring-4 focus:ring-indigo-50
              transition"
            />

          </div>


          {/* STATUS */}

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="h-11
            border border-slate-200
            bg-slate-50
            rounded-xl
            px-4
            text-sm text-slate-600
            outline-none
            focus:bg-white
            focus:border-indigo-400
            focus:ring-4 focus:ring-indigo-50
            w-full lg:w-48
            transition"
          >

            <option value="">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

          </select>


          {/* RESET */}

          <button
            onClick={handleResetFilters}
            className="h-11
            inline-flex items-center
            justify-center gap-2
            px-5
            rounded-xl
            border border-slate-200
            bg-white
            text-slate-600
            text-sm font-semibold
            hover:bg-slate-50
            transition"
          >

            <RefreshCcw size={16} />

            Reset

          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* TABLE CARD */}
      {/* ================================================= */}

      <div
        className="bg-white rounded-2xl
        border border-slate-200
        shadow-sm overflow-hidden"
      >

        {/* TABLE HEADER */}

        <div
          className="px-6 py-5
          border-b border-slate-200
          flex items-center justify-between"
        >

          <div>

            <h2 className="font-bold text-slate-800">
              All Users
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              View and manage registered users
            </p>

          </div>

          <div
            className="px-3 py-1.5
            rounded-lg
            bg-indigo-50
            text-indigo-600
            text-sm font-semibold"
          >
            {users?.length || 0} Users
          </div>

        </div>


        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th
                  className="text-left
                  px-6 py-4
                  text-xs font-bold
                  uppercase tracking-wide
                  text-slate-500"
                >
                  User
                </th>

                <th
                  className="text-left
                  px-6 py-4
                  text-xs font-bold
                  uppercase tracking-wide
                  text-slate-500"
                >
                  Email
                </th>

                <th
                  className="text-left
                  px-6 py-4
                  text-xs font-bold
                  uppercase tracking-wide
                  text-slate-500"
                >
                  Role
                </th>

                <th
                  className="text-left
                  px-6 py-4
                  text-xs font-bold
                  uppercase tracking-wide
                  text-slate-500"
                >
                  Status
                </th>

                <th
                  className="text-center
                  px-6 py-4
                  text-xs font-bold
                  uppercase tracking-wide
                  text-slate-500"
                >
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {/* LOADING */}

              {getUsersLoading ? (

                <tr>

                  <td
                    colSpan={5}
                    className="text-center py-16"
                  >

                    <div
                      className="flex flex-col
                      items-center justify-center
                      gap-3"
                    >

                      <div
                        className="w-8 h-8
                        border-4
                        border-indigo-100
                        border-t-indigo-600
                        rounded-full
                        animate-spin"
                      />

                      <p className="text-sm text-slate-500">
                        Loading users...
                      </p>

                    </div>

                  </td>

                </tr>

              ) : users?.length > 0 ? (

                users.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b
                    border-slate-100
                    hover:bg-slate-50/70
                    transition"
                  >

                    {/* USER */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className="w-10 h-10
                          rounded-xl
                          bg-gradient-to-br
                          from-indigo-50 to-violet-50
                          text-indigo-700
                          border border-indigo-100
                          flex items-center
                          justify-center
                          font-bold"
                        >
                          {item.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        <div>

                          <p
                            className="font-semibold
                            text-slate-800"
                          >
                            {item.name}
                          </p>

                          <p
                            className="text-xs
                            text-slate-400 mt-0.5"
                          >
                            Registered User
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td
                      className="px-6 py-4
                      text-sm text-slate-600"
                    >
                      {item.email}
                    </td>


                    {/* ROLE */}

                    <td className="px-6 py-4">

                      {item.role?.name ? (

                        <span
                          className="inline-flex
                          items-center gap-1.5
                          px-3 py-1.5
                          rounded-lg
                          bg-indigo-50
                          text-indigo-700
                          border border-indigo-100
                          text-xs font-semibold"
                        >

                          <ShieldCheck size={13} />

                          {item.role.name}

                        </span>

                      ) : (

                        <span
                          className="text-slate-400
                          text-sm"
                        >
                          No Role
                        </span>

                      )}

                    </td>


                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex
                        items-center gap-1.5
                        px-3 py-1.5
                        rounded-full
                        border
                        text-xs font-semibold
                        ${getStatusColor(
                          item.isActive
                        )}`}
                      >

                        <span
                          className={`w-1.5 h-1.5
                          rounded-full
                          ${
                            item.isActive
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                        />

                        {item.isActive
                          ? "Active"
                          : "Inactive"}

                      </span>

                    </td>


                    {/* ACTION */}

                    <td
                      className="px-6 py-4
                      text-center relative"
                    >

                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === item._id
                              ? null
                              : item._id
                          )
                        }
                        className="w-9 h-9
                        inline-flex
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-500
                        hover:bg-slate-100
                        hover:text-slate-700
                        transition"
                      >
                        <MoreVertical size={19} />
                      </button>


                      {openMenu === item._id && (

                        <div
                          className="absolute
                          right-8 top-14
                          bg-white
                          border border-slate-200
                          shadow-xl
                          rounded-xl
                          w-44
                          z-50
                          overflow-hidden"
                        >

                          {/* VIEW */}

                          <button
                            onClick={() => {

                              dispatch(
                                getUserByIdRequest(
                                  item._id
                                )
                              );

                              setViewUser(true);
                              setOpenMenu(null);

                            }}
                            className="flex
                            items-center gap-3
                            px-4 py-3
                            w-full
                            text-sm
                            text-slate-600
                            hover:bg-slate-50
                            transition"
                          >

                            <Eye
                              size={16}
                              className="text-indigo-500"
                            />

                            View User

                          </button>


                          {/* EDIT */}

                          <button
                            onClick={() => {

                              setOpenMenu(null);

                              navigate(
                                `/admin/users/edit/${item._id}`
                              );

                            }}
                            className="flex
                            items-center gap-3
                            w-full
                            px-4 py-3
                            text-sm
                            text-slate-600
                            hover:bg-slate-50
                            transition"
                          >

                            <Edit
                              size={16}
                              className="text-amber-500"
                            />

                            Edit User

                          </button>


                          {/* DELETE */}

                      <button
  onClick={() => handleDeleteUser(item._id)}
  className="flex
  items-center gap-3
  px-4 py-3
  w-full
  text-sm
  text-red-600
  hover:bg-red-50
  transition"
>
  <Trash2 size={16} />
  Delete User
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
                    colSpan={5}
                    className="text-center py-16"
                  >

                    <div
                      className="flex flex-col
                      items-center"
                    >

                      <div
                        className="w-14 h-14
                        rounded-2xl
                        bg-slate-100
                        text-slate-400
                        flex items-center
                        justify-center
                        mb-3"
                      >
                        <UsersIcon size={25} />
                      </div>

                      <p
                        className="font-semibold
                        text-slate-700"
                      >
                        No Users Found
                      </p>

                      <p
                        className="text-sm
                        text-slate-400 mt-1"
                      >
                        Try changing your search
                        or filter.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ================================================= */}
      {/* VIEW MODAL */}
      {/* ================================================= */}

      <ViewUserModal
        open={viewUser}
        user={user}
        loading={getUserLoading}
        onClose={() => setViewUser(false)}
      />

    </div>
  );
};

export default Users;

