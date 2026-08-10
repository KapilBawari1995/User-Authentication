import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../../components/ChangePasswordModal";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);



  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">

        <h1 className="text-2xl font-bold text-indigo-600">
          My App
        </h1>


        <div className="relative">

          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
          >
            {user?.name || "User"}

            {/* <ChevronDown size={18}/> */}
          </button>


          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-xl bg-white shadow-lg border">


              <button
                onClick={() => {
                  setIsChangePasswordOpen(true);
                  setDropdownOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
              >
                <Lock size={17}/>
                Change Password
              </button>


             

            </div>
          )}

        </div>

      </nav>



      {/* Welcome Card */}
      <div className="flex justify-center px-5">

        <div className="mt-16 w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">


          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-5xl">
            🎉
          </div>



          <h2 className="mt-6 text-3xl font-bold text-slate-800">

            Welcome,

            <span className="ml-2 text-indigo-600">
              {user?.name || "User"}
            </span>

            👋

          </h2>



          <p className="mt-4 text-slate-500">
            Your account has been created successfully.
          </p>


          <p className="mt-2 text-sm text-slate-500">
            Admin will assign role and permissions soon.
          </p>



          <div className="mt-6 rounded-lg bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
            {user?.email || "user@example.com"}
          </div>



          <div className="mt-6 inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
            Account Active ✅
          </div>



          {/* <button
            onClick={handleLogout}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            <LogOut size={18}/>
            Logout
          </button> */}


        </div>

      </div>



      {isChangePasswordOpen && (
        <ChangePasswordModal
          onClose={() => setIsChangePasswordOpen(false)}
        />
      )}

    </div>
  );
};

export default Welcome;