import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import api from "../../api/axios";

function User() {
  const admin = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [statusId, setStatusId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/data");
      setUsers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setDeletingId(userId);
      await api.delete(`/admin/user/${userId}`);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (user) => {
    try {
      setStatusId(user.id);
      const newStatus = !Boolean(user.isActive);

      await api.patch(`/admin/user/${user.id}/status`, {
        isActive: newStatus
      });

      setUsers((prev) =>
        prev.map((item) =>
          item.id === user.id
            ? { ...item, isActive: newStatus }
            : item
        )
      );

      toast.success(
        newStatus
          ? "User activated successfully"
          : "User deactivated successfully"
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setStatusId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome {admin?.fullname || admin?.email || "Admin"}
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
          Total Users: {users.length}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          All Registered Users
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-700">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Full Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Created At</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-gray-500">
                    No Users Found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.id}
                    </td>

                    <td className="px-4 py-3 font-medium text-gray-800">
                      {user.fullname}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.address || "N/A"}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.phoneNumber || "N/A"}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleStatusChange(user)}
                        disabled={statusId === user.id}
                        className={`relative h-6 w-11 rounded-full transition ${user.isActive ? "bg-green-500" : "bg-gray-300"
                          }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${user.isActive ? "left-6" : "left-1"
                            }`}
                        />
                      </button>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={deletingId === user.id}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                        title="Delete user"
                      >
                        <MdDeleteOutline size={22} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;