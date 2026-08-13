export const getStatusStyle = (status) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "In Progress":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "Planning":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "On Hold":
      return "bg-slate-100 text-slate-600 border-slate-200";

    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

export const getPriorityStyle = (priority) => {
  switch (priority) {
    case "Critical":
      return "text-red-600";

    case "High":
      return "text-orange-600";

    case "Medium":
      return "text-yellow-600";

    case "Low":
      return "text-emerald-600";

    default:
      return "text-gray-600";
  }
};

export const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};