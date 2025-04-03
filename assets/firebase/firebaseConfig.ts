// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqs8d_F1odzvJDR2y5dnM1tH8ySv6BBxk",
  authDomain: "nidapp-9f790.firebaseapp.com",
  projectId: "nidapp-9f790",
  storageBucket: "nidapp-9f790.firebasestorage.app",
  messagingSenderId: "820095948723",
  appId: "1:820095948723:web:bb81c8470e68eeca2c9dc6",
  measurementId: "G-GK07WQPRVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);