// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtDi-iE7zas87-ut6LezCOANkV3WZlvUg",
  authDomain: "test-f7fde.firebaseapp.com",
  projectId: "test-f7fde",
  storageBucket: "test-f7fde.appspot.com",
  messagingSenderId: "739059949523",
  appId: "1:739059949523:web:14ac38d72b4b791d6e9926",
  measurementId: "G-XGL05J93NY",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default db;
