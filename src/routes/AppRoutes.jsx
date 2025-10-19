import React from "react";
import { Routes, Route } from "react-router";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Attendance from "../pages/Attendance";
import ProtectedRoute from "../components/ProtectedRoute";
import Registration from "../pages/Registration";
import AuthLayout from "../components/AuthLayout";
import AdminLayout from "../components/AdminLayout";

const AppRoutes = () => (
  <Routes>
    <Route element={<AuthLayout />}>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
    </Route>
    <Route
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/attendance" element={<Attendance />} />
    </Route>
  </Routes>
);

export default AppRoutes;
