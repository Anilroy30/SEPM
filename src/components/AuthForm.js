// src/components/LoginParts/AuthForm.js
import React from "react";

const AuthForm = ({
  isSignInForm,
  errorMessage,
  nameRef,
  emailRef,
  passwordRef,
  handleButtonClick,
  toggleSignInForm,
}) => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="animate-fadeInUp w-[350px] p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl ring-1 ring-white/10 text-white transform transition-transform duration-500"
      style={{ backfaceVisibility: "hidden" }}
    >
      <h1 className="text-3xl font-extrabold text-center text-white drop-shadow mb-6">
        {isSignInForm ? "Sign In" : "Sign Up"}
      </h1>

      {!isSignInForm && (
        <input
          ref={nameRef}
          type="text"
          placeholder="Full Name"
          className="p-3 mb-4 w-full rounded-xl bg-white text-gray-800 shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      )}

      <input
        ref={emailRef}
        type="email"
        placeholder="Email Address"
        className="p-3 mb-4 w-full rounded-xl bg-white text-gray-800 shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="Password"
        className="p-3 mb-2 w-full rounded-xl bg-white text-gray-800 shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      {errorMessage && (
        <p className="text-red-400 text-sm text-center mb-3">{errorMessage}</p>
      )}

      <button
        onClick={handleButtonClick}
        className="w-full py-3 bg-gradient-to-r from-pink-600 to-red-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg active:scale-95"
      >
        {isSignInForm ? "Sign In" : "Sign Up"}
      </button>

      <p
        className="text-center text-sm text-white/80 mt-5 cursor-pointer hover:underline"
        onClick={toggleSignInForm}
      >
        {isSignInForm
          ? "New to Geo-Genius? Sign Up Now."
          : "Already Registered? Sign In Now."}
      </p>
    </form>
  );
};

export default AuthForm;
