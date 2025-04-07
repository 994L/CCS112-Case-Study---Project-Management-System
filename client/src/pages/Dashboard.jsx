import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UseAuth, UseProject } from "../App";
import Navbar from "../components/Navbar";
import Projectlist from "./Projectlist";

export default function Dashboard() {
  useEffect(() => {
    console.log(sessionStorage.getItem("token"));

    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  const navigate = useNavigate();
  const Auth = UseAuth();
  const Project = UseProject();
  const { loading, getAllProjects, insertProject } = Project;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [insertSuccess, setInsertSuccess] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLogout = async () => {
    await Auth.logout();
  };

  const handleSelectProject = (id) => {
    navigate(`/projects/${id}`);
  };

  const initialize = async () => {
    const temp = await getAllProjects();
    if (!loading) {
      setProjects(temp.data);
      console.log(projects, temp);
    }
  };

  const handleInsert = async (e) => {
    if (title.length === 0 || description.length === 0) {
      alert("Inavlid value for fields");
      return;
    }
    e.preventDefault();
    const insert = await insertProject(title, description);
    if (!loading) {
      if (insert.success) {
        setShowResponse(true);
        setInsertSuccess(true);
        window.location.reload();
      } else {
        setShowResponse(false);
        setInsertSuccess(false);
        window.location.reload();
      }
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col flex-nowrap gap-[2rem]">
        <Navbar />
        <div className="h-[80vh] w-full flex flex-row flex-nowrap px-[1rem] gap-[3rem]">
          <form
            className="h-full w-[30%] bg-[#1F7D53] rounded-lg p-[1rem] flex flex-col flex-nowrap justify-around"
            onSubmit={handleInsert}
          >
            <p className="font-['Poppins'] font-bold text-[2rem] text-[#eeeeee]">
              Add Project
            </p>
            <div className="flex flex-col flex-nowrap bg-white/20 backdrop-blur-lg h-[50%] px-[1rem] justify-around rounded-lg">
              <div className="flex flex-col flex-nowrap">
                <label
                  htmlFor="title"
                  className="font-['Inter'] text-bold text-[#eeeeee]"
                >
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  className="bg-[#255F38] p-[1rem] rounded-md text-[1.5rem]"
                />
              </div>
              <div className="flex flex-col flex-nowrap">
                <label
                  htmlFor="description"
                  className="font-['Inter'] text-bold text-[#eeeeee]"
                >
                  Project Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className="bg-[#255F38] p-[1rem] rounded-md text-[1.5rem]"
                />
              </div>
            </div>
            <button className="p-[1rem] bg-white/30 rounded-lg hover:bg-green-800 hover:cursor-pointer">
              Submit
            </button>

            {showResponse && (
              <>
                {insertSuccess ? (
                  <p className="font-['Poppins'] font-bold text-green-400">
                    Project {title} inserted successfully
                  </p>
                ) : (
                  <p className="font-['Poppins'] font-bold text-red-400">
                    Something went wrong
                  </p>
                )}
              </>
            )}

            {}
          </form>
          <div className="grow-1 bg-[#27391C] p-[1rem] flex flex-col flex-nowrap gap-[1rem] overflow-auto rounded-lg scroll-smooth">
            <p className="font-['Poppins'] font-bold text-[2rem] text-[#eeeeee]">
              Project List
            </p>
            {!loading ? (
              projects.map((project) => {
                return <Projectlist project={project} />;
              })
            ) : (
              <p className="text-center">
                Wait for a moment. Data is being fetched
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
