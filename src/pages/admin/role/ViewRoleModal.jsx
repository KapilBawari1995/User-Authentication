import React from "react";
import { X } from "lucide-react";

const ViewRoleModal  = ({ open, task, onClose }) => {
  if (!open || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6 border-b pb-3">
          Task Details
        </h2>

        <div className="grid grid-cols-2 gap-5">

          <div>
            <p className="text-sm text-gray-500">Title</p>
            <p className="font-semibold">{task.title}</p>
          </div> 
          
          <div>
            <p className="text-sm text-gray-500">Created By</p>
            <p className="font-semibold">{task.createdBy?.name}</p>
          </div>



          <div>
            <p className="text-sm text-gray-500">Assigned To</p>
            <p className="font-semibold">{task.assignedTo?.name}</p>
          </div> 
           <div>
            <p className="text-sm text-gray-500">Email To</p>
            <p className="font-semibold">{task.assignedTo?.email}</p>
          </div>



          <div>
            <p className="text-sm text-gray-500">Priority</p>
            <p className="font-semibold">{task.priority}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-semibold">{task.status}</p>
          </div>

          <div className="col-span-2">
            <p className="text-sm text-gray-500">Description</p>
            <p>{task.description}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Due Date</p>
            <p>{new Date(task.dueDate).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p>{new Date(task.createdAt).toLocaleDateString()}</p>
          </div>

        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewRoleModal;