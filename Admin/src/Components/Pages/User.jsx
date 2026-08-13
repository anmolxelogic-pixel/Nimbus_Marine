import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import api from "../../api/axios";

const initialForm = {
    fullname: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
};

function User() {
    const admin = useSelector((state) => state.auth.user);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [statusId, setStatusId] = useState(null);
    const [formData, setFormData] = useState(initialForm);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get("/admin/data");
            setUsers(response.data);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to load users"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const openModal = () => {
        setFormData(initialForm);
        setShowModal(true);
    };

    const closeModal = () => {
        if (saving) return;
        setShowModal(false);
        setFormData(initialForm);
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();

        if (!formData.fullname.trim()) {
            toast.error("Full name is required");
            return;
        }

        if (!formData.email.trim()) {
            toast.error("Email is required");
            return;
        }

        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        try {
            setSaving(true);

            console.log("hii");
            const response = await api.post("/user/register", formData);
            console.log("data 2",formData);
            console.log("data 3",response);

            toast.success(response.data?.message || "User created successfully");

            closeModal();
            await fetchUsers();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to create user"
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        try {
            setDeletingId(userId);

            await api.delete(`/admin/user/${userId}`);

            setUsers((prev) => prev.filter((user) => user.id !== userId));

            toast.success("User deleted successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete user"
            );
        } finally {
            setDeletingId(null);
        }
    };

    const handleStatusChange = async (user) => {
        try {
            setStatusId(user.id);

            const newStatus = !Boolean(user.isActive);

            await api.patch(`/admin/user/${user.id}/status`, {
                isActive: newStatus,
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
            toast.error(
                error.response?.data?.message || "Failed to update status"
            );
        } finally {
            setStatusId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        User Management
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Welcome {admin?.fullname || admin?.email || "Admin"}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                        Total Users: {users.length}
                    </span>

                    <button
                        type="button"
                        onClick={openModal}
                        className="bg-gray-900 text-white px-5 py-3 rounded-lg hover:bg-gray-800"
                    >
                        + Add User
                    </button>
                </div>
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
                                <th className="px-4 py-3 text-left">
                                    Full Name
                                </th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">
                                    Address
                                </th>
                                <th className="px-4 py-3 text-left">Phone</th>
                                <th className="px-4 py-3 text-left">
                                    Created At
                                </th>
                                <th className="px-4 py-3 text-left">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-center">
                                    Delete
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center py-10 text-gray-500"
                                    >
                                        Loading users...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center py-10 text-gray-500"
                                    >
                                        No Users Found
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b hover:bg-gray-50"
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
                                                ? new Date(
                                                      user.created_at
                                                  ).toLocaleDateString()
                                                : "N/A"}
                                        </td>

                                        <td className="px-4 py-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleStatusChange(user)
                                                }
                                                disabled={
                                                    statusId === user.id
                                                }
                                                className={`relative h-6 w-11 rounded-full ${
                                                    user.isActive
                                                        ? "bg-green-500"
                                                        : "bg-gray-300"
                                                }`}
                                            >
                                                <span
                                                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow ${
                                                        user.isActive
                                                            ? "left-6"
                                                            : "left-1"
                                                    }`}
                                                />
                                            </button>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                                disabled={
                                                    deletingId === user.id
                                                }
                                                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
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

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Add New User
                                </h2>
                                <p className="text-xs text-gray-500 mt-1">
                                    Create a user account from the admin panel.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-xl text-gray-400 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>

                        <form
                            onSubmit={handleCreateUser}
                            className="p-6 space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="w-full border rounded-lg px-4 py-2.5 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    className="w-full border rounded-lg px-4 py-2.5 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className="w-full border rounded-lg px-4 py-2.5 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter address"
                                    className="w-full border rounded-lg px-4 py-2.5 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full border rounded-lg px-4 py-2.5 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={closeModal} disabled={saving} className="border px-5 py-2.5 rounded-lg text-gray-600">
                                    Cancel
                                </button>

                                <button type="submit" disabled={saving} className="bg-gray-900 text-white px-5 py-2.5 rounded-lg disabled:opacity-50">
                                    {saving ? "Creating..." : "Create User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;