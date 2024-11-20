import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const userToken = Cookies.get("userToken");
  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
