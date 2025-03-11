// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARjTW3y8L0GuNOr3KhaF0JRlb5j_tgwI0",
  authDomain: "geo-genius.firebaseapp.com",
  projectId: "geo-genius",
  storageBucket: "geo-genius.firebasestorage.app",
  messagingSenderId: "422527913880",
  appId: "1:422527913880:web:52aa07b861c831d697e5ed",
  measurementId: "G-NER9VLSYGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();