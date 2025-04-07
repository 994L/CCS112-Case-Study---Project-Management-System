import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UseAuth } from "../App";

export default function Login() {
  const navigate = useNavigate();
  const { login } = UseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const attemptLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (sessionStorage.getItem("token")) {
      navigate("/");
    } else {
      setIsSuccessful(false);
    }
  };
  return (
    <div className="min-h-screen w-full flex flex-col flex-nowrap justify-center items-center content-center bg-[url(https://www.orielstat.com/blog/wp-content/uploads/2019/04/business-people-working-on-a-plan_Resized-1104W736H.jpg)] bg-cover grayscale-50">
      <form
        className="flex flex-col flex-nowrap gap-[1rem] w-[30%] bg-white/30 p-[1rem] rounded-[1rem] backdrop-blur-lg"
        onSubmit={attemptLogin}
      >
        <p className='font-["Poppins"] text-[#030303] text-center text-[1.5rem] font-bold'>
          Project Management System
        </p>
        {!isSuccessful && (
          <p className='font-["Poppins"] text-red-800 text-center text-[1.5rem] font-bold'>
            Invalid Credentials
          </p>
        )}
        <label
          htmlFor="email"
          className="font-['Inter'] text-[#123458] font-bold"
        >
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="bg-neutral-50 p-[1rem] rounded-[1rem]"
          value={email}
          onChange={handleEmailChange}
        />
        <label
          htmlFor="password"
          className="font-['Inter'] text-[#123458] font-bold"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="bg-neutral-50 p-[1rem] rounded-[1rem]"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          type="submit"
          className="bg-[#030303] p-[1rem] text-[#F1EFEC] rounded-[.5rem] hover:bg-[#F1EFEC] hover:text-[#030303] cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
