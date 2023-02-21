import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  // Redirect to home page if user is already authenticated and tries to access the login page
  if (user && user.isAdmin && location.pathname === "/admin") {
    return <Navigate to="/" />;
  }

  // Redirect to login page if user is not an admin
  if (!user || !user.isAdmin) {
    return <Navigate to="/admin" />;
  }

  // Render children if user is an admin
  return children;
};

export default PrivateRoute;
