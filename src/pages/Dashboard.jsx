import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaUsers, FaClipboardList, FaUserCheck, FaChartLine } from "react-icons/fa";
import API from "../utils/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
    attendanceRate: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const studentsRes = await API.get("/students");
        setStats((prev) => ({
          ...prev,
          totalStudents: studentsRes.data.length,
        }));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
        <p className="text-gray-600">Here's what's happening with your attendance system today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Total Students</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalStudents}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <FaUsers className="text-2xl text-red-800" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Present Today</p>
              <p className="text-3xl font-bold text-gray-800">{stats.presentToday}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaUserCheck className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Absent Today</p>
              <p className="text-3xl font-bold text-gray-800">{stats.absentToday}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaClipboardList className="text-2xl text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Attendance Rate</p>
              <p className="text-3xl font-bold text-gray-800">{stats.attendanceRate}%</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaChartLine className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Link
            to="/students"
            className="bg-gradient-to-r from-red-900 to-red-800 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-center">
              <FaUsers className="text-3xl mr-4" />
              <div>
                <p className="text-xl font-semibold">Manage Students</p>
                <p className="text-red-100 text-sm mt-1">Add, edit, or remove students</p>
              </div>
            </div>
          </Link>

          <Link
            to="/attendance"
            className="bg-gradient-to-r from-rose-900 to-rose-800 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-center">
              <FaClipboardList className="text-3xl mr-4" />
              <div>
                <p className="text-xl font-semibold">Mark Attendance</p>
                <p className="text-rose-100 text-sm mt-1">Record daily attendance</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
