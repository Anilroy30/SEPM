import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const SignOut = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/"); // Redirect to login after logout
    });
  };

  return (
    <button
      onClick={handleSignOut}
      className="absolute top-4 right-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md"
    >
      🚪 Sign Out
    </button>
  );
};

export default SignOut;
