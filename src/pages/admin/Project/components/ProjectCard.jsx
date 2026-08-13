import React, { useEffect, useState } from "react";

import {
  Edit,
  Trash2,
  Eye,
  CalendarDays,
  Users,
  FolderKanban,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteProjectRequest,
} from "../../../../features/project/projectSlice";

import DeleteConfirmModal from "../DeleteConfirmModal";

import {
  getStatusStyle,
  getPriorityStyle,
  formatDate,
} from "../utils/projectHelpers";

const ProjectCard = ({
  project,
  canView,
  canEdit,
  canDelete,
  onView,
  onEdit,
}) => {
  const dispatch = useDispatch();

  // =====================================================
  // DELETE MODAL
  // =====================================================

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  // =====================================================
  // PROJECT REDUX
  // =====================================================

  const {
    deleteProjectLoading,
    deleteProjectSuccess,
  } = useSelector(
    (state) => state.project
  );

  // =====================================================
  // PROJECT DATA
  // =====================================================

  const managerName =
    project?.projectManager?.name ||
    "Not Assigned";

  const managerEmail =
    project?.projectManager?.email || "";

  const progress = Math.min(
    Math.max(
      Number(project?.progress || 0),
      0
    ),
    100
  );

  // =====================================================
  // DELETE CLICK
  // =====================================================

  const handleDeleteClick = () => {
    if (!canDelete) return;

    setIsDeleteModalOpen(true);
  };

  // =====================================================
  // CLOSE DELETE MODAL
  // =====================================================

  const handleCloseDeleteModal = () => {
    if (deleteProjectLoading) return;

    setIsDeleteModalOpen(false);
  };

  // =====================================================
  // CONFIRM DELETE
  // =====================================================

  const handleConfirmDelete = () => {
    if (!canDelete) return;

    if (!project?._id) return;

    dispatch(
      deleteProjectRequest(
        project._id
      )
    );
  };

  // =====================================================
  // DELETE SUCCESS
  // =====================================================

  useEffect(() => {
    if (!deleteProjectSuccess) return;

    setIsDeleteModalOpen(false);
  }, [deleteProjectSuccess]);

  // =====================================================
  // VIEW
  // =====================================================

  const handleView = () => {
    if (!canView) return;

    if (!project?._id) return;

    onView(project._id);
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = () => {
    if (!canEdit) return;

    if (!project?._id) return;

    onEdit(project._id);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =====================================================
          PROJECT CARD
      ===================================================== */}

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

          hover:shadow-md
          dark:hover:shadow-black/20

          transition-all
          duration-200
        "
      >

        {/* =====================================================
            TOP SECTION
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-start
            lg:justify-between

            gap-4
          "
        >

          {/* =====================================================
              PROJECT INFORMATION
          ===================================================== */}

          <div className="flex gap-4 min-w-0">

            {/* ICON */}

            <div
              className="
                w-12
                h-12

                rounded-xl

                bg-indigo-50
                dark:bg-indigo-500/10

                text-indigo-600
                dark:text-indigo-400

                flex
                items-center
                justify-center

                shrink-0
              "
            >
              <FolderKanban size={22} />
            </div>

            {/* TEXT */}

            <div className="min-w-0">

              <h2
                className="
                  text-lg
                  font-bold

                  text-slate-800
                  dark:text-white

                  truncate
                "
              >
                {project?.name ||
                  "Untitled Project"}
              </h2>

              <p
                className="
                  text-sm

                  text-slate-500
                  dark:text-slate-400

                  mt-1

                  max-w-2xl

                  line-clamp-2
                "
              >
                {project?.description ||
                  "No description available."}
              </p>

            </div>

          </div>

          {/* =====================================================
              ACTIONS
          ===================================================== */}

          <div
            className="
              flex
              items-center
              gap-2

              shrink-0
            "
          >

            {/* =====================================================
                VIEW
            ===================================================== */}

            {canView && (
              <button
                type="button"
                onClick={handleView}
                className="
                  w-9
                  h-9

                  rounded-lg

                  border
                  border-slate-200
                  dark:border-slate-700

                  bg-white
                  dark:bg-slate-900

                  flex
                  items-center
                  justify-center

                  text-slate-500
                  dark:text-slate-400

                  hover:bg-slate-50
                  dark:hover:bg-slate-800

                  hover:text-indigo-600
                  dark:hover:text-indigo-400

                  transition
                "
                title="View Project"
              >
                <Eye size={17} />
              </button>
            )}

            {/* =====================================================
                EDIT
            ===================================================== */}

            {canEdit && (
              <button
                type="button"
                onClick={handleEdit}
                className="
                  w-9
                  h-9

                  rounded-lg

                  border
                  border-slate-200
                  dark:border-slate-700

                  bg-white
                  dark:bg-slate-900

                  flex
                  items-center
                  justify-center

                  text-slate-500
                  dark:text-slate-400

                  hover:bg-slate-50
                  dark:hover:bg-slate-800

                  hover:text-indigo-600
                  dark:hover:text-indigo-400

                  transition
                "
                title="Edit Project"
              >
                <Edit size={17} />
              </button>
            )}

            {/* =====================================================
                DELETE
            ===================================================== */}

            {canDelete && (
              <button
                type="button"
                onClick={handleDeleteClick}
                disabled={deleteProjectLoading}
                className="
                  w-9
                  h-9

                  rounded-lg

                  border
                  border-red-100
                  dark:border-red-900/40

                  bg-white
                  dark:bg-slate-900

                  flex
                  items-center
                  justify-center

                  text-red-500
                  dark:text-red-400

                  hover:bg-red-50
                  dark:hover:bg-red-950/30

                  transition

                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
                title="Delete Project"
              >
                <Trash2 size={17} />
              </button>
            )}

          </div>
        </div>

        {/* =====================================================
            PROJECT DETAILS
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3

            gap-4

            mt-6
            pt-5

            border-t
            border-slate-100
            dark:border-slate-800
          "
        >

          {/* =====================================================
              MANAGER
          ===================================================== */}

          <div className="flex items-start gap-3">

            <div
              className="
                w-9
                h-9

                rounded-lg

                bg-slate-100
                dark:bg-slate-800

                flex
                items-center
                justify-center

                shrink-0
              "
            >
              <Users
                size={17}
                className="
                  text-slate-500
                  dark:text-slate-400
                "
              />
            </div>

            <div className="min-w-0">

              <p
                className="
                  text-xs

                  text-slate-400
                  dark:text-slate-500
                "
              >
                Manager
              </p>

              <p
                className="
                  text-sm
                  font-semibold

                  text-slate-700
                  dark:text-slate-200

                  mt-0.5

                  truncate
                "
              >
                {managerName}
              </p>

              {managerEmail && (
                <p
                  className="
                    text-xs

                    text-slate-400
                    dark:text-slate-500

                    mt-0.5

                    truncate
                  "
                >
                  {managerEmail}
                </p>
              )}

            </div>

          </div>

          {/* =====================================================
              TIMELINE
          ===================================================== */}

          <div className="flex items-start gap-3">

            <div
              className="
                w-9
                h-9

                rounded-lg

                bg-slate-100
                dark:bg-slate-800

                flex
                items-center
                justify-center

                shrink-0
              "
            >
              <CalendarDays
                size={17}
                className="
                  text-slate-500
                  dark:text-slate-400
                "
              />
            </div>

            <div>

              <p
                className="
                  text-xs

                  text-slate-400
                  dark:text-slate-500
                "
              >
                Timeline
              </p>

              <p
                className="
                  text-sm
                  font-semibold

                  text-slate-700
                  dark:text-slate-200

                  mt-0.5
                "
              >
                {formatDate(
                  project?.startDate
                )}

                {" → "}

                {formatDate(
                  project?.endDate
                )}
              </p>

            </div>

          </div>

          {/* =====================================================
              PRIORITY
          ===================================================== */}

          <div>

            <p
              className="
                text-xs
                text-slate-400
                dark:text-slate-500

                mb-1
              "
            >
              Priority
            </p>

            <p
              className={`
                text-sm
                font-bold

                ${getPriorityStyle(
                  project?.priority
                )}
              `}
            >
              {project?.priority ||
                "Medium"}
            </p>

          </div>

        </div>

        {/* =====================================================
            BOTTOM / PROGRESS
        ===================================================== */}

        <div
          className="
            mt-5
            pt-5

            border-t
            border-slate-100
            dark:border-slate-800
          "
        >

          {/* =====================================================
              STATUS + PROGRESS VALUE
          ===================================================== */}

          <div
            className="
              flex
              items-center
              justify-between

              mb-2
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              {/* STATUS */}

              <span
                className={`
                  inline-flex
                  items-center

                  px-3
                  py-1

                  rounded-full

                  text-xs
                  font-semibold

                  border

                  ${getStatusStyle(
                    project?.status
                  )}
                `}
              >
                {project?.status ||
                  "Planning"}
              </span>

              {/* LABEL */}

              <span
                className="
                  text-sm

                  text-slate-500
                  dark:text-slate-400
                "
              >
                Project Progress
              </span>

            </div>

            {/* VALUE */}

            <span
              className="
                text-sm
                font-bold

                text-slate-700
                dark:text-slate-200
              "
            >
              {progress}%
            </span>

          </div>

          {/* =====================================================
              PROGRESS BAR
          ===================================================== */}

          <div
            className="
              w-full
              h-2

              bg-slate-100
              dark:bg-slate-800

              rounded-full

              overflow-hidden
            "
          >
            <div
              className="
                h-full

                bg-indigo-600
                dark:bg-indigo-500

                rounded-full

                transition-all
                duration-500
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

        </div>

      </div>

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Project?"
        message={
          <>
            <span>
              Are you sure you want to
              delete this project?
            </span>

            <br />

            <span
              className="
                font-semibold

                text-slate-800
                dark:text-white
              "
            >
              "{project?.name}"
            </span>

            <br />

            <span
              className="
                text-xs
                text-red-500
                dark:text-red-400
              "
            >
              All tasks associated with
              this project will also be
              deleted.
            </span>
          </>
        }
        itemName={project?.name}
        loading={deleteProjectLoading}
      />
    </>
  );
};

export default ProjectCard;