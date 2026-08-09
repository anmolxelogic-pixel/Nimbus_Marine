import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../api/axios";

function AdminDashboard() {
  const admin = useSelector((state) => state.auth.user);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await api.get("admin/data");
      setUsers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="bg-white p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-500">
              Welcome {admin?.fullname || admin?.email}
            </p>
          </div>

          <span className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 font-semibold">
            Total Users: {users.length}
          </span>
        </div>

        <div className="bg-white p-6">
          <h2 className="text-xl font-semibold mb-4">All Registered Users</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-black border-b bg-gray-50">
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Full Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Created At</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-100 transition duration-200"
                    >
                      <td className="px-4 py-3">{user.id}</td>
                      <td className="px-4 py-3 font-medium">{user.fullname}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === "admin"
                              ? "bg-purple-100 text-green-700"
                              : "bg-green-100 text-green-700"
                            }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">{user.address}</td>
                      <td className="px-4 py-3">{user.phoneNumber}</td>
                      <td className="px-4 py-3">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      No Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
