import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateUserRoute = ({ children }) => {
  const auth = localStorage.getItem("token");
  const location = useLocation();

  // Redirect to home page if user is already authenticated and tries to access the login page
  if (auth && location.pathname === "/login") {
    return <Navigate to="/" />;
  }

  // Render children if user is authenticated
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateUserRoute;
