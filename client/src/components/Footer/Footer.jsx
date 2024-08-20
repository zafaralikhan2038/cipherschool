import React from "react";
import { NavLink } from "react-router-dom";

const navlinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/signin",
    display: "Sign In",
  },
  {
    path: "/signup",
    display: "Sign Up",
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-xl font-bold mb-4 md:mb-0 mx-4">
          Online Exam Portal
        </div>

        {/* Links */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          {navlinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold"
                  : "text-gray-400 hover:text-white"
              }
            >
              {link.display}
            </NavLink>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-gray-400 text-sm mx-4">
          © 2024 Online Exam Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
