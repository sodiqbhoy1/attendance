import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaSave, FaSearch } from "react-icons/fa";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

  const handleMark = (id, status) => {
    setRecords({ ...records, [id]: status });
  };

  const handleSubmit = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }
    if (Object.keys(records).length === 0) {
      alert("Please mark attendance for at least one student");
      return;
    }

    setLoading(true);
    try {
      const attendanceData = {
        date,
        records: Object.entries(records).map(([student, status]) => ({
          student,
          status,
        })),
      };
      await API.post("/attendance", attendanceData);
      alert("Attendance saved successfully!");
      setRecords({});
    } catch (error) {
      alert("Error saving attendance");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markAllPresent = () => {
    const allPresent = {};
    students.forEach((s) => {
      allPresent[s._id] = "Present";
    });
    setRecords(allPresent);
  };

  const markAllAbsent = () => {
    const allAbsent = {};
    students.forEach((s) => {
      allAbsent[s._id] = "Absent";
    });
    setRecords(allAbsent);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const presentCount = Object.values(records).filter((status) => status === "Present").length;
  const absentCount = Object.values(records).filter((status) => status === "Absent").length;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Mark Attendance</h2>
        <p className="text-gray-600">Record daily attendance for students</p>
      </div>

      {/* Date and Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FaCalendarAlt className="mr-2 text-red-800" />
            Select Date
          </label>
          <input
            type="date"
            className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-red-800 transition bg-transparent"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Present</p>
              <p className="text-3xl font-bold text-gray-800">{presentCount}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaCheckCircle className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Absent</p>
              <p className="text-3xl font-bold text-gray-800">{absentCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <FaTimesCircle className="text-2xl text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={markAllPresent}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium"
          >
            Mark All Present
          </button>
          <button
            onClick={markAllAbsent}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-3 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-red-800 transition bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-red-900 to-red-800 text-white">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">Reg No</th>
                <th className="px-4 py-4 text-center text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4 font-medium text-gray-800">{s.name}</td>
                    <td className="px-4 py-4 text-gray-600">{s.regNo}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleMark(s._id, "Present")}
                          className={`px-6 py-2 rounded-md font-medium transition ${
                            records[s._id] === "Present"
                              ? "bg-green-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-green-100"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleMark(s._id, "Absent")}
                          className={`px-6 py-2 rounded-md font-medium transition ${
                            records[s._id] === "Absent"
                              ? "bg-red-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-red-100"
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center px-8 py-3 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-md hover:from-red-800 hover:to-red-700 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSave className="mr-2" />
          {loading ? "Saving..." : "Save Attendance"}
        </button>
      </div>
    </div>
  );
};

export default Attendance;
