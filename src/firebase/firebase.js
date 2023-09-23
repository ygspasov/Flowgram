// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

export { db };
