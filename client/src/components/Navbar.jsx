import React from "react";
import { useNavigate } from "react-router";
import { UseAuth } from "../App";

export default function Navbar() {
  const navigate = useNavigate();
  const Auth = UseAuth();

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    await Auth.logout();
    window.location.reload();
  };
  return (
    <div className="sticky top-0 w-full p-[2rem] border-[] bg-[#18230F] shadow-xl">
      <div className="flex flex-row flex-nowrap justify-between">
        <p className="text-[#eeeeee]">Project Management System</p>
        <div className="flex flex-row flex-nowrap justify-between w-[10%]">
          <button
            className="bg-transparent border-none p-[1rem] hover:cursor-pointer hover:bg-green-800 rounded-lg"
            onClick={handleHome}
          >
            <p className="text-[#eeeeee]">Home</p>
          </button>
          <button
            className="bg-transparent border-none p-[1rem] hover:cursor-pointer hover:bg-green-800 rounded-lg"
            onClick={handleLogout}
          >
            <p className="text-[#eeeeee]">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}
