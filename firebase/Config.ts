import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBR2ONHgPObYxRgrekFWq63i5qnRoN1DVk",
  authDomain: "task-852fc.firebaseapp.com",
  projectId: "task-852fc",
  storageBucket: "task-852fc.appspot.com",
  messagingSenderId: "664704154074",
  appId: "1:664704154074:web:6dd91b1f0e34e6f4c168e3",
  measurementId: "G-G35GXV83CK"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
