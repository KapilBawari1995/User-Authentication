import React from "react";
import {
  X,
  User,
  Mail,
  ShieldCheck,
  Building2,
  CheckCircle2,
  XCircle,
  LockKeyhole,
} from "lucide-react";

const ViewUserModal = ({
  open,
  user,
  onClose,
  loading = false,
}) => {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        p-4
      "
    >

      {/* ================= OVERLAY ================= */}

      <div
        onClick={onClose}
        className="
          absolute inset-0
          bg-slate-900/50
          dark:bg-black/60
          backdrop-blur-sm
        "
      />

      {/* ================= MODAL ================= */}

      <div
        className="
          relative
          w-full max-w-2xl
          bg-white dark:bg-slate-900
          rounded-2xl
          shadow-2xl
          overflow-hidden
          max-h-[90vh]
          overflow-y-auto
          border border-slate-200 dark:border-slate-700
        "
      >

        {/* ================= HEADER ================= */}

        <div
          className="
            px-6 py-5
            bg-gradient-to-r
            from-indigo-600
            to-violet-600
            text-white
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                w-14 h-14
                rounded-full
                bg-white/20
                border border-white/30
                flex items-center
                justify-center
                text-xl font-bold
              "
            >
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </div>

            <div className="flex-1">

              <h2 className="text-xl font-bold">
                User Details
              </h2>

              <p className="text-indigo-100 text-sm mt-1">
                View account information
              </p>

            </div>

            <button
              onClick={onClose}
              className="
                w-9 h-9
                rounded-lg
                flex items-center
                justify-center
                hover:bg-white/10
                transition
              "
            >
              <X size={21} />
            </button>

          </div>

        </div>

        {/* ================= CONTENT ================= */}

        {loading ? (

          <div
            className="
              flex flex-col
              items-center
              justify-center
              py-16
            "
          >

            <div
              className="
                w-9 h-9
                border-4
                border-indigo-100 dark:border-indigo-500/20
                border-t-indigo-600 dark:border-t-indigo-400
                rounded-full
                animate-spin
              "
            />

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              Loading user details...
            </p>

          </div>

        ) : user ? (

          <div className="p-6">

            {/* ================= USER INFO ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* NAME */}

              <div
                className="
                  p-4
                  rounded-xl
                  border border-slate-200 dark:border-slate-700
                  bg-slate-50 dark:bg-slate-800/60
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10 h-10
                      rounded-xl
                      bg-indigo-100 dark:bg-indigo-500/10
                      text-indigo-600 dark:text-indigo-400
                      flex items-center
                      justify-center
                    "
                  >
                    <User size={19} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Full Name
                    </p>

                    <p className="font-semibold text-slate-800 dark:text-slate-100 mt-1">
                      {user.name || "-"}
                    </p>

                  </div>

                </div>

              </div>

              {/* EMAIL */}

              <div
                className="
                  p-4
                  rounded-xl
                  border border-slate-200 dark:border-slate-700
                  bg-slate-50 dark:bg-slate-800/60
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10 h-10
                      rounded-xl
                      bg-blue-100 dark:bg-blue-500/10
                      text-blue-600 dark:text-blue-400
                      flex items-center
                      justify-center
                    "
                  >
                    <Mail size={19} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Email Address
                    </p>

                    <p
                      className="
                        font-semibold
                        text-slate-800 dark:text-slate-100
                        mt-1
                        truncate
                      "
                    >
                      {user.email || "-"}
                    </p>

                  </div>

                </div>

              </div>

              {/* ROLE */}

              <div
                className="
                  p-4
                  rounded-xl
                  border border-slate-200 dark:border-slate-700
                  bg-slate-50 dark:bg-slate-800/60
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10 h-10
                      rounded-xl
                      bg-violet-100 dark:bg-violet-500/10
                      text-violet-600 dark:text-violet-400
                      flex items-center
                      justify-center
                    "
                  >
                    <ShieldCheck size={19} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Role
                    </p>

                    <p className="font-semibold text-slate-800 dark:text-slate-100 mt-1">
                      {user.role?.name || "No Role"}
                    </p>

                  </div>

                </div>

              </div>

              {/* DEPARTMENT */}

              <div
                className="
                  p-4
                  rounded-xl
                  border border-slate-200 dark:border-slate-700
                  bg-slate-50 dark:bg-slate-800/60
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10 h-10
                      rounded-xl
                      bg-amber-100 dark:bg-amber-500/10
                      text-amber-600 dark:text-amber-400
                      flex items-center
                      justify-center
                    "
                  >
                    <Building2 size={19} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Department
                    </p>

                    <p className="font-semibold text-slate-800 dark:text-slate-100 mt-1">
                      {user.department?.name ||
                        user.department?.departmentName ||
                        "Not Assigned"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= ACCOUNT STATUS ================= */}

            <div className="mt-6">

              <h3
                className="
                  text-sm font-bold
                  text-slate-700 dark:text-slate-200
                  mb-3
                "
              >
                Account Status
              </h3>

              <div
                className="
                  grid
                  grid-cols-1 sm:grid-cols-3
                  gap-3
                "
              >

                {/* ACTIVE */}

                <div
                  className={`
                    p-4 rounded-xl border
                    ${
                      user.isActive
                        ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20"
                        : "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20"
                    }
                  `}
                >

                  <div className="flex items-center gap-2">

                    {user.isActive ? (

                      <CheckCircle2
                        size={18}
                        className="text-emerald-600 dark:text-emerald-400"
                      />

                    ) : (

                      <XCircle
                        size={18}
                        className="text-red-600 dark:text-red-400"
                      />

                    )}

                    <span
                      className={`
                        text-sm font-semibold
                        ${
                          user.isActive
                            ? "text-emerald-700 dark:text-emerald-400"
                            : "text-red-700 dark:text-red-400"
                        }
                      `}
                    >
                      {user.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </div>

                </div>

                {/* VERIFIED */}

                <div
                  className={`
                    p-4 rounded-xl border
                    ${
                      user.isVerified
                        ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    }
                  `}
                >

                  <div className="flex items-center gap-2">

                    {user.isVerified ? (

                      <CheckCircle2
                        size={18}
                        className="text-blue-600 dark:text-blue-400"
                      />

                    ) : (

                      <XCircle
                        size={18}
                        className="text-slate-400 dark:text-slate-500"
                      />

                    )}

                    <span
                      className={`
                        text-sm font-semibold
                        ${
                          user.isVerified
                            ? "text-blue-700 dark:text-blue-400"
                            : "text-slate-500 dark:text-slate-400"
                        }
                      `}
                    >
                      {user.isVerified
                        ? "Verified"
                        : "Not Verified"}
                    </span>

                  </div>

                </div>

                {/* PASSWORD */}

                <div
                  className={`
                    p-4 rounded-xl border
                    ${
                      user.mustChangePassword
                        ? "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20"
                        : "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20"
                    }
                  `}
                >

                  <div className="flex items-center gap-2">

                    <LockKeyhole
                      size={18}
                      className={
                        user.mustChangePassword
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }
                    />

                    <span
                      className={`
                        text-sm font-semibold
                        ${
                          user.mustChangePassword
                            ? "text-orange-700 dark:text-orange-400"
                            : "text-emerald-700 dark:text-emerald-400"
                        }
                      `}
                    >
                      {user.mustChangePassword
                        ? "Password Change Required"
                        : "Password Set"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= SUPER ADMIN ================= */}

            {user.isSuperAdmin && (

              <div
                className="
                  mt-5
                  p-4 rounded-xl
                  bg-purple-50 dark:bg-purple-500/10
                  border border-purple-200 dark:border-purple-500/20
                "
              >

                <div className="flex items-center gap-2">

                  <ShieldCheck
                    size={19}
                    className="text-purple-600 dark:text-purple-400"
                  />

                  <p className="text-sm font-semibold text-purple-700 dark:text-purple-400">
                    Super Administrator
                  </p>

                </div>

              </div>

            )}

            {/* ================= FOOTER ================= */}

            <div
              className="
                flex justify-end
                mt-7 pt-5
                border-t border-slate-100 dark:border-slate-800
              "
            >

              <button
                onClick={onClose}
                className="
                  px-6 py-2.5
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  text-sm font-semibold
                  transition
                "
              >
                Close
              </button>

            </div>

          </div>

        ) : (

          <div className="p-10 text-center">

            <p className="text-slate-500 dark:text-slate-400">
              User details not available.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default ViewUserModal;