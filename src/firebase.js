// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyC8iDXVL5vQSwjiK36T9pzl_cGDAu1mcvc",
  authDomain: "afiby1.firebaseapp.com",
  databaseURL: "https://afiby1-default-rtdb.firebaseio.com",
  projectId: "afiby1",
  storageBucket: "afiby1.appspot.com",
  messagingSenderId: "1017111042806",
  appId: "1:1017111042806:web:e3662dfdf499fbdb06ead7",
  measurementId: "G-7TLHJ8FHQF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const Auth = getAuth(app);
export const RealDB = getDatabase(app);

export default app;
