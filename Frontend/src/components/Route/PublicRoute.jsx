import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute({ children }) {
  const { token, role } = useSelector((state) => state.auth);

  if (token) {
    return <Navigate to={role === "admin" ? "/admin/dashboard" : "/home"} replace />;
  }

  return children;
}

export default PublicRoute;
