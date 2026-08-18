import React from "react";
import {
  X,
  ShieldCheck,
  Users,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

const ViewRoleModal = ({
  open,
  role,
  loading = false,
  onClose,
}) => {
  if (!open) return null;

  const permissions = Array.isArray(role?.permissions)
    ? role.permissions
    : [];

  return (
    <div
      className="
        fixed inset-0
        z-[100]
        flex items-center justify-center
        bg-black/50
        dark:bg-black/70
        p-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full max-w-3xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-700
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div
          className="
            sticky top-0 z-10
            flex items-center justify-between
            px-6 py-5
            border-b
            border-slate-200
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                w-11 h-11
                rounded-xl
                bg-indigo-50
                dark:bg-indigo-500/10
                text-indigo-600
                dark:text-indigo-400
                flex items-center justify-center
              "
            >
              <ShieldCheck size={22} />
            </div>

            <div>
              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-800
                  dark:text-white
                "
              >
                Role Details
              </h2>

              <p
                className="
                  text-xs
                  text-slate-400
                  mt-0.5
                "
              >
                View role information and permissions
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-9 h-9
              rounded-lg
              flex items-center justify-center
              text-slate-500
              dark:text-slate-400
              hover:bg-slate-100
              dark:hover:bg-slate-800
              hover:text-slate-800
              dark:hover:text-white
              transition
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          {loading ? (
            <div
              className="
                min-h-[300px]
                flex flex-col
                items-center justify-center
                gap-3
              "
            >
              <Loader2
                size={35}
                className="
                  animate-spin
                  text-indigo-600
                "
              />

              <p
                className="
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Loading role details...
              </p>
            </div>
          ) : !role ? (
            <div
              className="
                min-h-[250px]
                flex items-center justify-center
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Role details not found.
            </div>
          ) : (
            <>
              {/* ROLE INFO */}
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-5
                "
              >
                {/* NAME */}
                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      text-slate-400
                      mb-1
                    "
                  >
                    Role Name
                  </p>

                  <p
                    className="
                      text-base
                      font-semibold
                      text-slate-800
                      dark:text-white
                    "
                  >
                    {role?.name || "-"}
                  </p>
                </div>

                {/* TYPE */}
                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      text-slate-400
                      mb-1
                    "
                  >
                    Role Type
                  </p>

                  {role?.isSystem ? (
                    <span
                      className="
                        inline-flex
                        items-center
                        px-3 py-1
                        rounded-lg
                        bg-violet-50
                        dark:bg-violet-500/10
                        text-violet-600
                        dark:text-violet-400
                        text-xs
                        font-semibold
                      "
                    >
                      System Role
                    </span>
                  ) : (
                    <span
                      className="
                        inline-flex
                        items-center
                        px-3 py-1
                        rounded-lg
                        bg-emerald-50
                        dark:bg-emerald-500/10
                        text-emerald-600
                        dark:text-emerald-400
                        text-xs
                        font-semibold
                      "
                    >
                      Custom Role
                    </span>
                  )}
                </div>

                {/* SCOPE */}
                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      text-slate-400
                      mb-1
                    "
                  >
                    Scope
                  </p>

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-slate-800
                      dark:text-white
                      capitalize
                    "
                  >
                    {role?.scope || "-"}
                  </p>
                </div>

                {/* DEFAULT */}
                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      text-slate-400
                      mb-1
                    "
                  >
                    Default Role
                  </p>

                  <div className="flex items-center gap-2">
                    {role?.isDefault ? (
                      <>
                        <CheckCircle2
                          size={17}
                          className="text-emerald-500"
                        />

                        <span
                          className="
                            text-sm
                            font-semibold
                            text-emerald-600
                            dark:text-emerald-400
                          "
                        >
                          Yes
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle
                          size={17}
                          className="text-slate-400"
                        />

                        <span
                          className="
                            text-sm
                            font-semibold
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          No
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div
                  className="
                    sm:col-span-2
                    rounded-xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    p-4
                  "
                >
                  <p
                    className="
                      text-xs
                      text-slate-400
                      mb-2
                    "
                  >
                    Description
                  </p>

                  <p
                    className="
                      text-sm
                      leading-6
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    {role?.description ||
                      "No description available."}
                  </p>
                </div>
              </div>

              {/* PERMISSIONS */}
              <div className="mt-6">
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={19}
                      className="text-indigo-600"
                    />

                    <h3
                      className="
                        text-base
                        font-bold
                        text-slate-800
                        dark:text-white
                      "
                    >
                      Permissions
                    </h3>
                  </div>

                  <span
                    className="
                      px-3 py-1
                      rounded-lg
                      bg-slate-100
                      dark:bg-slate-800
                      text-xs
                      font-semibold
                      text-slate-600
                      dark:text-slate-300
                    "
                  >
                    {permissions.length} Permissions
                  </span>
                </div>

                {permissions.length === 0 ? (
                  <div
                    className="
                      rounded-xl
                      border
                      border-dashed
                      border-slate-300
                      dark:border-slate-700
                      p-6
                      text-center
                      text-sm
                      text-slate-400
                    "
                  >
                    No permissions assigned.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {permissions.map(
                      (permission, index) => {
                        const moduleName =
                          permission?.module ||
                          permission?.name ||
                          `Permission ${index + 1}`;

                        return (
                          <div
                            key={
                              permission?._id ||
                              index
                            }
                            className="
                              rounded-xl
                              border
                              border-slate-200
                              dark:border-slate-700
                              p-4
                            "
                          >
                            <div className="flex items-center justify-between mb-3">
                              <p
                                className="
                                  font-semibold
                                  text-sm
                                  text-slate-800
                                  dark:text-white
                                "
                              >
                                {moduleName}
                              </p>
                            </div>

                            <div
                              className="
                                grid
                                grid-cols-2
                                sm:grid-cols-4
                                gap-2
                              "
                            >
                              {[
                                [
                                  "View",
                                  permission?.view,
                                ],
                                [
                                  "Create",
                                  permission?.create,
                                ],
                                [
                                  "Edit",
                                  permission?.edit,
                                ],
                                [
                                  "Delete",
                                  permission?.delete,
                                ],
                              ].map(
                                ([label, value]) => (
                                  <div
                                    key={label}
                                    className={`
                                      flex
                                      items-center
                                      justify-between
                                      px-3 py-2
                                      rounded-lg
                                      ${
                                        value
                                          ? "bg-emerald-50 dark:bg-emerald-500/10"
                                          : "bg-slate-50 dark:bg-slate-800"
                                      }
                                    `}
                                  >
                                    <span
                                      className={`
                                        text-xs
                                        font-medium
                                        ${
                                          value
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : "text-slate-400"
                                        }
                                      `}
                                    >
                                      {label}
                                    </span>

                                    {value ? (
                                      <CheckCircle2
                                        size={15}
                                        className="text-emerald-500"
                                      />
                                    ) : (
                                      <XCircle
                                        size={15}
                                        className="text-slate-400"
                                      />
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <div
          className="
            px-6 py-4
            border-t
            border-slate-200
            dark:border-slate-700
            flex
            justify-end
            bg-slate-50/70
            dark:bg-slate-800/30
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              px-5 py-2.5
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              text-sm
              font-semibold
              transition
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRoleModal;