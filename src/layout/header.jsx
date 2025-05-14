import React from "react";
import { NavLink, Link } from "react-router";
function Header() {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <header className="bg-white/80 backdrop-blur-md shadow-xl border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
            <div className="flex items-center gap-4">
              <img
                src="your-logo.png"
                alt="Logo"
                className="h-12 w-12 object-cover rounded-full border-2 border-blue-600 shadow-sm"
              />
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                Learning
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium">
              <NavLink
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300"
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300"
              >
                About
              </NavLink>
              <NavLink
                to="/spotify"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300"
              >
                spotify
              </NavLink>

              {/* <NavLink
                to="/test"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300"
              >
                test
              </NavLink> */}
              <NavLink
                to="/task"
                className="text-gray-700 hover:text-blue-600 transition-all duration-300"
              >
                Task
              </NavLink>
            </nav>

            <div className="hidden md:block">
              <a
                href="#"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              >
                Get Started
              </a>
            </div>
            <div className="md:hidden">
              <button
                id="mobileMenuButton"
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
              ></button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;

{
  /* <div id="mobileMenu" className="md:hidden hidden px-6 pb-4 space-y-2">
            <a
              href="#"
              className="block text-gray-800 font-medium hover:text-blue-600 transition"
            >
              Home
            </a>
            <a className="block text-gray-800 font-medium hover:text-blue-600 transition">
              About
            </a>
            <a
              href="#"
              className="block text-gray-800 font-medium hover:text-blue-600 transition"
            >
              Services
            </a>
            <a
              href="#"
              className="block text-gray-800 font-medium hover:text-blue-600 transition"
            >
              Contact
            </a>
            <a
              href="#"
              className="block text-center mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full shadow hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              Get Started
            </a>
          </div> */
}
