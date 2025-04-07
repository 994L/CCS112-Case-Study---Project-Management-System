import React from "react";
import { useNavigate } from "react-router";

export default function Projectlist({ project }) {
  console.log(project);

  const navigate = useNavigate();
  const handleSelectProject = (id) => {
    navigate(`/projects/${id}`);
  };
  const date = new Date(project.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <button
      className="w-full text-start p-[1rem] bg-[#1F7D53] rounded-lg flex flex-row flex-nowrap justify-between hover:cursor-pointer hover:bg-[#255F38]"
      onClick={() => {
        handleSelectProject(project.id);
      }}
    >
      <div>
        <p className="font-bold text-[1.5rem]">{project.title}</p>
        <p className="">{project.description}</p>
      </div>
      <div className="flex flex-col flex-nowrap items-end justify-between">
        {project.status === "On going" ? (
          <div className="rounded-[50%] w-[1rem] h-[1rem] bg-amber-400" />
        ) : (
          <div className="rounded-[50%] w-[1rem] h-[1rem] bg-green-300" />
        )}

        <p className="">{date}</p>
      </div>
    </button>
  );
}
