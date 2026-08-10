import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../api/axios";

function AdminDashboard() {
  const admin = useSelector((state) => state.auth.user);

  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const response = await api.get("admin/data");
      setUsers(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load users"
      );
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <div className="bg-white rounded-2xl shadow-md px-5 py-4 mb-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Nimbus Marine
        </h1>

        <p className="text-xm text-gray-500 mt-1">
          Manage your website content and monitor your platform activity.
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl shadow-md px-4 py-3">
          <p className="text-[20px] font-medium text-gray-500">
            Total Users
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-1">
            {users.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md px-4 py-3">
          <p className="text-[20px] font-medium text-gray-500">
            Active Users
          </p>

          <h2 className="text-3xl font-bold text-indigo-600 mt-1">
            {users.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md px-4 py-3">
          <p className="text-[20px] font-medium text-gray-500">
            Categories
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-1">
            4
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md px-4 py-3">
          <p className="text-[20px] font-medium text-gray-500">
            Contact Queries
          </p>

          <h2 className="text-3xl font-bold text-sky-600 mt-1">
            2
          </h2>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;