import React from "react";
import { Navigate} from "react-router-dom";

const PublicRoute = ({children, redirectTo = "/"}) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect to home page if user is already authenticated
  if (user) {
    return <Navigate to={redirectTo} />;
  }

  // Render children if user is not authenticated
  return children;
};

export default PublicRoute;
