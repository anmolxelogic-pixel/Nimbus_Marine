import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RoleRedirect() {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={role === "admin" ? "/admin/dashboard" : "/"} replace />;
}

export default RoleRedirect;
