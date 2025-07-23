// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3bdMwgOPRX2Sx-6w_2I6OFSUq_wU7TV0",
  authDomain: "todo-81447.firebaseapp.com",
  projectId: "todo-81447",
  storageBucket: "todo-81447.firebasestorage.app",
  messagingSenderId: "661911586994",
  appId: "1:661911586994:web:f0d21ef76b3ac12a2a21ab",
  measurementId: "G-BLCXCXLMG5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
