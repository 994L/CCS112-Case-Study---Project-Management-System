import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router";
import { UseProject } from "../App";
import Tasklist from "./Tasklist";

export default function ProjectDetails() {
  useEffect(() => {
    getProjectDetails();
    getTasksOfProject();
  }, []);

  const { id } = useParams();
  const ProjectContext = UseProject();
  const {
    getSingleProject,
    getProjectTasks,
    updateStatus,
    updateProject,
    deleteProject,
    addTask,
    loading,
  } = ProjectContext;
  const [project, setProject] = useState({});
  const [created, setCreated] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const navigate = useNavigate();

  const getProjectDetails = async () => {
    const temp = await getSingleProject(id);
    if (!loading && temp.success) {
      setProject(temp.data);
      setTitle(temp.data.title);
      setDescription(temp.data.description);
      const date = new Date(temp.data.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setCreated(date);
    }
  };

  const getTasksOfProject = async () => {
    const temp = await getProjectTasks(id);
    if (!loading && temp.success) {
      setTasks(temp.data);
    }
  };

  const handleDeleteProject = async () => {
    const confirm = window.confirm("Are you sure to delete this project?");
    if (confirm) {
      const pdelete = await deleteProject(id);
      if (!loading) {
        if (pdelete.success) {
          alert(`Project ${project.title} is deleted`);
          navigate("/");
        } else {
          alert("Delete failed");
          navigate("/");
        }
      }
    }
  };

  const handleUpdateStatus = async () => {
    const confirm = window.confirm(
      "Are you sure to update the status of this project?"
    );
    if (confirm) {
      const update = await updateStatus(id);
      if (!loading) {
        if (update.success) {
          alert(`Project ${project.title} is updated`);
          window.location.reload();
        } else {
          alert("Update failed");
          window.location.reload();
        }
      }
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    if (title.length === 0 || description.length === 0) {
      alert("Inavlid value for fields");
      return;
    }
    const confirm = window.confirm("Are you sure to update this project?");
    if (confirm) {
      const update = await updateProject(id, title, description);
      if (!loading) {
        if (update.success) {
          alert(`Project ${project.title} is updated`);
          window.location.reload();
        } else {
          alert("Update failed");
          window.location.reload();
        }
      }
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (taskTitle.length === 0) {
      alert("Inavlid value for title");
      return;
    }
    const confirm = window.confirm(`Are you sure to add task ${taskTitle}?`);
    if (confirm) {
      const add = await addTask(taskTitle, id);
      if (!loading) {
        if (add.success) {
          alert(`Task ${taskTitle} is added`);
          window.location.reload();
        } else {
          alert("Add failed");
          window.location.reload();
        }
      }
    }
  };
  return (
    <div className="min-h-screen w-full flex flex-col flex-nowrap gap-[2rem]">
      <Navbar></Navbar>
      <div className="flex flex-row flex-nowrap h-[75vh] w-full gap-[1rem] px-[1rem]">
        <div className="h-full w-[30%] bg-[#1F7D53] rounded-lg p-[1rem] gap-[.5rem] flex flex-col flex-nowrap justify-around">
          <p className="font-['Poppins'] font-bold text-[2rem] text-white">
            Project {project.id}
          </p>
          <div className="p-[.5rem] bg-[#255F38] rounded-lg flex flex-col gap-[1rem]">
            {isEditing ? (
              <form
                className="flex flex-col gap-[.5rem]"
                onSubmit={handleUpdateProject}
              >
                <label
                  htmlFor="title"
                  className="font-['Poppins'] font-bold text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-neutral-50 p-[1rem] rounded-[1rem]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <label
                  htmlFor="description"
                  className="font-['Poppins'] font-bold text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="bg-neutral-50 p-[1rem] rounded-[1rem]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex flex-row flex-nowrap justify-end gap-[.5rem]">
                  <button
                    type="submit"
                    className="p-[.5rem] hover:bg-[#255F38] rounded-lg bg-[#5ca875] hover:cursor-pointer w-fit"
                  >
                    Update
                  </button>

                  <button
                    className="p-[.5rem] hover:bg-red-600 rounded-lg bg-red-400 hover:cursor-pointer w-fit"
                    onClick={() => {
                      setTitle(project.title);
                      setDescription(project.description);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <DisplayProjectDetails type={"title"} info={project.title} />
                <DisplayProjectDetails
                  type={"Description"}
                  info={project.description}
                />
                <DisplayProjectDetails type={"Status"} info={project.status} />
                <DisplayProjectDetails type={"Date Started"} info={created} />
              </>
            )}
          </div>
          {!isEditing && (
            <div className="flex flex-row gap-[.5rem] justify-end">
              {OperationButtons(
                "fa-trash",
                "text-red-500",
                "hover:bg-red-700",
                handleDeleteProject
              )}
              {OperationButtons(
                "fa-pen",
                "text-orange-300",
                "hover:bg-orange-500",
                () => setIsEditing(true)
              )}
              {project.status === "On going" &&
                OperationButtons(
                  "fa-check",
                  "text-green-500",
                  "hover:bg-green-700",
                  handleUpdateStatus
                )}
            </div>
          )}
          <form className="flex flex-col gap-[.5rem]" onSubmit={handleAddTask}>
            <label
              htmlFor="task"
              className="font-['Poppins'] font-bold text-white"
            >
              Add Task
            </label>
            <input
              type="text"
              name="task"
              id="task"
              className="bg-neutral-50 p-[.5rem] rounded-[1rem]"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <button
              type="submit"
              className="p-[.5rem] hover:bg-[#5ca875] rounded-lg bg-[#255F38] hover:cursor-pointer"
            >
              Add Task
            </button>
          </form>
        </div>
        <div className="grow-1 bg-[#27391C] p-[1rem] flex flex-col flex-nowrap gap-[1rem] overflow-auto rounded-lg scroll-smooth">
          <p className="font-['Poppins'] font-bold text-[2rem] text-[#eeeeee]">
            Task List
          </p>
          {loading ? (
            <p>Please wait for data to be fetched</p>
          ) : tasks.length == 0 ? (
            <p className="font-['Poppins'] font-bold text-white">
              No tasks yet
            </p>
          ) : (
            tasks.map((task) => {
              return <Tasklist task={task} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

function DisplayProjectDetails({ type, info }) {
  return (
    <div>
      <p className="font-['Inter'] text-[.75rem] text-white text-start">
        {type}
      </p>
      <p className="font-['Poppins'] text-[1.25rem] text-white text-bold">
        {info}
      </p>
    </div>
  );
}
function OperationButtons(fa, color, hover_color, method) {
  const i_className = `fa-solid ${fa} text-[1.5rem]`;
  const b_className = `bg-[#dddddd] text-[1.5rem]  ${color} p-[.5rem] ${hover_color} hover:cursor-pointer rounded-lg`;
  return (
    <button className={b_className} onClick={method}>
      <i className={i_className} />
    </button>
  );
}
