import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-4 md:px-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <FaBars size={24} />
            </button>
            <div className="flex-1 md:flex md:items-center md:justify-between">
              <h1 className="text-xl font-semibold text-gray-800 md:ml-0 ml-4">
                Admin Dashboard
              </h1>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
