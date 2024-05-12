import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from 'firebase/storage';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log("api" , FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: "AIzaSyCU4DoAhm4osI0lJ5_KdC1-Q4flrDY5dOk",
  authDomain: "novel-nest-app.firebaseapp.com",
  projectId: "novel-nest-app",
  storageBucket: "novel-nest-app.appspot.com",
  messagingSenderId:"653810419701" ,
  appId: "1:653810419701:web:1654f1b53ab22b1e58c2bc",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { app, db, auth,storage};
