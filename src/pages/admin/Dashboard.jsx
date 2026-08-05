import React from "react";
import {
   Users,
     UserCheck,
  UserX,
  ShieldX,

  ClipboardList,
  FolderKanban,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";


export default function Dashboard() {
const cards = [
  {
    title: "Total Employees",
    value: 120,
    icon: <Users size={28} />,
    color: "bg-blue-500",
  },
  {
    title: "Active Employees",
    value: 108,
    icon: <UserCheck size={28} />,
    color: "bg-green-500",
  },
  {
    title: "Inactive Employees",
    value: 8,
    icon: <UserX size={28} />,
    color: "bg-yellow-500",
  },
  {
    title: "Blocked Users",
    value: 4,
    icon: <ShieldX size={28} />,
    color: "bg-red-500",
  },
];
  return (
    <div className=" mt-[70px] min-h-screen bg-slate-100 p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Welcome to Task Management System
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">

        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-slate-500">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {item.value}
              </h2>
            </div>

            <div
              className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}
            >
              {item.icon}
            </div>
          </div>
        ))}

      </div>

      {/* ================= Statistics ================= */}

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

  {/* Task Status */}

  <div className="bg-white rounded-xl shadow-md p-6">

    <h2 className="text-lg font-bold mb-5">
      Task Status
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="bg-green-100 p-2 rounded-full">
            <CheckCircle2 className="text-green-600" size={20}/>
          </div>

          <span>Completed</span>

        </div>

        <span className="font-bold text-green-600">
          120
        </span>

      </div>

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="bg-yellow-100 p-2 rounded-full">
            <Clock3 className="text-yellow-600" size={20}/>
          </div>

          <span>Pending</span>

        </div>

        <span className="font-bold text-yellow-600">
          45
        </span>

      </div>

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="bg-red-100 p-2 rounded-full">
            <AlertCircle className="text-red-600" size={20}/>
          </div>

          <span>Overdue</span>

        </div>

        <span className="font-bold text-red-600">
          12
        </span>

      </div>

    </div>

  </div>



  {/* Project Progress */}

  <div className="bg-white rounded-xl shadow-md p-6">

    <h2 className="text-lg font-bold mb-5">
      Project Progress
    </h2>

    <div className="space-y-5">

      <div>

        <div className="flex justify-between mb-2">

          <span>Task Portal</span>

          <span>90%</span>

        </div>

        <div className="h-3 bg-gray-200 rounded-full">

          <div className="w-[90%] h-3 bg-blue-600 rounded-full"></div>

        </div>

      </div>


      <div>

        <div className="flex justify-between mb-2">

          <span>HRMS</span>

          <span>70%</span>

        </div>

        <div className="h-3 bg-gray-200 rounded-full">

          <div className="w-[70%] h-3 bg-green-500 rounded-full"></div>

        </div>

      </div>


      <div>

        <div className="flex justify-between mb-2">

          <span>CRM</span>

          <span>45%</span>

        </div>

        <div className="h-3 bg-gray-200 rounded-full">

          <div className="w-[45%] h-3 bg-orange-500 rounded-full"></div>

        </div>

      </div>

    </div>

  </div>



  {/* Performance */}

  <div className="bg-white rounded-xl shadow-md p-6">

    <h2 className="text-lg font-bold mb-5">
      Team Performance
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-2">

          <ArrowUpRight className="text-green-600"/>

          <span>Completed Today</span>

        </div>

        <span className="font-bold">
          28
        </span>

      </div>


      <div className="flex justify-between items-center">

        <div className="flex items-center gap-2">

          <FolderKanban className="text-blue-600"/>

          <span>Running Projects</span>

        </div>

        <span className="font-bold">
          15
        </span>

      </div>


      <div className="flex justify-between items-center">

        <div className="flex items-center gap-2">

          <ArrowDownRight className="text-red-600"/>

          <span>Delayed Tasks</span>

        </div>

        <span className="font-bold">
          6
        </span>

      </div>

    </div>

  </div>

</div>
    </div>
  );
}