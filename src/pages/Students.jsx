import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { FaEdit, FaTrash, FaSave, FaTimes, FaUserPlus, FaSearch } from "react-icons/fa";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/students", form);
    setForm({ name: "" });
    fetchStudents();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await API.delete(`/students/${id}`);
      fetchStudents();
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setEditName(student.name);
  };

  const handleSave = async (id) => {
    await API.put(`/students/${id}`, { name: editName });
    setEditingId(null);
    setEditName("");
    fetchStudents();
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName("");
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Student Management</h2>
        <p className="text-gray-600">Add, edit, or remove students from the system</p>
      </div>

      {/* Add Student Form */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FaUserPlus className="mr-2 text-red-800" />
          Add New Student
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <input
            placeholder="Enter student name"
            className="flex-1 px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-red-800 transition bg-transparent"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-md hover:from-red-800 hover:to-red-700 transition-all duration-200 font-medium shadow-md"
          >
            Add Student
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or registration number..."
            className="w-full pl-10 pr-4 py-3 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-red-800 transition bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-red-900 to-red-800 text-white">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Registration No</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Class</th>
                <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4">
                      {editingId === s._id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-red-800"
                        />
                      ) : (
                        <span className="font-medium text-gray-800">{s.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-gray-600">{s.regNo}</td>
                    <td className="px-4 py-4 text-gray-600">{s.classLevel}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {editingId === s._id ? (
                          <>
                            <button
                              onClick={() => handleSave(s._id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                              title="Save"
                            >
                              <FaSave />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="p-2 text-gray-600 hover:bg-gray-50 rounded transition"
                              title="Cancel"
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(s)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(s._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Count */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredStudents.length} of {students.length} students
      </div>
    </div>
  );
};

export default Students;