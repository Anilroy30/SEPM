import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import Recommendations from "./Recommendations";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SignOut from "./Signout";
import PrivateRoute from "./PrivateRoute";
import VoiceTranslatorGPT from "./VoiceTranslatorGPT";
import { useLocation } from "react-router-dom";

const Body = () => {
  const user = useSelector((store) => store.user);
  const location = useLocation();

  return (
    <div className="pt-20">
      <div
        className={`w-full overflow-x-hidden ${
          location.pathname === "/recommendations"
            ? "max-w-none px-0"
            : "max-w-[1200px] mx-auto px-4"
        }`}
      >
        {user && <SignOut />}
        <Routes>
          <Route path="/" element={<Login />} />
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
          <Route
            path="/voice"
            element={
              <PrivateRoute>
                <VoiceTranslatorGPT />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Body;
