// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgcvyUvh_JgaGbvZCedfF0E1kgc_cPi4U",
  authDomain: "e3-4parser.firebaseapp.com",
  projectId: "e3-4parser",
  storageBucket: "e3-4parser.firebasestorage.app",
  messagingSenderId: "832731814910",
  appId: "1:832731814910:web:423181e56a36b7db25feaf",
  measurementId: "G-EMZK7WQWS0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
