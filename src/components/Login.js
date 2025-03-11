import { useRef, useState } from 'react';
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

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
                        photoURL: USER_AVATAR
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid, email, displayName, photoURL }));
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    setErrorMessage(error.code + " - " + error.message);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate("/browse");  // Redirect user after successful sign-in
                })         
                .catch((error) => {
                    setErrorMessage(error.code + " - " + error.message);
                });
        }
    };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null);
    };

    return (
        <div className="relative w-full h-screen flex flex-col">
            <Header/>
            <div className="relative flex justify-center items-center h-full">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="w-full sm:w-3/6 md:w-2/6 lg:w-1/4 bg-black bg-opacity-80 p-8 rounded-lg text-white shadow-lg backdrop-blur-md"
                >
                    <h1 className="text-3xl font-bold text-center mb-6">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                    {!isSignInForm && (
                        <input
                            ref={nameRef}
                            type="text"
                            placeholder="Full Name"
                            className="p-3 my-3 w-full bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    )}
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                        className="p-3 my-3 w-full bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className="p-3 my-3 w-full bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    {errorMessage && <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>}

                    <button
                        onClick={handleButtonClick}
                        className="w-full p-3 mt-4 bg-red-600 hover:bg-red-700 transition duration-300 rounded-md font-semibold"
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <p className="text-center text-gray-400 mt-5 cursor-pointer hover:underline" onClick={toggleSignInForm}>
                        {isSignInForm ? "New to Netflix? Sign Up Now." : "Already Registered? Sign In Now."}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
