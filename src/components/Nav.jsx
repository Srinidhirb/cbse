import React from "react";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="flex py-3  px-24 justify-between w-full items-center   ">
      <div className="logo">
        <img className="cursor-pointer" src={logo} alt="Logo" />
      </div>
      <ul className="flex gap-12">
        <Link to="/">
          {" "}
          <li className=" font-semibold hover:font-semibold text-lg hover:underline underline-offset-8  cursor-pointer ">
            Home
          </li>
        </Link>
        <Link to="/courses">
          {" "}
          <li className=" font-semibold hover:font-semibold text-lg hover:underline underline-offset-8  cursor-pointer">
            Courses
          </li>
        </Link>
        <li className=" font-semibold hover:font-semibold text-lg hover:underline underline-offset-8  cursor-pointer">
          FAQ
        </li>
       
        <li className=" font-semibold hover:font-semibold text-lg hover:underline underline-offset-8  cursor-pointer">
          Contact Us
        </li>
      </ul>
      <div className="flex gap-4 ">
        <Link to="/login">
          <div className=" px-5 py-1 border rounded-2xl bg-cyan-200 border-stone-950 cursor-pointer hover:scale-105 transition-transform duration-300">
            Login
          </div>{" "}
        </Link>
        <Link to="/register">
          {" "}
          <div className="px-5 py-1 border-2 cursor-pointer rounded-2xl border-blue-300 hover:scale-105 transition-transform duration-300 ">
            Sign Up
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
