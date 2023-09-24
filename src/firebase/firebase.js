// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyALHWoLUNjDS5uBTaTxTUk42E-yb7f5ozg",

  authDomain: "flowgram-97998.firebaseapp.com",

  projectId: "flowgram-97998",

  storageBucket: "flowgram-97998.appspot.com",

  messagingSenderId: "749274351233",

  appId: "1:749274351233:web:019b2bee1bffb2923def80",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
const db = getFirestore(app);

export { db };
