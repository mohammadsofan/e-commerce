import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <div>{children}</div>;
}
