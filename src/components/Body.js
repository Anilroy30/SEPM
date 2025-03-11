import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import Recommendations from "./Recommendations";
import { Routes, Route } from "react-router-dom";
import SignOut from "./Signout"; // Import SignOut component

const Body = () => {
  return (
    <div className="relative min-h-screen">
      <SignOut />
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </div>
  );
};

export default Body;
