// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE5u74QIUHxzx9MpEyPYFlZQVq86TXuw0",
  authDomain: "chat-app-bef60.firebaseapp.com",
  projectId: "chat-app-bef60",
  storageBucket: "chat-app-bef60.appspot.com",
  messagingSenderId: "326351369209",
  appId: "1:326351369209:web:18c1d2637a4697fa13c328",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Notificação
export const messaging = getMessaging(app);

// Database
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);
