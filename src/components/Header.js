import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import Logo from "./HeaderLogo";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [authChecked, setAuthChecked] = useState(false);  // ✅ Track when auth state is confirmed

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());  // ✅ Ensures state is cleared
        navigate("/");
      }
      setAuthChecked(true); // ✅ Set auth check complete
    });

    return () => unSubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/error");
      });
  };

  // ✅ Hide UI until Firebase auth state is checked
  if (!authChecked) return null;

  return (
    <header className="absolute top-10 left-10 flex items-center">
      <div className="relative flex items-center">
        <Logo />
      </div>

      {user?.uid && ( // ✅ This ensures the Sign Out button disappears when logged out
        <div className="absolute top-2 right-4 flex flex-col items-center">
          <button
            onClick={handleSignOut}
            className="mt-2 text-white text-sm font-semibold bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition-all"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
