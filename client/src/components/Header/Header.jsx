import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../features/authSlice";

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

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleSignOut = () => {
    dispatch(signout());
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <NavLink to="/">Online Exam Portal</NavLink>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {isLoggedIn ? (
            <>
              <span className="text-gray-600">Hello, {user.name}</span>
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-orange-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            navlinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 font-semibold"
                    : "text-gray-600 hover:text-orange-600"
                }
              >
                {link.display}
              </NavLink>
            ))
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-gray-600 hover:text-orange-600 focus:outline-none focus:text-orange-600"
            aria-label="Toggle menu"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu.classList.toggle("hidden");
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {isLoggedIn ? (
            <>
              <span className="block text-gray-600">Hello, {user.name}</span>
              <button
                onClick={() => {
                  handleSignOut();
                  const menu = document.getElementById("mobile-menu");
                  menu.classList.add("hidden");
                }}
                className="block text-gray-600 hover:text-orange-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            navlinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "block text-orange-600 font-semibold"
                    : "block text-gray-600 hover:text-orange-600"
                }
                onClick={() => {
                  const menu = document.getElementById("mobile-menu");
                  menu.classList.add("hidden");
                }}
              >
                {link.display}
              </NavLink>
            ))
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
