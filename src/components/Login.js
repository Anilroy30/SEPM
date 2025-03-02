import React, { useRef, useState } from 'react';
import { checkValidData } from '../utils/validate';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null);
    };

    const handleButtonClick = () => {
        const name = nameRef.current ? nameRef.current.value.trim() : "";
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        const message = checkValidData(name, email, password, isSignInForm);
        setErrorMessage(message);

        if (message) return;
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form 
                onSubmit={(e) => e.preventDefault()} 
                className="w-96 p-8 bg-black text-white rounded-lg bg-opacity-85 shadow-lg"
            >
                <h1 className="font-bold text-3xl py-4 text-center">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                
                {!isSignInForm && (
                    <input 
                        ref={nameRef} 
                        type="text" 
                        placeholder="Full Name" 
                        className="p-4 my-2 w-full bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-red-500"
                    />
                )}
                
                <input 
                    ref={emailRef} 
                    type="text" 
                    placeholder="Email Address" 
                    className="p-4 my-2 w-full bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-red-500"
                />
                
                <input 
                    ref={passwordRef} 
                    type="password" 
                    placeholder="Password" 
                    className="p-4 my-2 w-full bg-gray-700 rounded-md outline-none focus:ring-2 focus:ring-red-500"
                />
                
                {errorMessage && <p className="text-red-500 font-semibold text-sm text-center">{errorMessage}</p>}
                
                <button 
                    className="p-4 my-4 bg-red-600 hover:bg-red-700 transition duration-300 w-full rounded-lg text-lg font-semibold"
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? 'Sign In' : 'Sign Up'}
                </button>

                <p 
                    className="py-4 text-center cursor-pointer text-gray-300 hover:text-white transition duration-200"
                    onClick={toggleSignInForm}
                >
                    {isSignInForm ? 'New to Geo-Genius? Sign Up' : 'Already registered? Sign In now...'}
                </p>
            </form>
        </div>
    );
};

export default Login;
