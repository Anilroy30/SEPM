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
  const [authChecked, setAuthChecked] = useState(false);

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
      setAuthChecked(true);
    });

    return () => unSubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth).catch(() => navigate("/error"));
  };

  if (!authChecked) return null;

  return (
    <div className="fixed top-4 left-6 z-50 scale-[0.85]">
      <Logo />
    </div>
  );
};

export default Header;
