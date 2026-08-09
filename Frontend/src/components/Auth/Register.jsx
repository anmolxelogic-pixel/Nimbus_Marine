import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const role = isAdmin ? "admin" : "user";

    try {
      const response = await api.post("user/register", {
        fullname: user.fullname,
        email: user.email,
        password: user.password,
        address: user.address,
        phoneNumber: user.phoneNumber,
        role
      });

      toast.success(response.data.message);

      setUser({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phoneNumber: ""
      });

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="mt-20 via-indigo-500 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>
        </div>


        <form onSubmit={handleSubmit} className="px-1 py-1  overflow-hidden">
          <div>
            <label className="block text-gray-700 font-medium mb-2 px-1">
              Full Name
            </label>

            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              value={user.fullname}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>


          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div className="flex px-1 py-1 gap-1">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={user.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex px-1 py-1 gap-1">

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>

              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                value={user.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>


            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone Number"
                value={user.phoneNumber}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 rounded-lg py-3">
            <span className="text-gray-700 font-medium">Role</span>

            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                name="role"
                checked={!isAdmin}
                onChange={() => setIsAdmin(false)}
                className="w-4 h-4 accent-blue-600"
              />
              User
            </label>

            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                name="role"
                checked={isAdmin}
                onChange={() => setIsAdmin(true)}
                className="w-4 h-4 accent-blue-600"
              />
              Admin
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
          >
            Create Account
          </button>
        </form>


        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
