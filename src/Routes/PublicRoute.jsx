import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

//public
const PublicRoute = ({ children }) => {
  const userToken = Cookies.get("userToken");
  if (userToken) {
    return <Navigate to="/admin" />;
  }
  return children;
};

export default PublicRoute;
