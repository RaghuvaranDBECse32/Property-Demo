// firebase.js

// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword,
         signOut,
         sendEmailVerification,
         RecaptchaVerifier,
         signInWithPhoneNumber } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import { getFirestore, collection, addDoc, getDocs, doc, setDoc } 
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEJ9Yzyg7uNDyXdvUhE3LaYnYUMTWi4CQ",
  authDomain: "my-osre.firebaseapp.com",
  projectId: "my-osre",
  storageBucket: "my-osre.firebasestorage.app",
  messagingSenderId: "225888035115",
  appId: "1:225888035115:web:db3921e38077ddb3d5256e",
  measurementId: "G-MEZVFBXB5G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export helpers
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc
};
