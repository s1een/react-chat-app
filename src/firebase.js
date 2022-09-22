import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEakyOVtpqpWEzsb84sVs1YAlb53jVGTc",
  authDomain: "chat-app-efec9.firebaseapp.com",
  projectId: "chat-app-efec9",
  storageBucket: "chat-app-efec9.appspot.com",
  messagingSenderId: "518017023722",
  appId: "1:518017023722:web:6d158480a89faa467b6193",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
