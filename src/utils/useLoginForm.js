// src/hooks/useLoginForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { checkValidData } from "../utils/Validate";
import { USER_AVATAR } from "../utils/constants";

const useLoginForm = (nameRef, emailRef, passwordRef) => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [flip, setFlip] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const name = nameRef.current ? nameRef.current.value.trim() : "";
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    const message = checkValidData(name, email, password, isSignInForm);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => setErrorMessage(error.message));
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => navigate("/browse"))
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    }
  };

  const toggleSignInForm = () => {
    setFlip(true);
    setTimeout(() => {
      setIsSignInForm(!isSignInForm);
      setErrorMessage(null);
      setFlip(false);
    }, 500);
  };

  return {
    isSignInForm,
    errorMessage,
    flip,
    handleButtonClick,
    toggleSignInForm,
  };
};

export default useLoginForm;
