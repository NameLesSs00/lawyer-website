import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4eSGy3tKudb1d4lq-u4cQfUuEmVLtebo",
  authDomain: "meladyacoublawer-c27f3.firebaseapp.com",
  projectId: "meladyacoublawer-c27f3",
  storageBucket: "meladyacoublawer-c27f3.firebasestorage.app",
  messagingSenderId: "282355356727",
  appId: "1:282355356727:web:dd0432079bb3affefd9bb2"
};

// Initialize Firebase only if it hasn't been initialized already (necessary for Next.js SSR/HMR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
