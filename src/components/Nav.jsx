import React from "react";
import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import User from "../Assets/icons/user.png";
const Nav = () => {
  const { userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex py-3 px-24 justify-between w-full items-center">
      <div className="logo">
        <Link to="/">
          <img className="cursor-pointer" src={logo} alt="Logo" />
        </Link>
      </div>

      <ul className="flex gap-12">
        <Link to="/">
          <li className="font-semibold text-lg hover:underline underline-offset-8 cursor-pointer ">
            Home
          </li>
        </Link>
        <Link to="/courses">
          <li className="font-semibold text-lg hover:underline underline-offset-8 cursor-pointer">
            Courses
          </li>
        </Link>
        <Link to="/faq">
        <li className="font-semibold text-lg hover:underline underline-offset-8 cursor-pointer">
          FAQ
        </li>
        </Link>
        <Link to="/contact">
        <li className="font-semibold text-lg hover:underline underline-offset-8 cursor-pointer">
          Contact Us
        </li>
        </Link>
      </ul>

      <div className="flex   gap-5">
        {userEmail ? (
          <>
            <Link to="/dashboard">
           <img src={User} alt=""  className="w-9 hover:scale-105 transition-transform duration-300"/>
            </Link>
            
            <button
              onClick={handleLogout}
              className="px-4  border-2 rounded-2xl border-red-400 text-red-600 font-medium hover:scale-105 transition-transform duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <div className="px-5 py-1 border rounded-2xl bg-cyan-200 border-stone-950 cursor-pointer hover:scale-105 transition-transform duration-300">
                Login
              </div>
            </Link>
            <Link to="/register">
              <div className="px-5 py-1 border-2 rounded-2xl border-blue-300 cursor-pointer hover:scale-105 transition-transform duration-300">
                Sign Up
              </div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
