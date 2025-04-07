import React from "react";
import { UseProject } from "../App";

export default function Tasklist({ task }) {
  const ProjectContext = UseProject();
  const { updateTaskStatus, loading } = ProjectContext;
  const handleUpdateStatus = async () => {
    const confirm = window.confirm(
      `Are you sure to update the status of task ${task.title}?`
    );
    if (confirm) {
      const update = await updateTaskStatus(task.id);
      if (!loading) {
        if (update.success) {
          alert(`Task ${task.title} is updated`);
          window.location.reload();
        } else {
          alert("Update failed");
          window.location.reload();
        }
      }
    }
  };
  const date = new Date(task.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <button
      className="w-full text-start p-[1rem] bg-[#1F7D53] rounded-lg flex flex-row flex-nowrap justify-between hover:bg-[#255F38]"
      onClick={handleUpdateStatus}
    >
      <div>
        <p className="font-bold text-[1.5rem]">{task.title}</p>
      </div>
      <div className="flex flex-col flex-nowrap items-end justify-between">
        {task.status === "On going" ? (
          <div className="rounded-[50%] w-[1rem] h-[1rem] bg-amber-400" />
        ) : (
          <div className="rounded-[50%] w-[1rem] h-[1rem] bg-green-300" />
        )}

        <p className="">{date}</p>
      </div>
    </button>
  );
}
