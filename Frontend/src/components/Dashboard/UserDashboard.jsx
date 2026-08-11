import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/axios";

function UserDashboard() {
  const authUser = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);

  const userId = authUser?.id || localStorage.getItem("userId");
  console.log("ID :" , userId);

  async function fetchUser() {
    if (!userId) return;
    try {
      const response = await api.get(`/user/data/${userId}`);
      setData([response.data]);
    } catch (error) {
      console.log("User API Error:", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <div className="max-w-md min-h-[calc(100vh)] mx-auto bg-white shadow rounded-lg p-6 mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center">
        User Profile
      </h2>

      {data.length > 0 ? (
        data.map((user) => (
          <div key={user.id} className="space-y-4 text-start">
            <div className="flex justify-around border-b pb-2">
              <span className="font-semibold text-start">ID</span>
              <span>{user.id}</span>
            </div>

            <div className="flex justify-around border-b pb-2">
              <span className="font-semibold ">Full Name</span>
              <span>{user.fullname}</span>
            </div>

            <div className="flex justify-around border-b pb-2">
              <span className="font-semibold">Email</span>
              <span>{user.email}</span>
            </div>

            <div className="flex justify-around border-b pb-2">
              <span className="font-semibold">Address</span>
              <span>{user.address}</span>
            </div>

            <div className="flex justify-around border-b pb-2">
              <span className="font-semibold">Phone</span>
              <span>{user.phoneNumber}</span>
            </div>

            <div className="flex justify-around">
              <span className="font-semibold">Created At</span>
              <span>{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No User Found</p>
      )}
    </div>
  );
}

export default UserDashboard;
