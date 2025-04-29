// src/components/Login.js
import { useRef } from "react";
import useLoginForm from "../utils/useLoginForm";
import Header from "./Header";
import AuthForm from "./AuthForm";

const Login = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const {
    isSignInForm,
    errorMessage,
    flip,
    handleButtonClick,
    toggleSignInForm,
  } = useLoginForm(nameRef, emailRef, passwordRef);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <Header />
      <div className="flex justify-center items-center min-h-[75vh] perspective">
        <div
          className={`transition-transform duration-500 transform-style preserve-3d ${
            flip ? "rotate-y-180" : ""
          }`}
        >
          <AuthForm
            isSignInForm={isSignInForm}
            errorMessage={errorMessage}
            nameRef={nameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            handleButtonClick={handleButtonClick}
            toggleSignInForm={toggleSignInForm}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
