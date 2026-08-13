import React, { useEffect, useState } from "react";
import {
  Users,
  Plus,
  Mail,
  UserRound,
  MoreVertical,
  X,
  Check,
  UserPlus,
} from "lucide-react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import {
  addTeamMembersRequest,
} from "../../../features/project/projectSlice";

import { getUsersRequest } from "../../../features/user/userSlice";

const TeamMembersTask = ({
  teamMembers = [],
  projectId,
}) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  // =====================================================
  // REDUX
  // =====================================================

  const {
    addTeamMembersLoading,
    addTeamMembersSuccess,
    addTeamMembersError,
  } = useSelector((state) => state.project);

  const {
    users = [],
    getUsersLoading,
  } = useSelector((state) => state.user);

  // =====================================================
  // LOAD USERS
  // =====================================================

  useEffect(() => {
    if (!showModal) return;

    dispatch(getUsersRequest());
  }, [showModal, dispatch]);

  // =====================================================
  // ADD MEMBER SUCCESS
  // =====================================================

  useEffect(() => {
    if (!addTeamMembersSuccess) return;

    setShowModal(false);
    formik.resetForm();
  }, [addTeamMembersSuccess]);

  // =====================================================
  // FORMIK
  // =====================================================

  const formik = useFormik({
    initialValues: {
      teamMembers: [],
    },

    validationSchema: Yup.object({
      teamMembers: Yup.array()
        .min(1, "Please select at least one team member")
        .required("Please select team members"),
    }),

    onSubmit: (values) => {
      if (!projectId) {
        console.error("Project ID is missing");
        return;
      }

      if (!values.teamMembers.length) {
        return;
      }

      dispatch(
        addTeamMembersRequest({
          projectId,
          teamMembers: values.teamMembers,
        })
      );
    },
  });

  // =====================================================
  // OPEN MODAL
  // =====================================================

  const handleOpenModal = () => {
    formik.resetForm();
    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    if (addTeamMembersLoading) return;

    formik.resetForm();

    dispatch(clearAddTeamMembersState());

    setShowModal(false);
  };

  // =====================================================
  // SELECT USER
  // =====================================================

  const handleUserSelect = (userId) => {
    const currentMembers = formik.values.teamMembers;

    if (currentMembers.includes(userId)) {
      formik.setFieldValue(
        "teamMembers",
        currentMembers.filter((id) => id !== userId)
      );
    } else {
      formik.setFieldValue(
        "teamMembers",
        [...currentMembers, userId]
      );
    }
  };

  return (
    <>
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div className="flex items-center gap-3">

          <div
            className="
              w-11 h-11
              rounded-xl
              bg-indigo-50 dark:bg-indigo-500/10
              text-indigo-600 dark:text-indigo-400
              flex
              items-center
              justify-center
            "
          >
            <Users size={21} />
          </div>

          <div>

            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              Team Members
            </h2>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              People assigned to this project
            </p>

          </div>

        </div>

        {/* ADD MEMBER */}

        <button
          type="button"
          onClick={handleOpenModal}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            px-4
            py-2.5
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            text-sm
            font-semibold
            shadow-sm
            transition
          "
        >
          <Plus size={17} />
          Add Team Member
        </button>

      </div>

      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          px-4
          py-3
          mb-5
          rounded-xl
          bg-slate-50 dark:bg-slate-800
          border
          border-slate-100 dark:border-slate-700
        "
      >

        <div className="flex items-center gap-2">

          <Users
            size={17}
            className="text-slate-400 dark:text-slate-500"
          />

          <span className="text-sm text-slate-500 dark:text-slate-400">
            Total Team Members
          </span>

        </div>

        <span
          className="
            px-3
            py-1
            rounded-full
            bg-indigo-50 dark:bg-indigo-500/10
            text-indigo-600 dark:text-indigo-400
            text-xs
            font-bold
          "
        >
          {teamMembers.length}
        </span>

      </div>

      {/* ================================================= */}
      {/* TEAM LIST */}
      {/* ================================================= */}

      {teamMembers.length > 0 ? (

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-4
          "
        >

          {teamMembers.map((member) => (

            <div
              key={member._id}
              className="
                group
                relative
                bg-white dark:bg-slate-900
                border
                border-slate-200 dark:border-slate-700
                rounded-xl
                p-4
                hover:border-indigo-200 dark:hover:border-indigo-500/30
                hover:shadow-sm
                dark:hover:bg-slate-800
                transition
              "
            >

              {/* TOP */}

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  {/* AVATAR */}

                  <div
                    className="
                      w-11 h-11
                      rounded-xl
                      bg-gradient-to-br
                      from-indigo-500
                      to-violet-500
                      text-white
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-sm
                      shrink-0
                    "
                  >
                    {member?.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>

                  {/* NAME */}

                  <div className="min-w-0">

                    <p
                      className="
                        text-sm
                        font-bold
                        text-slate-800 dark:text-white
                        truncate
                      "
                    >
                      {member?.name || "Unknown User"}
                    </p>

                    <div className="flex items-center gap-1 mt-1">

                      <UserRound
                        size={12}
                        className="text-slate-400 dark:text-slate-500"
                      />

                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        Team Member
                      </span>

                    </div>

                  </div>

                </div>

                {/* MORE */}

                <button
                  type="button"
                  className="
                    w-8 h-8
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-slate-400 dark:text-slate-500
                    hover:bg-slate-100 dark:hover:bg-slate-800
                    hover:text-slate-600 dark:hover:text-slate-300
                    transition
                  "
                >
                  <MoreVertical size={17} />
                </button>

              </div>

              {/* EMAIL */}

              <div
                className="
                  mt-4
                  pt-3
                  border-t
                  border-slate-100 dark:border-slate-800
                  flex
                  items-center
                  gap-2
                "
              >

                <Mail
                  size={14}
                  className="text-slate-400 dark:text-slate-500 shrink-0"
                />

                <p
                  className="
                    text-xs
                    text-slate-500 dark:text-slate-400
                    truncate
                  "
                >
                  {member?.email || "No email available"}
                </p>

              </div>

            </div>

          ))}

        </div>

      ) : (

        /* EMPTY STATE */

        <div
          className="
            border
            border-dashed
            border-slate-200 dark:border-slate-700
            rounded-2xl
            py-12
            px-5
            text-center
            bg-slate-50/50 dark:bg-slate-900/50
          "
        >

          <div
            className="
              w-14 h-14
              rounded-2xl
              bg-indigo-50 dark:bg-indigo-500/10
              text-indigo-500 dark:text-indigo-400
              flex
              items-center
              justify-center
              mx-auto
              mb-4
            "
          >
            <Users size={25} />
          </div>

          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">
            No Team Members
          </h3>

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm mx-auto">
            No team members have been assigned to this project yet.
          </p>

          <button
            type="button"
            onClick={handleOpenModal}
            className="
              inline-flex
              items-center
              gap-2
              mt-5
              px-4
              py-2.5
              rounded-xl
              border
              border-indigo-200 dark:border-indigo-500/30
              bg-white dark:bg-slate-900
              text-indigo-600 dark:text-indigo-400
              text-sm
              font-semibold
              hover:bg-indigo-50 dark:hover:bg-indigo-500/10
              transition
            "
          >
            <Plus size={16} />
            Add Team Member
          </button>

        </div>

      )}

      {/* ================================================= */}
      {/* ADD TEAM MEMBER MODAL */}
      {/* ================================================= */}

      {showModal && (

        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-slate-900/40
            dark:bg-black/60
            backdrop-blur-sm
            p-4
          "
        >

          <div
            className="
              w-full
              max-w-lg
              bg-white dark:bg-slate-900
              rounded-2xl
              shadow-2xl
              overflow-hidden
            "
          >

            {/* MODAL HEADER */}

            <div
              className="
                px-6
                py-5
                border-b
                border-slate-200 dark:border-slate-700
                flex
                items-center
                justify-between
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10 h-10
                    rounded-xl
                    bg-indigo-50 dark:bg-indigo-500/10
                    text-indigo-600 dark:text-indigo-400
                    flex
                    items-center
                    justify-center
                  "
                >
                  <UserPlus size={19} />
                </div>

                <div>

                  <h3 className="font-bold text-slate-800 dark:text-white">
                    Add Team Members
                  </h3>

                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Select users for this project
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={addTeamMembersLoading}
                className="
                  w-9 h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-slate-400 dark:text-slate-500
                  hover:bg-slate-100 dark:hover:bg-slate-800
                  hover:text-slate-600 dark:hover:text-slate-300
                  disabled:opacity-50
                "
              >
                <X size={19} />
              </button>

            </div>

            {/* FORM */}

            <form onSubmit={formik.handleSubmit}>

              <div className="p-6">

                {/* SELECTED COUNT */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    px-4
                    py-3
                    mb-4
                    rounded-xl
                    bg-indigo-50 dark:bg-indigo-500/10
                    border
                    border-indigo-100 dark:border-indigo-500/20
                  "
                >

                  <span className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">
                    Selected Members
                  </span>

                  <span
                    className="
                      px-2.5
                      py-1
                      rounded-full
                      bg-white dark:bg-slate-800
                      text-indigo-600 dark:text-indigo-400
                      text-xs
                      font-bold
                    "
                  >
                    {formik.values.teamMembers.length}
                  </span>

                </div>

                {/* USER LIST */}

                <div className="max-h-80 overflow-y-auto space-y-2">

                  {getUsersLoading ? (

                    <div className="py-8 text-center">

                      <p className="text-sm text-slate-400 dark:text-slate-500">
                        Loading users...
                      </p>

                    </div>

                  ) : users.length > 0 ? (

                    users.map((user) => {

                      const isSelected =
                        formik.values.teamMembers.includes(
                          user._id
                        );

                      const alreadyMember =
                        teamMembers.some(
                          (member) =>
                            member._id === user._id
                        );

                      return (

                        <button
                          type="button"
                          key={user._id}
                          disabled={alreadyMember}
                          onClick={() =>
                            handleUserSelect(user._id)
                          }
                          className={`
                            w-full
                            flex
                            items-center
                            gap-3
                            p-3
                            rounded-xl
                            border
                            text-left
                            transition

                            ${
                              alreadyMember
                                ? "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 opacity-60 cursor-not-allowed"
                                : isSelected
                                ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30"
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }
                          `}
                        >

                          {/* AVATAR */}

                          <div
                            className="
                              w-10 h-10
                              rounded-xl
                              bg-indigo-100 dark:bg-indigo-500/10
                              text-indigo-600 dark:text-indigo-400
                              flex
                              items-center
                              justify-center
                              font-bold
                              text-sm
                              shrink-0
                            "
                          >
                            {user?.name
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </div>

                          {/* USER INFO */}

                          <div className="flex-1 min-w-0">

                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                              {user?.name}
                            </p>

                            <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                              {user?.email}
                            </p>

                          </div>

                          {/* CHECK */}

                          {alreadyMember ? (

                            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                              Already Added
                            </span>

                          ) : (

                            <div
                              className={`
                                w-6 h-6
                                rounded-lg
                                border
                                flex
                                items-center
                                justify-center

                                ${
                                  isSelected
                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                    : "border-slate-300 dark:border-slate-600"
                                }
                              `}
                            >
                              {isSelected && (
                                <Check size={15} />
                              )}
                            </div>

                          )}

                        </button>

                      );

                    })

                  ) : (

                    <div className="py-8 text-center">

                      <Users
                        size={30}
                        className="mx-auto text-slate-300 dark:text-slate-600 mb-2"
                      />

                      <p className="text-sm text-slate-400 dark:text-slate-500">
                        No users found.
                      </p>

                    </div>

                  )}

                </div>

                {/* VALIDATION */}

                {formik.touched.teamMembers &&
                  formik.errors.teamMembers && (

                    <p className="text-red-500 dark:text-red-400 text-xs mt-3">
                      {formik.errors.teamMembers}
                    </p>

                  )}

                {/* API ERROR */}

                {addTeamMembersError && (

                  <p className="text-red-500 dark:text-red-400 text-sm mt-3">
                    {addTeamMembersError}
                  </p>

                )}

              </div>

              {/* FOOTER */}

              <div
                className="
                  px-6
                  py-4
                  border-t
                  border-slate-200 dark:border-slate-700
                  bg-slate-50 dark:bg-slate-800/60
                  flex
                  justify-end
                  gap-3
                "
              >

                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={addTeamMembersLoading}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    border
                    border-slate-200 dark:border-slate-700
                    bg-white dark:bg-slate-900
                    text-slate-700 dark:text-slate-300
                    text-sm
                    font-semibold
                    hover:bg-slate-100 dark:hover:bg-slate-800
                    transition
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    addTeamMembersLoading ||
                    formik.values.teamMembers.length === 0
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-5
                    py-2.5
                    rounded-xl
                    bg-indigo-600
                    hover:bg-indigo-700
                    disabled:bg-slate-300 dark:disabled:bg-slate-700
                    text-white
                    text-sm
                    font-semibold
                    transition
                  "
                >

                  <UserPlus size={17} />

                  {addTeamMembersLoading
                    ? "Adding..."
                    : "Add Members"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </>
  );
};

export default TeamMembersTask;