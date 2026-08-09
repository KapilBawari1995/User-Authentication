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
      className="fixed inset-0 z-[100]
      flex items-center justify-center
      p-4"
    >

      {/* ================= OVERLAY ================= */}

      <div
        onClick={onClose}
        className="absolute inset-0
        bg-slate-900/50
        backdrop-blur-sm"
      />


      {/* ================= MODAL ================= */}

      <div
        className="relative
        w-full max-w-2xl
        bg-white
        rounded-2xl
        shadow-2xl
        overflow-hidden
        max-h-[90vh]
        overflow-y-auto"
      >

        {/* ================= HEADER ================= */}

        <div
          className="px-6 py-5
          bg-gradient-to-r
          from-indigo-600
          to-violet-600
          text-white"
        >

          <div className="flex items-center gap-4">

            {/* Avatar */}

            <div
              className="w-14 h-14
              rounded-full
              bg-white/20
              border border-white/30
              flex items-center
              justify-center
              text-xl font-bold"
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


            {/* CLOSE */}

            <button
              onClick={onClose}
              className="w-9 h-9
              rounded-lg
              flex items-center
              justify-center
              hover:bg-white/10
              transition"
            >
              <X size={21} />
            </button>

          </div>

        </div>


        {/* ================= CONTENT ================= */}

        {loading ? (

          <div
            className="flex flex-col
            items-center
            justify-center
            py-16"
          >

            <div
              className="w-9 h-9
              border-4
              border-indigo-100
              border-t-indigo-600
              rounded-full
              animate-spin"
            />

            <p className="text-sm text-slate-500 mt-4">
              Loading user details...
            </p>

          </div>

        ) : user ? (

          <div className="p-6">

            {/* ================= USER INFO ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


              {/* NAME */}

              <div
                className="p-4
                rounded-xl
                border border-slate-200
                bg-slate-50"
              >

                <div className="flex items-center gap-3">

                  <div
                    className="w-10 h-10
                    rounded-xl
                    bg-indigo-100
                    text-indigo-600
                    flex items-center
                    justify-center"
                  >
                    <User size={19} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Full Name
                    </p>

                    <p className="font-semibold text-slate-800 mt-1">
                      {user.name || "-"}
                    </p>

                  </div>

                </div>

              </div>


              {/* EMAIL */}

              <div
                className="p-4
                rounded-xl
                border border-slate-200
                bg-slate-50"
              >

                <div className="flex items-center gap-3">

                  <div
                    className="w-10 h-10
                    rounded-xl
                    bg-blue-100
                    text-blue-600
                    flex items-center
                    justify-center"
                  >
                    <Mail size={19} />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-slate-400">
                      Email Address
                    </p>

                    <p
                      className="font-semibold
                      text-slate-800 mt-1
                      truncate"
                    >
                      {user.email || "-"}
                    </p>

                  </div>

                </div>

              </div>


              {/* ROLE */}

              <div
                className="p-4
                rounded-xl
                border border-slate-200
                bg-slate-50"
              >

                <div className="flex items-center gap-3">

                  <div
                    className="w-10 h-10
                    rounded-xl
                    bg-violet-100
                    text-violet-600
                    flex items-center
                    justify-center"
                  >
                    <ShieldCheck size={19} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Role
                    </p>

                    <p className="font-semibold text-slate-800 mt-1">
                      {user.role?.name || "No Role"}
                    </p>

                  </div>

                </div>

              </div>


              {/* DEPARTMENT */}

              <div
                className="p-4
                rounded-xl
                border border-slate-200
                bg-slate-50"
              >

                <div className="flex items-center gap-3">

                  <div
                    className="w-10 h-10
                    rounded-xl
                    bg-amber-100
                    text-amber-600
                    flex items-center
                    justify-center"
                  >
                    <Building2 size={19} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Department
                    </p>

                    <p className="font-semibold text-slate-800 mt-1">
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
                className="text-sm font-bold
                text-slate-700 mb-3"
              >
                Account Status
              </h3>


              <div
                className="grid
                grid-cols-1 sm:grid-cols-3
                gap-3"
              >

                {/* ACTIVE */}

                <div
                  className={`p-4 rounded-xl border
                  ${
                    user.isActive
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >

                  <div className="flex items-center gap-2">

                    {user.isActive ? (

                      <CheckCircle2
                        size={18}
                        className="text-emerald-600"
                      />

                    ) : (

                      <XCircle
                        size={18}
                        className="text-red-600"
                      />

                    )}

                    <span
                      className={`text-sm font-semibold
                      ${
                        user.isActive
                          ? "text-emerald-700"
                          : "text-red-700"
                      }`}
                    >
                      {user.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </div>

                </div>


                {/* VERIFIED */}

                <div
                  className={`p-4 rounded-xl border
                  ${
                    user.isVerified
                      ? "bg-blue-50 border-blue-200"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >

                  <div className="flex items-center gap-2">

                    {user.isVerified ? (

                      <CheckCircle2
                        size={18}
                        className="text-blue-600"
                      />

                    ) : (

                      <XCircle
                        size={18}
                        className="text-slate-400"
                      />

                    )}

                    <span
                      className={`text-sm font-semibold
                      ${
                        user.isVerified
                          ? "text-blue-700"
                          : "text-slate-500"
                      }`}
                    >
                      {user.isVerified
                        ? "Verified"
                        : "Not Verified"}
                    </span>

                  </div>

                </div>


                {/* PASSWORD */}

                <div
                  className={`p-4 rounded-xl border
                  ${
                    user.mustChangePassword
                      ? "bg-orange-50 border-orange-200"
                      : "bg-emerald-50 border-emerald-200"
                  }`}
                >

                  <div className="flex items-center gap-2">

                    <LockKeyhole
                      size={18}
                      className={
                        user.mustChangePassword
                          ? "text-orange-600"
                          : "text-emerald-600"
                      }
                    />

                    <span
                      className={`text-sm font-semibold
                      ${
                        user.mustChangePassword
                          ? "text-orange-700"
                          : "text-emerald-700"
                      }`}
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
                className="mt-5
                p-4 rounded-xl
                bg-purple-50
                border border-purple-200"
              >

                <div className="flex items-center gap-2">

                  <ShieldCheck
                    size={19}
                    className="text-purple-600"
                  />

                  <p className="text-sm font-semibold text-purple-700">
                    Super Administrator
                  </p>

                </div>

              </div>

            )}


            {/* ================= FOOTER ================= */}

            <div
              className="flex justify-end
              mt-7 pt-5
              border-t border-slate-100"
            >

              <button
                onClick={onClose}
                className="px-6 py-2.5
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                text-sm font-semibold
                transition"
              >
                Close
              </button>

            </div>

          </div>

        ) : (

          <div className="p-10 text-center">

            <p className="text-slate-500">
              User details not available.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default ViewUserModal;