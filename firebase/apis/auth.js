import { auth } from "../Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { createUser, findUserByField, findUserById } from "./users.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import USER_ROLES from "@/constants/userRoles";

const fetchCurrentUserFromOurStore = async (uid) => {
  const currUser = await findUserById(uid);
  return currUser;
}

// Listen for authentication state changes.
onAuthStateChanged(auth, (user) => {
  if (user) {
    fetchCurrentUserFromOurStore(user.uid).then(
      (cUser) => {
        AsyncStorage.setItem("user", JSON.stringify(cUser));
      }
    );
  } else {
    console.log("User is logged out");
    AsyncStorage.removeItem("user");
  }
});

// Register a new user.
async function register(
  firstName,
  lastName,
  username,
  email,
  password,
  role = USER_ROLES.USER
) {
  try {
    let emailLower;
    let usernameLower;
    // Validation for Username & Email
    if (username) {
      usernameLower = username.toLowerCase();
      const foundUserByUsername = await findUserByField('username' , usernameLower);
      if (foundUserByUsername) {
        throw new Error('Username already exists enter another one');
      }
    }

    if (email) {
      emailLower = email.toLowerCase();
      const foundUserByEmail = await findUserByField('email' , emailLower);
      if (foundUserByEmail) {
        throw new Error('Email already exists enter another one');
      }
    }

    const credentials = await createUserWithEmailAndPassword(
      auth,
      emailLower,
      password
    );
    await createUser(
      auth.currentUser.uid,
      usernameLower,
      firstName,
      lastName,
      emailLower,
      role
    );
    return credentials;
  } catch (error) {
    throw error;
  }
}

async function login(email, password) {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const user = await findUserByField("email", email);
    if (!user) {
      throw new Error("User not found");
    }
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials;
  } catch (error) {
    throw error;
  }
}

async function logout() {
  try {
    const user = auth.currentUser;
    if (user) {
      await signOut(auth);
      console.log("User logged out successfully.");
    } else {
      throw new Error("No user is currently logged in");  
    }
  } catch (error) {
    throw error;
  }
}

async function resetPassword(email) {
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent to", email);
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    throw error;
  }
}

export { register, login, logout, resetPassword };
