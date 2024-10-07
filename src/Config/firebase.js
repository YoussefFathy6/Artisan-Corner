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
  apiKey: "AIzaSyDpaoy3vYETWnBKKn5HurdmXCzaKKNZry0",
  authDomain: "artisan-corner-cca7d.firebaseapp.com",
  projectId: "artisan-corner-cca7d",
  storageBucket: "artisan-corner-cca7d.appspot.com",
  messagingSenderId: "307724681005",
  appId: "1:307724681005:web:d00dea41970b3c5ceb9da4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default db;
