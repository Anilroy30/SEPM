import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import Recommendations from "./Recommendations";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SignOut from "./Signout";
import PrivateRoute from "./PrivateRoute";
import VoiceTranslatorGPT from "./VoiceTranslatorGPT";

const Body = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="pt-20">
      <div className="w-full max-w-[1200px] mx-auto px-4 overflow-x-hidden">
        {user && <SignOut />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/browse" element={<PrivateRoute><Browse /></PrivateRoute>} />
          <Route path="/recommendations" element={<PrivateRoute><Recommendations /></PrivateRoute>} />
          <Route path="/voice" element={<PrivateRoute><VoiceTranslatorGPT /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
};


export default Body;
