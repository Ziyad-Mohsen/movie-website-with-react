import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBChwbyk4shl0xSLcxW6TiwQcDxT1NndNA",
  authDomain: "movie-app-48277.firebaseapp.com",
  projectId: "movie-app-48277",
  storageBucket: "movie-app-48277.firebasestorage.app",
  messagingSenderId: "1096787519421",
  appId: "1:1096787519421:web:075f58f37f335337c194d4",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
