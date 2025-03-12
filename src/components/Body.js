import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import Recommendations from "./Recommendations";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SignOut from "./Signout";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute

const Body = () => {
  const user = useSelector((store) => store.user); // Get user from Redux store

  return (
    <div className="relative min-h-screen">
      {user && <SignOut />} {/* Show SignOut only if logged in */}

      <Routes>
        <Route path="/" element={<Login />} />
        {/* Protect routes using PrivateRoute */}
        <Route
          path="/browse"
          element={
            <PrivateRoute>
              <Browse />
            </PrivateRoute>
          }
        />
        <Route
          path="/recommendations"
          element={
            <PrivateRoute>
              <Recommendations />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Body;
