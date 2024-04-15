import { auth } from "../Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }
});

// Add some function to call firebase endpoints
async function register(email, password) {
  const CRED = await createUserWithEmailAndPassword(auth, email, password);
  return CRED;
}

async function login(email, password) {
  const CRED = await signInWithEmailAndPassword(auth, email, password);
  return CRED;
}

export { register, login };
