import React from "react";

const ProjectSummary = ({ projects = [], totalCount = 0 }) => {
  const inProgress = projects.filter(
    (project) => project.status === "In Progress"
  ).length;

  const completed = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const onHold = projects.filter(
    (project) => project.status === "On Hold"
  ).length;

  const cards = [
    {
      title: "Total Projects",
      value: totalCount || projects.length,
      valueClass: "text-slate-800 dark:text-white",
    },
    {
      title: "In Progress",
      value: inProgress,
      valueClass: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Completed",
      value: completed,
      valueClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "On Hold",
      value: onHold,
      valueClass: "text-slate-600 dark:text-slate-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700
            rounded-2xl
            p-5
            shadow-sm dark:shadow-none
            transition-colors
          "
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {card.title}
          </p>

          <h3
            className={`text-2xl font-bold mt-2 ${card.valueClass}`}
          >
            {card.value}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ProjectSummary;