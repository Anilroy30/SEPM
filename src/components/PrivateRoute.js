import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const user = useSelector((store) => store.user); // Get user from Redux store

  // console.log("🔍 Checking user authentication:", user); // Debugging

  return user ? children : <Navigate to="/" />; // Redirect to login if no user
};

export default PrivateRoute;
