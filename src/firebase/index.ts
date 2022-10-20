// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE5u74QIUHxzx9MpEyPYFlZQVq86TXuw0",
  authDomain: "chat-app-bef60.firebaseapp.com",
  projectId: "chat-app-bef60",
  storageBucket: "chat-app-bef60.appspot.com",
  messagingSenderId: "326351369209",
  appId: "1:326351369209:web:18c1d2637a4697fa13c328"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Notificação
// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

// Database