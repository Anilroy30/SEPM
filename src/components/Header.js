import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import Logo from "./HeaderLogo";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unSubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/error");
      });
  };

  return (
      <header className="absolute top-10 left-10 flex items-center">
      <div className="relative flex items-center">
        <Logo />
      </div>
  

      {user && (
        <div className="absolute top-2 right-4 flex flex-col items-center">
          <img
            className="w-12 h-12 border border-gray-400 cursor-pointer"
            src={user?.photoURL}
            alt="User Icon"
          />

          <button
            onClick={handleSignOut}
            className="mt-2 text-white text-sm font-semibold bg-gray-700 px-4 py-1 rounded-md hover:bg-gray-600 transition-all"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
