import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import api from "../../api/axios";
import { login } from "../../features/Auth/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email.trim()) {
        toast.error("Please enter your email.");
        return;
    }

    if (!user.password) {
        toast.error("Please enter your password.");
        return;
    }

    if(!user.password.length<8){
      toast.error("password length must be 8 char")
    }


    try {
        const response = await api.post("user/login", user);

        dispatch(login(response.data));

        toast.success("Login completed!");

        navigate(
            response.data.user.role === "admin"
                ? "/admin/dashboard"
                : "/",
            { replace: true }
        );

    } catch (error) {
        if (error.response?.status === 403) {
            toast.error("Account deactivated by admin.");
        } else {
            toast.error("Login failed. Please try again.");
        }
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 rounded-lg font-semibold cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;