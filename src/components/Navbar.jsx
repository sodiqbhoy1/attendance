import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { FaGraduationCap, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-red-900 via-red-800 to-rose-900 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/login" className="flex items-center text-white text-2xl font-bold transition">
              <FaGraduationCap className="mr-2 text-3xl" />
              <span>AttendEase</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/login"
              className={`relative px-4 py-2 text-white font-medium transition cursor-pointer ${
                isActive("/login")
                  ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-400"
                  : "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={`relative px-4 py-2 text-white font-medium transition cursor-pointer ${
                isActive("/register")
                  ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-yellow-400"
                  : "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
              }`}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none transition cursor-pointer"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link
              to="/login"
              onClick={toggleMenu}
              className={`block px-4 py-3 text-white font-medium transition cursor-pointer ${
                isActive("/login")
                  ? "border-l-4 border-yellow-400 bg-red-950"
                  : "border-l-4 border-transparent hover:border-yellow-400 hover:bg-red-950"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={toggleMenu}
              className={`block px-4 py-3 text-white font-medium transition cursor-pointer ${
                isActive("/register")
                  ? "border-l-4 border-yellow-400 bg-red-950"
                  : "border-l-4 border-transparent hover:border-yellow-400 hover:bg-red-950"
              }`}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
