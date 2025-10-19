import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { FaTachometerAlt, FaUsers, FaCalendarCheck, FaSignOutAlt, FaBars, FaTimes, FaGraduationCap } from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <FaGraduationCap className="text-2xl text-red-500" />
            <span className="text-lg font-semibold">AttendEase</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white hover:text-gray-300"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow py-4">
          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive
                  ? "bg-red-950 text-white border-l-4 border-yellow-400"
                  : "text-gray-200 hover:bg-red-950 hover:text-white border-l-4 border-transparent"
              }`
            }
          >
            <FaTachometerAlt className="mr-3 text-lg" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/students"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive
                  ? "bg-red-950 text-white border-l-4 border-yellow-400"
                  : "text-gray-200 hover:bg-red-950 hover:text-white border-l-4 border-transparent"
              }`
            }
          >
            <FaUsers className="mr-3 text-lg" />
            <span>Students</span>
          </NavLink>
          <NavLink
            to="/attendance"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-colors duration-200 ${
                isActive
                  ? "bg-red-950 text-white border-l-4 border-yellow-400"
                  : "text-gray-200 hover:bg-red-950 hover:text-white border-l-4 border-transparent"
              }`
            }
          >
            <FaCalendarCheck className="mr-3 text-lg" />
            <span>Attendance</span>
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded transition-colors duration-200 text-white"
          >
            <FaSignOutAlt className="mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
