import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemesSwap from "./ThemesSwap";

import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthProvider";
import DefaultProfileImage from "./DefaultProfileImage";

import logo from "../assets/Logo.png";

const API_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const logoutUser = async () => {
    try {
      logout();

      navigate("/");

      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1 gap-12  ml-4 mr-4">
          <div onClick={() => navigate("/")} className="flex gap-3 align-middle justify-center  hover:cursor-pointer pr-4">
            <img className="w-8" src={logo} alt="Logo" />

            <p className="text-xl logo">SnapTask</p>
          </div>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <ThemesSwap />
          </div>
        </div>

        {user && (
          <div className="flex-none gap-1">
            {/* Ai Boot Button */}
            <div className="pr-1">
              <button className="btn btn-ghost btn-circle" onClick={() => document.getElementById("snapAdvisor").showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </button>
            </div>
            <div className="dropdown dropdown-end">
              <NavLink
                to="faq"
                className={({ isActive }) => (isActive ? "btn btn-circle btn-primary text-primary-content" : "btn btn-ghost btn-circle")}>
                {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle"> */}
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                {/* </div> */}
              </NavLink>
              <NavLink
                to="profile"
                className={({ isActive }) => (isActive ? "btn btn-circle btn-primary text-primary-content" : "btn btn-ghost btn-circle")}>
                {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle"> */}
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                {/* </div> */}
              </NavLink>
            </div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">{user.profileImage ? <img src={user.profileImage} /> : <DefaultProfileImage />}</div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow">
                <li>
                  <a onClick={logoutUser}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
